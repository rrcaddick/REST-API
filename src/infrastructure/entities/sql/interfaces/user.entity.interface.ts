import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IUserEntity extends IBaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  mobile: string;
}
