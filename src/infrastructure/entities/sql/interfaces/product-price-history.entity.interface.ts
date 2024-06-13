import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IProductPriceHistoryEntity extends IBaseEntity {
  productId: number;
  price: number;
  startDate: Date;
  endDate: Date;
}
