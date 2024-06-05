import { UserEntity } from "@root/infrastructure/entities/sql/typeorm/user.entity";
import { IUserEntity } from "@root/infrastructure/entities/sql/interfaces/user.entity.interface";
import { EntityRepository, Repository } from "typeorm";

export interface IBaseRepository<T> {
  hasId(user: T): Boolean;
  create(): T;
  create(user: Partial<Omit<T, "id">>): T;
  save(user: T): Promise<T>;
  remove(user: T): Promise<T>;
  // insert(user: T): Promise<T>;
}

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> implements IBaseRepository<IUserEntity> {
  findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder("user")
      .where("user.firstName = :firstName", { firstName })
      .andWhere("user.lastName = :lastName", { lastName })
      .getMany();
  }
}
