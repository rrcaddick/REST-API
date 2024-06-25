import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IAddressEntity extends IBaseEntity {
  buildingCompanyName?: string;
  street: string;
  city: string;
  state: string;
  postCode: number;
}
