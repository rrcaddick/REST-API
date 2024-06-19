import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IWishlistItemEntity } from "../interfaces/wishlist-item.entity.interface";
import { TimestampEntity } from "./base.entity";
import { WishlistEntity } from "./wishlist.entity";
import { ProductVariantEntity } from "./product-variant.entity";

@Entity({ name: "wishlist_items" })
export class WishlistItemEntity extends TimestampEntity implements IWishlistItemEntity {
  @PrimaryColumn({ name: "wishlist_id" })
  public wishlistId: number;

  @PrimaryColumn({ name: "product_variant_id" })
  public productVariantId: number;

  @ManyToOne(() => WishlistEntity, (wishlist) => wishlist.id)
  @JoinColumn({
    name: "wishlist_id",
    referencedColumnName: "id",
  })
  public wishlist: WishlistEntity;

  @ManyToOne(() => ProductVariantEntity, (productVariant) => productVariant.id)
  @JoinColumn({
    name: "product_variant_id",
    referencedColumnName: "id",
  })
  public productVariant: ProductVariantEntity;
}
