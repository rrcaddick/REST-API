import { ISaleEntity } from "@root/infrastructure/entities/sql/interfaces/sale.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ProductEntity } from "@entities/sql/typeorm/product.entity";
import { UserEntity } from "@entities/sql/typeorm/user.entity";

@Entity("sales")
export class SaleEntity extends BaseEntity implements ISaleEntity {
  @Column({ type: "datetime" })
  public date: Date;

  @Column()
  public quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  public price: number;

  @Column({ name: "product_id" })
  public productId: number;

  @Column({ name: "user_id" })
  public userId: number;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  public product: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  public user: UserEntity;
}
