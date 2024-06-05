import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IRoles extends IBaseEntity {
  roleName: string;
}
