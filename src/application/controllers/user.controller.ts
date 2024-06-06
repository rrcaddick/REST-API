import { IUserModel } from "@root/domain/user";
import { IUserService } from "@root/domain/user/user.service.interface";
// import { RoleEntity } from "@root/infrastructure/entities/sql/typeorm/role.entity";
import { UserEntity } from "@root/infrastructure/entities/sql/typeorm/user.entity";
// import { UserRoleEntity } from "@root/infrastructure/entities/sql/typeorm/user.roles.entity";
import { Controller, Get, Path, Route } from "tsoa";
import { injectable, inject } from "tsyringe";

// TODO: Inject logger instance and log errors
@injectable()
@Route("users")
export class UserController extends Controller {
  constructor(
    @inject("UserService") private _userService?: IUserService,
    @inject("DataSource") private _dataSource?: any
  ) {
    super();
  }
  private get userService(): IUserService {
    if (!this._userService) throw Error("No user service defined");
    return this._userService;
  }

  private get dataSource() {
    if (!this._dataSource) throw Error("No user service defined");
    return this._dataSource;
  }

  @Get("")
  public async getUsers(): Promise<UserEntity> {
    const userRepo = this.dataSource.getClient().getRepository(UserEntity);

    // const user = userRepo.create({
    //   firstName: "Ash",
    //   lastName: "Caddick",
    //   email: "ash7fire@gmail.com",
    //   password: "Whatever123",
    //   dateOfBirth: new Date("1990-03-01"),
    //   mobile: "0763635909",
    //   credit: 20,
    // });

    // await userRepo.save(user);

    // const roleRepo = this.dataSource.getClient().getRepository(RoleEntity);

    // const role = roleRepo.create({
    //   roleName: "CUSTOMER",
    // });

    // await roleRepo.save(role);

    // const userRoleRepo = this.dataSource.getClient().getRepository(UserRoleEntity);

    // const userRole = userRoleRepo.create({
    //   userId: 1,
    //   roleId: 1,
    // });

    // await userRoleRepo.save(userRole);

    return await userRepo.find({ relations: { roles: true, userRoles: true } });
  }

  @Get("{userId}")
  public async getUser(@Path() userId: string): Promise<IUserModel> {
    return await this.userService.get(userId);
  }
}
