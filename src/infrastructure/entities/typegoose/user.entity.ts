import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";
import { IUserEntity } from "../user.entity.interface";
import { Types } from "mongoose";

@modelOptions({ schemaOptions: { collection: "users", timestamps: true } })
export class UserSchema implements Omit<IUserEntity, "id"> {
  id: Types.ObjectId;

  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  phoneNumbers: string[];

  @prop({ required: true })
  createdAt: Date;

  @prop({ required: true })
  updatedAt: Date;
}

export const UserEntity = getModelForClass(UserSchema);
