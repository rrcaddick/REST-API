import { Entity, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { IUserEntity } from "@entities/sql/interfaces/user.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { UserRoleEntity } from "@entities/sql/typeorm/user.roles.entity";
import { RoleEntity } from "@entities/sql/typeorm/role.entity";
import { AddressEntity } from "@entities/sql/typeorm/address.entity";
import { UserAddressEntity } from "@entities/sql/typeorm/user.address.entity";
import { WishlistEntity } from "@entities/sql/typeorm/wishlist.entity";
import { OrderEntity } from "@entities/sql/typeorm/order.entity";

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
}
