import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IReturnItemEntity } from "@entities/sql/interfaces/return-item.entity.interface";
import { TimestampEntity } from "@entities/sql/typeorm/base.entity";
import { ProductVariantEntity } from "./product-variant.entity";
import { ReturnEntity } from "./return.entity";

@Entity("return_items")
export class ReturnItemEntity extends TimestampEntity implements IReturnItemEntity {
  @PrimaryColumn({ name: "return_id" })
  returnId: number;

  @PrimaryColumn({ name: "product_variant_id" })
  productVariantId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ReturnEntity, (returnEntity) => returnEntity.id)
  @JoinColumn({
    name: "return_id",
    referencedColumnName: "id",
  })
  public return: ReturnEntity;

  @ManyToOne(() => ProductVariantEntity, (productVariant) => productVariant.id)
  @JoinColumn({
    name: "product_variant_id",
    referencedColumnName: "id",
  })
  public productVariant: ProductVariantEntity;
}
