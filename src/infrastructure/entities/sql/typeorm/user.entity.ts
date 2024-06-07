import { Entity, Column, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { IUserEntity } from "@entities/sql/interfaces/user.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { UserRoleEntity } from "@entities/sql/typeorm/user.roles.entity";
import { RoleEntity } from "./role.entity";
import { AddressEntity } from "./address.entity";
import { UserAddressEntity } from "./user.address.entity";

@Entity("users")
export class UserEntity extends BaseEntity implements IUserEntity {
  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: "date_of_birth", type: "date" })
  dateOfBirth: Date;

  @Column()
  mobile: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  credit: number;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
  @JoinColumn({ referencedColumnName: "user_id" })
  userRoles: UserRoleEntity[];

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({
    name: "user_roles",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_user_roles_user_id",
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_user_roles_role_id",
    },
  })
  roles: RoleEntity[];

  @OneToMany(() => UserAddressEntity, (userAddress) => userAddress.user)
  @JoinColumn({ referencedColumnName: "user_id" })
  userAddressses: UserAddressEntity[];

  @ManyToMany(() => AddressEntity, (address) => address.users)
  @JoinTable({
    name: "user_addresses",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_user_addresses_user_id",
    },
    inverseJoinColumn: {
      name: "address_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_user_addresses_address_id",
    },
  })
  addresses: AddressEntity[];
}
