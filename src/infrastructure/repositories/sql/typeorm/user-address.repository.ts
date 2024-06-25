import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { UserAddressEntity } from "@entities/sql/typeorm/user-address.entity";
import { IUserAddressEntity } from "@entities/sql/interfaces/user-address.entity.interface";

@autoInjectable()
export class UserAddressRepository extends BaseRepository<UserAddressEntity, IUserAddressEntity> {
  constructor(@inject("UserAddressEntity") UseraddressEntity: UserAddressEntity) {
    super(UseraddressEntity);
  }
}
