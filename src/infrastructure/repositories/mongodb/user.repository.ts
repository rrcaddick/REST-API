import { IUserEntity } from "@root/infrastructure/entities/user.entity.interface";
import { IUserRepository } from "../typegoose/user.repository.interface";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<IUserEntity> implements IUserRepository<IUserEntity> {
  // TODO: Fix entity type
  protected entity: any;

  constructor() {
    super("User");
    this.entity = ""; // TODO: Set this equal to mongodb collection
  }
}
