import { UserEntity } from "@entities/sql/typeorm/user.entity";
import { BaseRepository } from "./base.repository";
import { autoInjectable, inject } from "tsyringe";
import { IUserEntity } from "@entities/sql/interfaces/user.entity.interface";

@autoInjectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(@inject("UserEntity") userEntity: UserEntity) {
    super(userEntity);
  }

  async insertMany(data: Omit<IUserEntity, "id">[]) {
    return await this.repo.createQueryBuilder().insert().values(data).execute();
  }

  async create(data: Omit<IUserEntity, "id">): Promise<UserEntity> {
    return await this.repo.save(data);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.repo.findOneBy({ email });
  }

  async findByName(firstName: string, lastName: string): Promise<UserEntity[] | null> {
    return await this.repo.findBy({ firstName, lastName });
  }
}
