import { IUserEntity } from "@root/infrastructure/entities/user.entity.interface";
import { IUserModel } from "./user.model.interface";
import { Identity } from "@root/common/types/indentity.type";

// TODO: Add private schema and public validate method
type UserData = { id: Identity; email: string; name: string; phoneNumbers: string[] };

export class UserModel implements IUserModel {
  public id: string;
  public email: string;
  public name: string;
  public phoneNumbers: string[];

  constructor(userEntity: IUserEntity);
  constructor(userData: UserData);
  constructor(id: Identity, email: string, name: string, phoneNumbers: string[]);
  constructor(arg1: Identity | IUserEntity | UserData, email?: string, name?: string, phoneNumbers?: string[]) {
    switch (true) {
      case typeof arg1 === "object" && "email" in arg1: {
        const { id, email, name, phoneNumbers } = arg1;

        this.id = id.toString();
        this.email = email;
        this.name = name;
        this.phoneNumbers = phoneNumbers;
        break;
      }
      default:
        this.id = arg1.toString();
        this.email = email ?? "";
        this.name = name ?? "";
        this.phoneNumbers = phoneNumbers ?? [];
    }
  }

  addPhoneNumber(phoneNumber: string): void {
    this.phoneNumbers.push(phoneNumber);
  }

  removePhoneNumber(phoneNumber: string): void {
    const index = this.phoneNumbers.indexOf(phoneNumber);
    if (index !== -1) {
      this.phoneNumbers.splice(index, 1);
    }
  }
}
