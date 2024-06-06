import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IRoleEntity extends IBaseEntity {
  roleName: string;
}
