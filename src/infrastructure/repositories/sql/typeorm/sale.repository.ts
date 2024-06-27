import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { SaleEntity } from "@entities/sql/typeorm/sale.entity";
import { ISaleEntity } from "@entities/sql/interfaces/sale.entity.interface";

@autoInjectable()
export class SaleRepository extends BaseRepository<SaleEntity, ISaleEntity> {
  constructor(@inject("SaleEntity") saleEntity: SaleEntity) {
    super(saleEntity);
  }
}
