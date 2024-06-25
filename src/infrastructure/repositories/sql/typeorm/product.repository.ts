import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { ProductEntity } from "@entities/sql/typeorm/product.entity";
import { IProductEntity } from "@entities/sql/interfaces/product.entity.interface";

@autoInjectable()
export class ProductRepository extends BaseRepository<ProductEntity, IProductEntity> {
  constructor(@inject("ProductEntity") productEntity: ProductEntity) {
    super(productEntity);
  }
}
