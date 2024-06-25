import { Entity, Column, JoinColumn, OneToOne } from "typeorm";
import { IInventoryEntity } from "@entities/sql/interfaces/inventory.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { ProductEntity } from "@entities/sql/typeorm/product.entity";

@Entity("inventory")
export class InventoryEntity extends BaseEntity implements IInventoryEntity {
  @Column({ name: "product_id" })
  public productId: number;

  @Column()
  public quantity: number;

  @OneToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  public product: ProductEntity;
}
