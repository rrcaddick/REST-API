import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { AddressTypeEntity } from "@entities/sql/typeorm/address-type.entity";
import { IAddressTypeEntity } from "@entities/sql/interfaces/address-type.entity.interface";

@autoInjectable()
export class AddressTypeRepository extends BaseRepository<AddressTypeEntity, IAddressTypeEntity> {
  constructor(@inject("AddressTypeEntity") addressTypeEntity: AddressTypeEntity) {
    super(addressTypeEntity);
  }
}
