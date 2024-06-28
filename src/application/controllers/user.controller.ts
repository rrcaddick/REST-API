import { IUserModel } from "@root/domain/user/user.model.interface";
import { UserService } from "@root/domain/user/user.service";
import { UserEntity } from "@root/infrastructure/entities/sql/typeorm/user.entity";
import { Controller, Get, Path, Route } from "tsoa";
import { injectable, inject } from "tsyringe";

// TODO: Inject logger instance and log errors
@injectable()
@Route("users")
export class UserController extends Controller {
  constructor(@inject("UserService") private userService: UserService) {
    super();
  }

  // @Get("")
  // public async getUsers(): Promise<UserEntity> {
  //   return await this.userService.getAllUsers();
  // }

  @Get("{userId}")
  public async getUser(@Path() userId: number): Promise<IUserModel> {
    return await this.userService.getUser(userId);
  }
}
