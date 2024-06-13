import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IProductImageEntity extends IBaseEntity {
  productId: number;
  imageUrl: string;
}
