import { ITimestampEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IUserRoles extends ITimestampEntity {
  userId: number;
  roleId: number;
}
