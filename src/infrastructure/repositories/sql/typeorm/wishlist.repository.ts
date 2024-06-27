import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { WishlistEntity } from "@entities/sql/typeorm/wishlist.entity";
import { IWishlistEntity } from "@entities/sql/interfaces/wishlist.entity.interface";

@autoInjectable()
export class WishlistRepository extends BaseRepository<WishlistEntity, IWishlistEntity> {
  constructor(@inject("WishlistEntity") wishlistEntity: WishlistEntity) {
    super(wishlistEntity);
  }
}
