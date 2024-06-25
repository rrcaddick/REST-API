import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IReviewEntity extends IBaseEntity {
  userId: number;
  productId: number;
  rating: number;
  comment?: string;
  reviewDate: Date;
}
