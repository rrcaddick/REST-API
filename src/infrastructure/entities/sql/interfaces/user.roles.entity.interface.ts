import { ITimestampEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IUserRoleEntity extends ITimestampEntity {
  userId: number;
  roleId: number;
}
