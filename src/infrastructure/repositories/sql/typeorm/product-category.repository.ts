import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { ProductCategoryEntity } from "@entities/sql/typeorm/product-category.entity";
import { IProductCategoryEntity } from "@entities/sql/interfaces/product-category.entity.interface";

@autoInjectable()
export class ProductCategoryRepository extends BaseRepository<ProductCategoryEntity, IProductCategoryEntity> {
  constructor(@inject("ProductCategoryEntity") productCategoryEntity: ProductCategoryEntity) {
    super(productCategoryEntity);
  }
}
