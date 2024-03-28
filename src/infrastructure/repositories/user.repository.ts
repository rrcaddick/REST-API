import { prop, getModelForClass } from "@typegoose/typegoose";
import { IUser } from "@user/user.interface";
import { IRepository } from "@repositories/repository.interface";

export class UserSchema implements IUser {
  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  createdAt: Date;
}

const UserModel = getModelForClass(UserSchema);

export class MongooseUserRepository implements IRepository<IUser> {
  private model = UserModel;

  async create(data: IUser): Promise<IUser> {
    const user = await this.model.create(data);
    return user.toObject();
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser> {
    const user = await this.model.findOneAndUpdate({ _id: id }, data, { new: true });

    if (!user) throw new Error("User not found");

    return user.toObject();
  }

  async delete(id: string): Promise<IUser> {
    const user = await this.model.findOneAndDelete({ _id: id });

    if (!user) throw new Error("User not found");

    return user.toObject();
  }
}
