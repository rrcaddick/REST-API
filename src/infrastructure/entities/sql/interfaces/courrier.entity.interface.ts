import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface ICourrierEntity extends IBaseEntity {
  name: string;
  contactNumber: string;
  shippingCost: string;
}
