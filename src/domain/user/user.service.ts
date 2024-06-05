import { autoInjectable, inject } from "tsyringe";
import { IUserModel } from "./user.model.interface";
import { IUserService } from "./user.service.interface";
import { getIdentity } from "@root/utils/database";
import { IUserRepository } from "@root/infrastructure/repositories/typegoose/user.repository.interface";
import { IUserEntity } from "@root/infrastructure/entities/sql/interfaces/user.entity.interface";
import { UserModel } from "./user.model";

@autoInjectable()
export class UserService implements IUserService {
  constructor(@inject("UserRepository") private _repo?: IUserRepository<IUserEntity>) {}

  private get repo() {
    if (!this._repo) throw Error("No user repository defined");
    return this._repo;
  }

  public async get(id: string): Promise<IUserModel> {
    const user = await this.repo.getById(getIdentity(id));

    return new UserModel(user);
  }

  public async create(newUser: Omit<IUserEntity, "id">): Promise<IUserModel> {
    const user = await this.repo.create(newUser);

    return new UserModel(user);
  }
}
