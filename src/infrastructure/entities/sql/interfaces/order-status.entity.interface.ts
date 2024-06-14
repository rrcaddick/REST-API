import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IOrderStatusEntity extends IBaseEntity {
  status: string;
}
