import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IShoppingCartEntity } from "@entities/sql/interfaces/shopping-cart.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { UserEntity } from "@entities/sql/typeorm/user.entity";
import { ProductVariantEntity } from "@entities/sql/typeorm/product-variant.entity";

@Entity("shopping_cart")
export class ShoppingCartEntity extends BaseEntity implements IShoppingCartEntity {
  @PrimaryColumn({ name: "user_id " })
  userId: number;

  @PrimaryColumn({ name: "product_variant_id " })
  productVariantId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user: UserEntity;

  @ManyToOne(() => ProductVariantEntity, (productVariant) => productVariant.id)
  @JoinColumn({
    name: "product_variant_id",
    referencedColumnName: "id",
  })
  productVariant: ProductVariantEntity;
}
