import { IUserModel } from "@root/domain/user/user.model.interface";
import { UserService } from "@root/domain/user/user.service";
import { UserEntity } from "@root/infrastructure/entities/sql/typeorm/user.entity";
import { Controller, Get, Path, Route } from "tsoa";
import { injectable, inject } from "tsyringe";
import { IUserModel } from "@domain/user/user.model.interface";
import { UserService } from "@domain/user/user.service";
import { LoggerService } from "@logger/logger.service";

// TODO: log errors
@injectable()
@Route("users")
export class UserController extends Controller {
  constructor(
    @inject("Logger") private loggerService: LoggerService,
    @inject("UserService") private userService: UserService
  ) {
    super();
  }

  @Get("")
  public async getUsers(): Promise<IUserModel[]> {
    return await this.userService.getUsers();
  }

  @Post("")
  public async createUsers(): Promise<IUserModel[]> {
    return await this.userService.getUsers();
  }

  @Get("{userId}")
  public async getUser(@Path() userId: number): Promise<IUserModel> {
    return await this.userService.getUser(userId);
  }
}
