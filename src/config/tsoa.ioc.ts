import { IocContainer } from "@tsoa/runtime";
import { container } from "tsyringe";

const iocContainer: IocContainer = {
  get: <T>(controller: { prototype: T }): T => {
    return container.resolve<T>(controller as never);
  },
};

export { iocContainer };
