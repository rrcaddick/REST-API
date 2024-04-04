import { getModelForClass, ReturnModelType, getClass } from "@typegoose/typegoose";
import { IUser } from "@user/user.interface";
import { IRepository } from "@repositories/repository.interface";
import { UserSchema } from "../schemas/user.schema";

export class MongooseUserRepository implements IRepository<IUser> {
  private model = getModelForClass(UserSchema);

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
    const user = await this.model.findByIdAndDelete(id);

    if (!user) throw new Error("User not found");

    return user.toObject();
  }
}
