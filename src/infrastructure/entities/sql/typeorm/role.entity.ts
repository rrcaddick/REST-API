import { Column, Entity, OneToMany } from "typeorm";
import { IRoleEntity } from "@entities/sql/interfaces/role.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { UserRoleEntity } from "@entities/sql/typeorm/user.roles.entity";

@Entity("roles")
export class RoleEntity extends BaseEntity implements IRoleEntity {
  @Column({ name: "role_name" })
  roleName: string;

  @OneToMany(() => UserRoleEntity, (userRoles) => userRoles.users)
  users: UserRoleEntity[];
}
