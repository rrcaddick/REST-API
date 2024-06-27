import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { WishlistItemEntity } from "@entities/sql/typeorm/wishlist-item.entity";
import { IWishlistItemEntity } from "@entities/sql/interfaces/wishlist-item.entity.interface";

@autoInjectable()
export class WishlistItemRepository extends BaseRepository<WishlistItemEntity, IWishlistItemEntity> {
  constructor(@inject("WishlistItemEntity") wishlistItemEntity: WishlistItemEntity) {
    super(wishlistItemEntity);
  }
}
