import { IUserEntity } from "@root/infrastructure/entities/user.entity.interface";
import { BaseModel } from "../base.model";
import { IUserModel } from "./user.model.interface";

// TODO: Added provate schema and public validate method
export class UserModel extends BaseModel<IUserModel> implements IUserModel {
  protected model: IUserModel;

  constructor(userModel: IUserModel);
  constructor(userEntity: IUserEntity);
  constructor(id: string, email: string, name: string, phoneNumbers: string[]);
  constructor(arg1: IUserModel | IUserEntity | string, email?: string, name?: string, phoneNumbers?: string[]) {
    super();
    switch (typeof arg1) {
      case "object": {
        if ("password" in arg1) {
          const { id, email, name, phoneNumbers } = arg1;
          this.model.id = id.toString();
          this.model.email = email ?? "";
          this.model.name = name ?? "";
          this.model.phoneNumbers = phoneNumbers ?? [];
        } else {
          this.model = arg1;
        }
        break;
      }
      case "string": {
        this.model.id = arg1;
        this.model.email = email ?? "";
        this.model.name = name ?? "";
        this.model.phoneNumbers = phoneNumbers ?? [];
      }
    }
  }

  get id() {
    return this.model.id;
  }

  get email() {
    return this.model.email;
  }

  get name() {
    return this.model.name;
  }

  get phoneNumbers() {
    return this.model.phoneNumbers;
  }

  set email(email: string) {
    this.model.email = email;
  }

  set name(name: string) {
    this.model.name = name;
  }

  addPhoneNumber(phoneNumber: string): void {
    this.model.phoneNumbers.push(phoneNumber);
  }

  removePhoneNumber(phoneNumber: string): void {
    const index = this.model.phoneNumbers.indexOf(phoneNumber);
    if (index !== -1) {
      this.model.phoneNumbers.splice(index, 1);
    }
  }
}
