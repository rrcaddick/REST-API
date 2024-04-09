import { IUserEntity } from "@root/infrastructure/entities/user.entity.interface";
import { IUserModel } from "./user.model.interface";

// TODO: Refactorf to implement BaseService<T> for basic CRUD operations
export interface IUserService {
  get(id: string): Promise<IUserModel>;
  create(newUser: Omit<IUserEntity, "id">): Promise<IUserModel>;
}
