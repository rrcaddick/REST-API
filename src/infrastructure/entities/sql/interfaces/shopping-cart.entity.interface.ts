import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IShoppingCartEntity extends IBaseEntity {
  userId: number;
  productVariantId: number;
  quantity: number;
}
