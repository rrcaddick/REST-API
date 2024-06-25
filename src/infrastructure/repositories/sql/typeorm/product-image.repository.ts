import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { ProductImageEntity } from "@entities/sql/typeorm/product-image.entity";
import { IProductImageEntity } from "@entities/sql/interfaces/product-image.entity.interface";

@autoInjectable()
export class ProductImageRepository extends BaseRepository<ProductImageEntity, IProductImageEntity> {
  constructor(@inject("ProductImageEntity") productImageEntity: ProductImageEntity) {
    super(productImageEntity);
  }
}
