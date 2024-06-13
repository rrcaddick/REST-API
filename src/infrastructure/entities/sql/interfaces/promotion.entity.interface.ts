import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IPromotionEntity extends IBaseEntity {
  name: string;
  description?: string;
  productId: number;
  discount: number;
  startDate: Date;
  endDate: Date;
}
