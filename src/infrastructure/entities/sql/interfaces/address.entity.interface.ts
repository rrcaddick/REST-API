import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IAddressEntity extends IBaseEntity {
  street: string;
  buildingComplex: string;
  suburb: string;
  city: string;
  province: string;
  postCode: number;
}
