import { ITimestampEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IReturnItemEntity extends ITimestampEntity {
  returnId: number;
  orderItemId: number;
  quantity: number;
}
