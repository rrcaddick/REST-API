import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { AddressEntity } from "@entities/sql/typeorm/address.entity";
import { IAddressEntity } from "@entities/sql/interfaces/address.entity.interface";

@autoInjectable()
export class AddressRepository extends BaseRepository<AddressEntity, IAddressEntity> {
  constructor(@inject("AddressEntity") addressEntity: AddressEntity) {
    super(addressEntity);
  }
}
