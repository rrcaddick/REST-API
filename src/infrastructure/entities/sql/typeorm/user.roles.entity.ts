import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IUserRoleEntity } from "@entities/sql/interfaces/user.roles.entity.interface";
import { TimestampEntity } from "@entities/sql/typeorm/base.entity";
import { RoleEntity } from "@entities/sql/typeorm/role.entity";
import { UserEntity } from "@entities/sql/typeorm/user.entity";

@Entity("user_roles")
export class UserRoleEntity extends TimestampEntity implements IUserRoleEntity {
  @PrimaryColumn({ name: "user_id" })
  public userId: number;

  @PrimaryColumn({ name: "role_id" })
  public roleId: number;

  @ManyToOne(() => UserEntity, (user) => user.roles)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  public user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({
    name: "role_id",
    referencedColumnName: "id",
  })
  public role: RoleEntity;
}
