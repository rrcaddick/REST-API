import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { IProductImageEntity } from "@entities/sql/interfaces/product-image.entity.interface";
import { ProductEntity } from "@entities/sql/typeorm/product.entity";

@Entity("product_images")
export class ProductImageEntity extends BaseEntity implements IProductImageEntity {
  @Column({ name: "product_id" })
  public productId: number;

  @Column({ name: "image_url" })
  public imageUrl: string;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  public product: ProductEntity;
}
