import { IUserEntity } from "@root/infrastructure/entities/sql/interfaces/user.entity.interface";
import { IUserModel } from "./user.model.interface";

// TODO: Refactor to implement BaseService<T> for basic CRUD operations
export interface IUserService {
  get(id: string): Promise<IUserModel>;
  create(newUser: Omit<IUserEntity, "id">): Promise<IUserModel>;
}
