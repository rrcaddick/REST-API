import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IShoppingCartEntity } from "@entities/sql/interfaces/shopping-cart.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { UserEntity } from "@entities/sql/typeorm/user.entity";
import { ProductEntity } from "@entities/sql/typeorm/product.entity";

@Entity("shopping_carts")
export class ShoppingCartEntity extends BaseEntity implements IShoppingCartEntity {
  @PrimaryColumn({ name: "user_id" })
  userId: number;

  @PrimaryColumn({ name: "product_id" })
  productId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  product: ProductEntity;
}
