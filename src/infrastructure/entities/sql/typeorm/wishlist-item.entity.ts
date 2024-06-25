import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IWishlistItemEntity } from "@entities/sql/interfaces/wishlist-item.entity.interface";
import { TimestampEntity } from "@entities/sql/typeorm/base.entity";
import { WishlistEntity } from "@entities/sql/typeorm/wishlist.entity";
import { ProductEntity } from "@entities/sql/typeorm/product.entity";

@Entity({ name: "wishlist_items" })
export class WishlistItemEntity extends TimestampEntity implements IWishlistItemEntity {
  @PrimaryColumn({ name: "wishlist_id" })
  public wishlistId: number;

  @PrimaryColumn({ name: "product_id" })
  public productId: number;

  @ManyToOne(() => WishlistEntity, (wishlist) => wishlist.id)
  @JoinColumn({
    name: "wishlist_id",
    referencedColumnName: "id",
  })
  public wishlist: WishlistEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  public product: ProductEntity;
}
