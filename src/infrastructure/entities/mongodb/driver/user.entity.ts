import { IUserEntity } from "../../sql/interfaces/user.entity.interface";

export class UserEntity implements Omit<IUserEntity, "id"> {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  mobile: string;
  createdAt: Date;
  updatedAt: Date;
}
