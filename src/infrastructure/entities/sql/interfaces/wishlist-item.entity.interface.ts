import { ITimestampEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IWishlistItemEntity extends ITimestampEntity {
  wishlistId: number;
  productId: number;
}
