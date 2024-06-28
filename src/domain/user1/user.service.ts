// import { autoInjectable, inject } from "tsyringe";
// import { IUserModel } from "./user.model.interface";
// import { IUserService } from "./user.service.interface";
// import { getIdentity } from "@root/utils/database";
// import { IUserRepository } from "@repositories/mongodb/typegoose/user.repository.interface";
// import { IUserEntity } from "@entities/sql/interfaces/user.entity.interface";
// import { UserModel } from "./user.model";
// import { UserRepository } from "@root/infrastructure/repositories/sql/typeorm/user.repository";

// @autoInjectable()
// export class UserService {
//   constructor(@inject("UserRepository") private _repo?: UserRepository) {}
//   private get repo() {
//     if (!this._repo) throw Error("No user repository defined");
//     return this._repo;
//   }
//   public async getUser(id: number): Promise<IUserModel> {
//     const user = await this.repo.findOneById(id);
//     return new UserModel(user);
//   }
// }
