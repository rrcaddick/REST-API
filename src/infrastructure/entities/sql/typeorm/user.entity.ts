import bcrypt from "bcrypt";
import { Entity, Column, OneToMany, ManyToMany, JoinTable, BeforeInsert } from "typeorm";
import { IUserEntity } from "@entities/sql/interfaces/user.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { UserRoleEntity } from "@root/infrastructure/entities/sql/typeorm/user-role.entity";
import { RoleEntity } from "@entities/sql/typeorm/role.entity";
import { AddressEntity } from "@entities/sql/typeorm/address.entity";
import { UserAddressEntity } from "@root/infrastructure/entities/sql/typeorm/user-address.entity";
import { WishlistEntity } from "@entities/sql/typeorm/wishlist.entity";
import { OrderEntity } from "@entities/sql/typeorm/order.entity";
import { ShoppingCartEntity } from "./shopping-cart.entity";
import { ReviewEntity } from "./review.entity";

@Entity("users")
export class UserEntity extends BaseEntity implements IUserEntity {
  @Column({ name: "first_name" })
  public firstName: string;

  @Column({ name: "last_name" })
  public lastName: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ name: "date_of_birth", type: "date" })
  public dateOfBirth: Date;

  @Column()
  public mobile: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  public credit: number;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
  public userRoles: UserRoleEntity[];

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({
    name: "user_roles",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
  })
  public roles: RoleEntity[];

  @OneToMany(() => UserAddressEntity, (userAddress) => userAddress.user)
  public userAddressses: UserAddressEntity[];

  @ManyToMany(() => AddressEntity, (address) => address.users)
  @JoinTable({
    name: "user_addresses",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "address_id",
      referencedColumnName: "id",
    },
  })
  public addresses: AddressEntity[];

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.userId)
  public wishlists: WishlistEntity[];

  @OneToMany(() => OrderEntity, (order) => order.userId)
  public orders: OrderEntity[];

  @OneToMany(() => ShoppingCartEntity, (shoppingCart) => shoppingCart.userId)
  public shoppingCartItems: ShoppingCartEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.userId)
  public reviews: ReviewEntity[];

  @BeforeInsert()
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();

    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
