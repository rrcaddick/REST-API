import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IProductVariantEntity extends IBaseEntity {
  productId: number;
  variantName: string;
  variantValue: string;
}
