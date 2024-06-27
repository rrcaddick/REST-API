import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { ReturnEntity } from "@entities/sql/typeorm/return.entity";
import { IReturnEntity } from "@entities/sql/interfaces/return.entity.interface";

@autoInjectable()
export class ReturnRepository extends BaseRepository<ReturnEntity, IReturnEntity> {
  constructor(@inject("ReturnEntity") returnEntity: ReturnEntity) {
    super(returnEntity);
  }
}
