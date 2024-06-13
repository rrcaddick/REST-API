import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
// import { ProductCategoryEntity } from "@entities/sql/typeorm/product_category.entity";
// import { ReviewEntity } from "@entities/sql/typeorm/review.entity";
// import { SalesEntity } from "@entities/sql/typeorm/sales.entity";
// import { ShoppingCartEntity } from "@entities/sql/typeorm/shopping_cart.entity";
// import { ReturnItemEntity } from "@entities/sql/typeorm/return_item.entity";
// import { InventoryEntity } from "@entities/sql/typeorm/inventory.entity";
import { WishlistItemEntity } from "@entities/sql/typeorm/wishlist-item.entity";
import { IProductEntity } from "@entities/sql/interfaces/product.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { ProductCategoryEntity } from "@entities/sql/typeorm/product-category.entity";
import { ProductVariantEntity } from "@entities/sql/typeorm/product-variant.entity";
import { ProductPriceHistoryEntity } from "@entities/sql/typeorm/product-price-history.entity";
import { PromotionEntity } from "@entities/sql/typeorm/promotion.entity";
import { ProductImageEntity } from "@entities/sql/typeorm/product-image.entity";

@Entity("products")
export class ProductEntity extends BaseEntity implements IProductEntity {
  @Column()
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column()
  weight: number;

  @Column()
  color: string;

  @Column()
  length: number;

  @Column()
  width: number;

  @Column()
  depth: number;

  @Column({ name: "category_id" })
  categoryId: number;

  @Column()
  brand: string;

  @ManyToOne(() => ProductCategoryEntity, (category) => category.id)
  @JoinColumn({
    name: "category_id",
    referencedColumnName: "id",
  })
  public category: ProductCategoryEntity;

  @OneToMany(() => ProductVariantEntity, (variant) => variant.productId)
  variants: ProductVariantEntity[];

  @OneToMany(() => ProductImageEntity, (productImage) => productImage.productId)
  public images: ProductImageEntity[];

  @OneToMany(() => ProductPriceHistoryEntity, (productProceHistory) => productProceHistory.productId)
  public priceHistory: ProductPriceHistoryEntity[];

  @OneToMany(() => PromotionEntity, (promotion) => promotion.productId)
  public promotions: PromotionEntity[];

  @OneToMany(() => WishlistItemEntity, (wishlistItem) => wishlistItem.productId)
  wishlistItems: WishlistItemEntity[];

  // @OneToMany(() => ReviewEntity, (review) => review.product)
  // reviews: ReviewEntity[];

  // @OneToMany(() => SalesEntity, (sale) => sale.product)
  // sales: SalesEntity[];

  // @OneToMany(() => ShoppingCartEntity, (cartItem) => cartItem.product)
  // shoppingCartItems: ShoppingCartEntity[];

  // @OneToMany(() => ReturnItemEntity, (returnItem) => returnItem.product)
  // returnItems: ReturnItemEntity[];

  // @OneToMany(() => InventoryEntity, (inventory) => inventory.product)
  // inventory: InventoryEntity[];
}
