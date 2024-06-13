import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { IWishlistEntity } from "../interfaces/wishlist.entity.interface";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";
import { WishlistItemEntity } from "./wishlist-item.entity";

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
