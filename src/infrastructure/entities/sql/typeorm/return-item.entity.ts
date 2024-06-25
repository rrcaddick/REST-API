import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IReturnItemEntity } from "@entities/sql/interfaces/return-item.entity.interface";
import { TimestampEntity } from "@entities/sql/typeorm/base.entity";
import { ProductEntity } from "@entities/sql/typeorm/product.entity";
import { ReturnEntity } from "@entities/sql/typeorm/return.entity";

@Entity("return_items")
export class ReturnItemEntity extends TimestampEntity implements IReturnItemEntity {
  @PrimaryColumn({ name: "return_id" })
  returnId: number;

  @PrimaryColumn({ name: "product_id" })
  productId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ReturnEntity, (returnEntity) => returnEntity.id)
  @JoinColumn({
    name: "return_id",
    referencedColumnName: "id",
  })
  public return: ReturnEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  public product: ProductEntity;
}
