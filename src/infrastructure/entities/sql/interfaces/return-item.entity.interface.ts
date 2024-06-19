import { ITimestampEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IReturnItemEntity extends ITimestampEntity {
  returnId: number;
  productVariantId: number;
  quantity: number;
}