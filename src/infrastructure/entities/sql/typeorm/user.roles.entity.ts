import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IUserRoles } from "@entities/sql/interfaces/user.roles.entity.interface";
import { TimestampEntity } from "@entities/sql/typeorm/base.entity";
import { RoleEntity } from "@entities/sql/typeorm/role.entity";
import { UserEntity } from "@entities/sql/typeorm/user.entity";

@Entity("user_roles")
export class UserRolesEntity extends TimestampEntity implements IUserRoles {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  roleId: number;

  @ManyToOne(() => UserEntity, (user) => user.roles)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: RoleEntity;
}
