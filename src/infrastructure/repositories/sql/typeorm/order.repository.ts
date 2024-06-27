import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { OrderEntity } from "@entities/sql/typeorm/order.entity";
import { IOrderEntity } from "@entities/sql/interfaces/order.entity.interface";

@autoInjectable()
export class OrderRepository extends BaseRepository<OrderEntity, IOrderEntity> {
  constructor(@inject("OrderEntity") orderEntity: OrderEntity) {
    super(orderEntity);
  }
}
