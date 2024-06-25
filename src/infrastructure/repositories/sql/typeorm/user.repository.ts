import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { UserEntity } from "@entities/sql/typeorm/user.entity";
import { IUserEntity } from "@entities/sql/interfaces/user.entity.interface";

@autoInjectable()
export class UserRepository extends BaseRepository<UserEntity, IUserEntity> {
  constructor(@inject("UserEntity") userEntity: UserEntity) {
    super(userEntity);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.repo.findOneBy({ email });
  }

  async findByName(firstName: string, lastName: string): Promise<UserEntity[] | null> {
    return await this.repo.findBy({ firstName, lastName });
  }
}
