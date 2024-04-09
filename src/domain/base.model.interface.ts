export interface IBaseModel<T> {
  update(prop: keyof T, value: T[keyof T]): void;
}
