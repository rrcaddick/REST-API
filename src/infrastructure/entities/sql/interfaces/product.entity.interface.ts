import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IProductEntity extends IBaseEntity {
  name: string;
  description: string;
  price: number;
  weight: number;
  color: string;
  length: number;
  width: number;
  depth: number;
  categoryId: number;
  brand: string;
}
