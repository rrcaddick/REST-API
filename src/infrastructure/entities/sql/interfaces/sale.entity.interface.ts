import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface ISaleEntity extends IBaseEntity {
  date: Date;
  productId: number;
  quantity: number;
  price: number;
  userId: number;
}
