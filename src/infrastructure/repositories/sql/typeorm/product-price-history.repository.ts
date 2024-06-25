import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { ProductPriceHistoryEntity } from "@entities/sql/typeorm/product-price-history.entity";
import { IProductPriceHistoryEntity } from "@entities/sql/interfaces/product-price-history.entity.interface";

@autoInjectable()
export class ProductPriceHistoryRepository extends BaseRepository<
  ProductPriceHistoryEntity,
  IProductPriceHistoryEntity
> {
  constructor(@inject("ProductPriceHistoryEntity") productPriceHistoryEntity: ProductPriceHistoryEntity) {
    super(productPriceHistoryEntity);
  }
}
