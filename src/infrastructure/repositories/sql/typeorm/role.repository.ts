import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { RoleEntity } from "@entities/sql/typeorm/role.entity";
import { IRoleEntity } from "@entities/sql/interfaces/role.entity.interface";

@autoInjectable()
export class RoleRepository extends BaseRepository<RoleEntity, IRoleEntity> {
  constructor(@inject("RoleEntity") roleEntity: RoleEntity) {
    super(roleEntity);
  }
}
