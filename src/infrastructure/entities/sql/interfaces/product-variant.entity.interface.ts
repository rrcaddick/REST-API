import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

interface IproductEntity extends IBaseEntity {
  productId: number;
  variantName: string;
  variantValue: string;
}
