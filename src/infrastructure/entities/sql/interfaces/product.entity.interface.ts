import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IProductEntity extends IBaseEntity {
  name: string;
  description: string;
  price: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  brand: string;
  categoryId: number;
}
