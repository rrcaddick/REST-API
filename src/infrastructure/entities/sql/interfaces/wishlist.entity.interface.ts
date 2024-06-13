import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IWishlistEntity extends IBaseEntity {
  name: string;
  userId: number;
}
