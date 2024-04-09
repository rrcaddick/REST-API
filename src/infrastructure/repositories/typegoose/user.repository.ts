import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "./base.repository";
import { IUserEntity } from "../../entities/user.entity.interface";
import { ReturnModelType } from "@typegoose/typegoose";
import { BeAnObject } from "@typegoose/typegoose/lib/types";
import { UserSchema } from "@root/infrastructure/entities/typegoose/user.entity";
import { IUserRepository } from "./user.repository.interface";

@autoInjectable()
export class MongooseUserRepository extends BaseRepository<IUserEntity> implements IUserRepository<IUserEntity> {
  constructor(@inject("UserEntity") protected entity: ReturnModelType<typeof UserSchema, BeAnObject>) {
    super("User");
  }
}
