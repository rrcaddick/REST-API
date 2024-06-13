import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { IProductVariantEntity } from "@entities/sql/interfaces/product-variant.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { ProductEntity } from "@entities/sql/typeorm/product.entity";
import { InventoryEntity } from "@entities/sql/typeorm/inventory.entity";

@Entity("product_variants")
export class ProductVariantEntity extends BaseEntity implements IProductVariantEntity {
  @Column({ name: "product_id" })
  public productId: number;

  @Column({ name: "variant_name" })
  public variantName: string;

  @Column({ name: "variant_value" })
  public variantValue: string;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  public product: ProductEntity;

  @OneToOne(() => InventoryEntity, (inventory) => inventory.productVariantId)
  public inventory: InventoryEntity;
}
