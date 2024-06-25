import { Repository, DataSource, InsertResult } from "typeorm";
import { inject, autoInjectable } from "tsyringe";
import { IDataSource } from "@root/config/db.config.interface";

@autoInjectable()
export class BaseRepository<T extends Object, K> {
  protected repo: Repository<T>;

  constructor(private entity: T, @inject("DataSource") private dataSource?: IDataSource) {
    if (!this.dataSource) {
      throw new Error("No Data Source injected!");
    }

    const client = this.dataSource.getClient() as DataSource;

    const entityTarget = {
      type: this.entity,
      name: this.entity.constructor.name,
    };

    this.repo = client.getRepository(entityTarget);
  }

  // TODO: Fix type issue with data. For now it works
  async insertMany(data: Omit<K, "id">[]): Promise<InsertResult> {
    return await this.repo
      .createQueryBuilder()
      .insert()
      .values(data as any)
      .execute();
  }

  async insert(data: Omit<K, "id">): Promise<T> {
    return await this.repo.save(data as any);
  }

  async deletAll(): Promise<void> {
    await this.repo.createQueryBuilder().delete().execute();
  }
}
