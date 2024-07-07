import bcrypt from "bcrypt";
import { Entity, Column, OneToMany, ManyToMany, JoinTable, BeforeInsert } from "typeorm";
import { IUserEntity } from "@entities/sql/interfaces/user.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { RoleEntity } from "@entities/sql/typeorm/role.entity";
import { AddressEntity } from "@entities/sql/typeorm/address.entity";
import { UserAddressEntity } from "@infrastructure/entities/sql/typeorm/user-address.entity";
import { WishlistEntity } from "@entities/sql/typeorm/wishlist.entity";
import { OrderEntity } from "@entities/sql/typeorm/order.entity";
import { ShoppingCartEntity } from "./shopping-cart.entity";
import { ReviewEntity } from "@entities/sql/typeorm/review.entity";
import { ICreateUser } from "@domain/user/user.model.interface";
import { AddressTypeEntity } from "@entities/sql/typeorm/address-type.entity";

@Entity("users")
export class UserEntity extends BaseEntity implements IUserEntity {
  constructor();
  constructor(createUser: ICreateUser);
  constructor(arg1?: ICreateUser | undefined) {
    super();
    if (arg1) {
      const [firstName, lastName] = arg1.fullName?.split(" ") ?? [];

      this.firstName = firstName;
      this.lastName = lastName;
      this.email = arg1.email;
      this.password = arg1.password;
      this.mobile = arg1.mobile;
      this.credit = arg1.credit ?? 0;
      this.dateOfBirth = arg1.dateOfBirth;

      this.roles = arg1.roleIds.map((id) => {
        const roleEntity = new RoleEntity();
        roleEntity.id = id;
        return roleEntity;
      });

      if (arg1.addresses && arg1.addresses.length > 0) {
        this.userAddressses = arg1.addresses.map(
          (address) => new UserAddressEntity(new AddressEntity(address), new AddressTypeEntity(address.addressTypeId))
        );
      }
    }
  }

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

  @ManyToMany(() => RoleEntity, (role) => role.users, { cascade: true })
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

  @OneToMany(() => UserAddressEntity, (userAddress) => userAddress.user, { cascade: true })
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
