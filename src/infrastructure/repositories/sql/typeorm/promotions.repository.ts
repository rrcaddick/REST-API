import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { PromotionEntity } from "@entities/sql/typeorm/promotion.entity";
import { IPromotionEntity } from "@entities/sql/interfaces/promotion.entity.interface";

@autoInjectable()
export class PromotionRepository extends BaseRepository<PromotionEntity, IPromotionEntity> {
  constructor(@inject("PromotionEntity") promotionEntity: PromotionEntity) {
    super(promotionEntity);
  }
}
