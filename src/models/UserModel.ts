import { User } from "../types/User";
import { prop, getModelForClass } from "@typegoose/typegoose";

export class UserSchema implements User {
  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  createdAt: Date;
}

export const UserModel = getModelForClass(UserSchema);
