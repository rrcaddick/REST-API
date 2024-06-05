import { Entity, Column, OneToMany } from "typeorm";
import { IUserEntity } from "@entities/sql/interfaces/user.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { UserRolesEntity } from "@entities/sql/typeorm/user.roles.entity";

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

  @OneToMany(() => UserRolesEntity, (userRole) => userRole.user)
  roles: UserRolesEntity[];
}
