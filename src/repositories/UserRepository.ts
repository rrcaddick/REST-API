import { User } from "../types/User";
import { IRepository } from "./IRepository";
import { UserModel } from "../models/UserModel";

export class MongooseUserRepository implements IRepository<User> {
  private model = UserModel;

  async create(data: User): Promise<User> {
    const user = await this.model.create(data);
    return user.toObject();
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.model.findOneAndUpdate({ _id: id }, data, { new: true });

    if (!user) throw new Error("User not found");

    return user.toObject();
  }

  async delete(id: string): Promise<User> {
    const user = await this.model.findOneAndDelete({ _id: id });

    if (!user) throw new Error("User not found");

    return user.toObject();
  }
}
