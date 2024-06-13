import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IProductCategoryEntity extends IBaseEntity {
  name: string;
}
