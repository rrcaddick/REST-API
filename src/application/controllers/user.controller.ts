import { IUserModel } from "@root/domain/user";
import { IUserService } from "@root/domain/user/user.service.interface";
import { Controller, Get, Path, Route } from "tsoa";
import { injectable, inject } from "tsyringe";

// TODO: Inject logger instance and log errors
@injectable()
@Route("users")
export class UserController extends Controller {
  constructor(@inject("UserService") private _userService?: IUserService) {
    super();
  }
  private get userService(): IUserService {
    if (!this._userService) throw Error("No user service defined");
    return this._userService;
  }

  @Get("{userId}")
  public async getUser(@Path() userId: string): Promise<IUserModel> {
    return await this.userService.get(userId);
  }
}
