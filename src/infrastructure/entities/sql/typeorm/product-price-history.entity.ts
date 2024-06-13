import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { IProductPriceHistoryEntity } from "@entities/sql/interfaces/product-price-history.entity.interface";
import { ProductEntity } from "@entities/sql/typeorm/product.entity";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";

@Entity("product_price_history")
export class ProductPriceHistoryEntity extends BaseEntity implements IProductPriceHistoryEntity {
  @Column({ name: "product_id" })
  public productId: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  public price: number;

  @Column({ name: "start_date", type: "datetime" })
  public startDate: Date;

  @Column({ name: "end_date", type: "datetime" })
  public endDate: Date;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  public product: ProductEntity;
}
