import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { InventoryEntity } from "@entities/sql/typeorm/inventory.entity";
import { IInventoryEntity } from "@entities/sql/interfaces/inventory.entity.interface";

@autoInjectable()
export class InventoryRepository extends BaseRepository<InventoryEntity, IInventoryEntity> {
  constructor(@inject("InventoryEntity") inventoryEntity: InventoryEntity) {
    super(inventoryEntity);
  }
}
