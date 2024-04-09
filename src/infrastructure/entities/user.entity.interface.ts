import { Identity } from "@root/common/types/indentity.type";

export interface IUserEntity {
  id: Identity;
  name: string;
  email: string;
  password: string;
  phoneNumbers: string[];
  createdAt: Date;
  updatedAt: Date;
}
