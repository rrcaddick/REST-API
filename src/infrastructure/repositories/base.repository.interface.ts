import { Identity } from "@root/common/types/indentity.type";

export interface IBaseRepository<T> {
  create(data: Omit<T, "id">): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<T>;
  getById(id: Identity): Promise<T>;
}
