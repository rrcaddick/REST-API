import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { RefundEntity } from "@entities/sql/typeorm/refund.entity";
import { IRefundEntity } from "@entities/sql/interfaces/refund.entity.interface";

@autoInjectable()
export class RefundRepository extends BaseRepository<RefundEntity, IRefundEntity> {
  constructor(@inject("RefundEntity") refundEntity: RefundEntity) {
    super(refundEntity);
  }
}
