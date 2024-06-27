import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { ReturnItemEntity } from "@entities/sql/typeorm/return-item.entity";
import { IReturnItemEntity } from "@entities/sql/interfaces/return-item.entity.interface";

@autoInjectable()
export class ReturnItemRepository extends BaseRepository<ReturnItemEntity, IReturnItemEntity> {
  constructor(@inject("ReturnItemEntity") returnItemEntity: ReturnItemEntity) {
    super(returnItemEntity);
  }
}
