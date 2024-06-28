import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { UserRoleEntity } from "@entities/sql/typeorm/user-role.entity";
import { IUserRoleEntity } from "@entities/sql/interfaces/user-role.entity.interface";

@autoInjectable()
export class UserRoleRepository extends BaseRepository<UserRoleEntity, IUserRoleEntity> {
  constructor(@inject("UserRoleEntity") userRoleEntity: UserRoleEntity) {
    super(userRoleEntity);
  }

  getUserRoles(userId: number): Promise<UserRoleEntity[]> {
    return this.repo.find({ where: { userId }, relations: ["role"] });
  }
}
