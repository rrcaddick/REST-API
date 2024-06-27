import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { OrderItemEntity } from "@entities/sql/typeorm/order-item.entity";
import { IOrderItemEntity } from "@entities/sql/interfaces/order-item.entity.interface";

@autoInjectable()
export class OrderItemRepository extends BaseRepository<OrderItemEntity, IOrderItemEntity> {
  constructor(@inject("OrderItemEntity") orderItemEntity: OrderItemEntity) {
    super(orderItemEntity);
  }
}
