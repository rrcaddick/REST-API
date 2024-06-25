import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { OrderStatusEntity } from "@entities/sql/typeorm/order-status.entity";
import { IOrderStatusEntity } from "@entities/sql/interfaces/order-status.entity.interface";

@autoInjectable()
export class OrderStatusRepository extends BaseRepository<OrderStatusEntity, IOrderStatusEntity> {
  constructor(@inject("OrderStatusEntity") orderStatusEntity: OrderStatusEntity) {
    super(orderStatusEntity);
  }
}
