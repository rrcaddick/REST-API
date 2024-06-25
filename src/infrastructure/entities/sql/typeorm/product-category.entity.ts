import { Column, Entity, OneToMany } from "typeorm";
import { IProductCategoryEntity } from "@entities/sql/interfaces/product-category.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { ProductEntity } from "@entities/sql/typeorm/product.entity";

@Entity("product_categories")
export class ProductCategoryEntity extends BaseEntity implements IProductCategoryEntity {
  @Column()
  public name: string;

  @OneToMany(() => ProductEntity, (product) => product.categoryId)
  public products: ProductEntity[];
}
