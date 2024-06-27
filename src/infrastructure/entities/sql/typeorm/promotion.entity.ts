import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { IPromotionEntity } from "@entities/sql/interfaces/promotion.entity.interface";
import { ProductEntity } from "@entities/sql/typeorm/product.entity";

@Entity("promotions")
export class PromotionEntity extends BaseEntity implements IPromotionEntity {
  @Column()
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  discount: number;

  @Column({ name: "start_date", type: "datetime" })
  startDate: Date;

  @Column({ name: "end_date", type: "datetime" })
  endDate: Date;

  @Column({ name: "product_id" })
  productId: number;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  public product: ProductEntity;
}
