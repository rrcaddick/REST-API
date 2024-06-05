import { Column, Entity, OneToMany } from "typeorm";
import { IRoles } from "@entities/sql/interfaces/role.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { UserRolesEntity } from "@entities/sql/typeorm/user.roles.entity";

@Entity("roles")
export class RoleEntity extends BaseEntity implements IRoles {
  @Column({ name: "role_name" })
  roleName: string;

  @OneToMany(() => UserRolesEntity, (userRoles) => userRoles.role)
  users: UserRolesEntity[];
}
