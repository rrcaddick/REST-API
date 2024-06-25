import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { IWishlistEntity } from "@entities/sql/interfaces/wishlist.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { UserEntity } from "@entities/sql/typeorm/user.entity";
import { WishlistItemEntity } from "@entities/sql/typeorm/wishlist-item.entity";

@Entity({ name: "wishlists" })
export class WishlistEntity extends BaseEntity implements IWishlistEntity {
  @Column()
  name: string;

  @Column({ name: "user_id" })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user: UserEntity;

  @OneToMany(() => WishlistItemEntity, (wishlistItem) => wishlistItem.wishlistId)
  wishlistItems: WishlistItemEntity[];
}
