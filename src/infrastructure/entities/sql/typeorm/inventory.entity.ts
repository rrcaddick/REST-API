import { Entity, Column, JoinColumn, OneToOne } from "typeorm";
import { IInventoryEntity } from "@entities/sql/interfaces/inventory.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { ProductVariantEntity } from "@entities/sql/typeorm/product-variant.entity";

// In a real world implementation, this can be expanded to include a warehouse id etc, which is why
// inventory wasn't added directly to product variant table. OneToOne would change to ManyToOne
@Entity("inventory")
export class InventoryEntity extends BaseEntity implements IInventoryEntity {
  @Column({ name: "product_variant_id" })
  public productVariantId: number;

  @Column()
  public quantity: number;

  @OneToOne(() => ProductVariantEntity, (productVariant) => productVariant.id)
  @JoinColumn({
    name: "product_variant_id",
    referencedColumnName: "id",
  })
  public productVariant: ProductVariantEntity;
}
