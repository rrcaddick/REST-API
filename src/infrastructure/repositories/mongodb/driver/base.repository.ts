import { IBaseRepository } from "@root/infrastructure/repositories/base.repository.interface";
import { Identity } from "@root/common/types/indentity.type";

export type ErrorConfig = { update: string; delete: string };

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected abstract entity: any;
  private notFoundError: string;

  constructor(private entityName: string) {
    this.notFoundError = `${this.entityName} not found`;
  }

  async create(data: Omit<T, "id">): Promise<T> {
    const entity = await this.entity.create(data);
    return entity.toObject();
  }

  async getById(id: Identity): Promise<T> {
    return await this.entity.findById(id);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const entity = await this.entity.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    if (!entity) throw new Error(this.notFoundError);

    return entity.toObject();
  }

  async delete(id: string): Promise<T> {
    const entity = await this.entity.findByIdAndDelete(id);

    if (!entity) throw new Error(this.notFoundError);

    return entity.toObject();
  }
}
