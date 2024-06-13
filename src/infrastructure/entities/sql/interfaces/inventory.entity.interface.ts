import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IInventoryEntity extends IBaseEntity {
  productVariantId: number;
  quantity: number;
}
