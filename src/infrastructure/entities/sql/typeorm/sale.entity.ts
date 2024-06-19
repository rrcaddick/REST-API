import { ISaleEntity } from "@entities/sql/interfaces/sales.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ProductVariantEntity } from "./product-variant.entity";
import { UserEntity } from "./user.entity";

@Entity("sales")
export class SaleEntity extends BaseEntity implements ISaleEntity {
  @Column({ type: "datetime" })
  public date: Date;

  @Column()
  public quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  public price: number;

  @Column({ name: "product_variant_id" })
  public productVariantId: number;

  @Column({ name: "user_id" })
  public userId: number;

  @ManyToOne(() => ProductVariantEntity, (productVariant) => productVariant.id)
  @JoinColumn({
    name: "product_variant_id",
    referencedColumnName: "id",
  })
  public productVariant: ProductVariantEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  public user: UserEntity;
}
