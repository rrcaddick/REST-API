import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IReviewEntity } from "@entities/sql/interfaces/review.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { UserEntity } from "@entities/sql/typeorm/user.entity";
import { ProductEntity } from "@entities/sql/typeorm/product.entity";

@Entity("reviews")
export class ReviewEntity extends BaseEntity implements IReviewEntity {
  @PrimaryColumn({ name: "user_id" })
  userId: number;

  @PrimaryColumn({ name: "product_id" })
  productId: number;

  @Column({ type: "int" })
  rating: number;

  @Column({ type: "text", nullable: true })
  comment: string;

  @Column({ name: "review_date", type: "datetime" })
  reviewDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  product: ProductEntity;
}
