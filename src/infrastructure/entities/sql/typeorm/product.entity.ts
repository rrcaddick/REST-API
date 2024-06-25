import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ReviewEntity } from "@entities/sql/typeorm/review.entity";
import { IProductEntity } from "@entities/sql/interfaces/product.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { ProductCategoryEntity } from "@entities/sql/typeorm/product-category.entity";
import { ProductPriceHistoryEntity } from "@entities/sql/typeorm/product-price-history.entity";
import { PromotionEntity } from "@entities/sql/typeorm/promotion.entity";
import { ProductImageEntity } from "@entities/sql/typeorm/product-image.entity";

@Entity("products")
export class ProductEntity extends BaseEntity implements IProductEntity {
  @Column()
  public name: string;

  @Column({ type: "text" })
  public description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  public price: number;

  @Column()
  public weight: number;

  @Column()
  public length: number;

  @Column()
  public width: number;

  @Column()
  public height: number;

  @Column()
  public brand: string;

  @Column({ name: "category_id" })
  public categoryId: number;

  @ManyToOne(() => ProductCategoryEntity, (category) => category.id)
  @JoinColumn({
    name: "category_id",
    referencedColumnName: "id",
  })
  public category: ProductCategoryEntity;

  @OneToMany(() => ProductImageEntity, (productImage) => productImage.productId)
  public images: ProductImageEntity[];

  @OneToMany(() => ProductPriceHistoryEntity, (productProceHistory) => productProceHistory.productId)
  public priceHistory: ProductPriceHistoryEntity[];

  @OneToMany(() => PromotionEntity, (promotion) => promotion.productId)
  public promotions: PromotionEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.product)
  public reviews: ReviewEntity[];
}
