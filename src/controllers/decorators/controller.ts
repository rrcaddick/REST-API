import { App } from "../../App";
import { MetadataKeys } from "./types/MetadataKeys";
import { RouteInfo } from "./types/RouteInfo";

const parsePath = (routePrefix: string | undefined, path: string): string =>
  !routePrefix || routePrefix === "/" ? path : `${routePrefix}${path}`;

export function controller(routePrefix?: string): ClassDecorator {
  return function (target: Function) {
    const router = App.getRouter();

    for (let propName of Object.getOwnPropertyNames(target.prototype)) {
      // Retrieve route information
      const { path, method }: RouteInfo = Reflect.getMetadata(MetadataKeys.RouteInfo, target.prototype, propName) ?? {};

      // Ensure property has route handler metadata
      if (path && method) {
        const routeHandler = target.prototype[propName];
        router[method](parsePath(routePrefix, path), routeHandler);
      }
    }
  };
}
