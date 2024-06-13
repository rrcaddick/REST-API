import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { IWishlistItemEntity } from "../interfaces/wishlist-item.entity.interface";
import { TimestampEntity } from "./base.entity";
import { ProductEntity } from "./product.entity";
import { WishlistEntity } from "./wishlist.entity";

@Entity({ name: "wishlist_items" })
export class WishlistItemEntity extends TimestampEntity implements IWishlistItemEntity {
  @PrimaryColumn({ name: "wishlist_id" })
  wishlistId: number;

  @PrimaryColumn({ name: "product_id" })
  productId: number;

  @ManyToOne(() => WishlistEntity, (wishlist) => wishlist.id)
  wishlist: WishlistEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  product: ProductEntity;
}
