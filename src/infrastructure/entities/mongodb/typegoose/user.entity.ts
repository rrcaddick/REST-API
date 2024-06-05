import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";
import { IUserEntity } from "../../sql/interfaces/user.entity.interface";

@modelOptions({ schemaOptions: { collection: "users", timestamps: true } })
export class UserSchema implements Omit<IUserEntity, "id"> {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  mobile: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  createdAt: Date;

  @prop({ required: true })
  updatedAt: Date;
}

export const UserEntity = getModelForClass(UserSchema);
