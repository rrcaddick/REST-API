import { prop } from "@typegoose/typegoose";
import { IUser } from "@user/user.interface";

export class UserSchema implements IUser {
  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  createdAt: Date;
}
