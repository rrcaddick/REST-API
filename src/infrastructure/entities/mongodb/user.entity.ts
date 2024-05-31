import { Identity } from "@root/common/types/indentity.type";
import { IUserEntity } from "../user.entity.interface";

export class UserEntity implements IUserEntity {
  id: Identity;
  name: string;
  email: string;
  password: string;
  phoneNumbers: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    
  }
}
