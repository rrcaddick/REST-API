import { RequestHandler } from "express";
import { TypedMethodDecorator } from "./types/TypedMethodDecorator";
import { HttpMethods } from "./types/HttpMethods";
import { MetadataKeys } from "./types/MetadataKeys";
import { RouteInfo } from "./types/RouteInfo";

type RouteDecorator = (path: string) => TypedMethodDecorator<RequestHandler>;

function routeBinder(method: HttpMethods): RouteDecorator {
  return (path: string): TypedMethodDecorator<RequestHandler> => {
    return (target: Object, key: string | symbol, desc: TypedPropertyDescriptor<RequestHandler>): void => {
      const routeInfo: RouteInfo = { path, method };
      Reflect.defineMetadata(MetadataKeys.RouteInfo, routeInfo, target, key);
    };
  };
}

export const get = routeBinder(HttpMethods.Get);
export const post = routeBinder(HttpMethods.Post);
export const put = routeBinder(HttpMethods.Put);
export const del = routeBinder(HttpMethods.Del);
export const patch = routeBinder(HttpMethods.Patch);
