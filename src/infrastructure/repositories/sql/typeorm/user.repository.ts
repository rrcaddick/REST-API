import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { UserEntity } from "@entities/sql/typeorm/user.entity";
import { IUserEntity } from "@entities/sql/interfaces/user.entity.interface";
import { UserRoleEntity } from "@entities/sql/typeorm/user-role.entity";
import { AddressEntity } from "@root/infrastructure/entities/sql/typeorm/address.entity";
import { hashObject } from "@root/utils/crypto";
import { UserAddressEntity } from "@root/infrastructure/entities/sql/typeorm/user-address.entity";

@autoInjectable()
export class UserRepository extends BaseRepository<UserEntity, IUserEntity> {
  constructor(@inject("UserEntity") userEntity: UserEntity) {
    super(userEntity);
  }

  async createUser(userEntity: UserEntity): Promise<UserEntity | null> {
    let user: UserEntity | null = null;
    const { userAddressses, roles, ...userData } = userEntity;

    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
    const query = this.queryRunner.manager.createQueryBuilder();

    try {
      // Insert User
      const {
        raw: { insertId: userId },
      } = await query.insert().into(UserEntity).values(userData).updateEntity(false).execute();

      // Insert user userRoles {userId, roleId}
      const roleEntities = roles.map((role) => ({ roleId: role.id, userId }));
      await query.insert().into(UserRoleEntity).values(roleEntities).updateEntity(false).execute();

      if (userAddressses && userAddressses.length > 0) {
        // Check if addresses exist and get id
        const addresses = userAddressses.map(
          ({ address: { buildingCompanyName, street, city, state, postCode }, addressType: { id } }) => ({
            addressHash: hashObject({ buildingCompanyName, street, city, state, postCode }),
            buildingCompanyName,
            street,
            city,
            state,
            postCode,
            addressTypeId: id,
          })
        );

        const existingAddresses = await query
          .select(["a.id", "a.addressHash"])
          .from(AddressEntity, "a")
          .where("a.address_hash IN (:...hashes)", { hashes: addresses.map(({ addressHash }) => addressHash) })
          .getMany();

        const newAddresses = addresses.filter(
          ({ addressHash }) => !existingAddresses.find((a) => a.addressHash === addressHash)
        );

        // Insert userAddresses {userId, addressId, addressTypeId}

        const userAddresses =
          existingAddresses?.map(
            ({ id: addressId, addressHash }) =>
              new UserAddressEntity(
                userId,
                addressId,
                addresses.find((a) => a.addressHash === addressHash)?.addressTypeId!
              )
          ) ?? [];

        const { identifiers: addressIds } = await query.insert().into(AddressEntity).values(newAddresses).execute();

        userAddresses.push(
          ...addressIds.map(({ id }, index) => new UserAddressEntity(userId, id, newAddresses[index].addressTypeId))
        );

        await query.insert().into(UserAddressEntity).values(userAddresses).updateEntity(false).execute();
      }

      // Commit transaction
      await this.queryRunner.commitTransaction();
      user = await this.findOneWithRelations(userId, ["roles", "userAddressses.address", "userAddressses.addressType"]);
    } catch (error) {
      // TODO: Log errors with logger instance
      await this.queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await this.queryRunner.release();
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.repo.findOneBy({ email });
  }

  async findByName(firstName: string, lastName: string): Promise<UserEntity[] | null> {
    return await this.repo.findBy({ firstName, lastName });
  }
}
