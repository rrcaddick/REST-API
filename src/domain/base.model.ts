import { IBaseModel } from "./base.model.interface";

export abstract class BaseModel<T> implements IBaseModel<T> {
  protected abstract model: T;

  update<K extends keyof T>(prop: K, value: T[K]): void {
    this.model[prop] = value;
  }
}
