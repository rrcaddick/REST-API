import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IAddressEntity extends IBaseEntity {
  addressHash: string;
  buildingCompanyName?: string;
  street: string;
  city: string;
  state: string;
  postCode: number;
}
