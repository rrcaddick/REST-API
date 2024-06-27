import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { ShoppingCartEntity } from "@entities/sql/typeorm/shopping-cart.entity";
import { IShoppingCartEntity } from "@entities/sql/interfaces/shopping-cart.entity.interface";

@autoInjectable()
export class ShoppingCartRepository extends BaseRepository<ShoppingCartEntity, IShoppingCartEntity> {
  constructor(@inject("ShoppingCartEntity") shoppingCartEntity: ShoppingCartEntity) {
    super(shoppingCartEntity);
  }
}
