import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
// import { IUserRoleEntity } from "@entities/sql/interfaces/user.roles.entity.interface";
import { TimestampEntity } from "@entities/sql/typeorm/base.entity";
import { RoleEntity } from "@entities/sql/typeorm/role.entity";
import { UserEntity } from "@entities/sql/typeorm/user.entity";

@Entity("user_roles")
export class UserRoleEntity extends TimestampEntity {
  @PrimaryColumn({ name: "user_id" })
  @ManyToOne(() => RoleEntity, (user) => user.users)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  users: number;

  @PrimaryColumn({ name: "role_id" })
  @ManyToOne(() => UserEntity, (role) => role.roles)
  @JoinColumn({ name: "role_id", referencedColumnName: "id" })
  roles: number;
}
