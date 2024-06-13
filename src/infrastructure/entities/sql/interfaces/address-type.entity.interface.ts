import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IAddressTypeEntity extends IBaseEntity {
  type: string;
}
