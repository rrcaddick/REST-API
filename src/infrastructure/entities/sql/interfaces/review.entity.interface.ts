import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IReviewEntity extends IBaseEntity {
  userId: number;
  productId: number;
  rating: number;
  review: string;
  reviewDate: string;
}
