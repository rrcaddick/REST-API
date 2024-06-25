import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { ReviewEntity } from "@entities/sql/typeorm/review.entity";
import { IReviewEntity } from "@entities/sql/interfaces/review.entity.interface";

@autoInjectable()
export class ReviewRepository extends BaseRepository<ReviewEntity, IReviewEntity> {
  constructor(@inject("ReviewEntity") reviewEntity: ReviewEntity) {
    super(reviewEntity);
  }
}
