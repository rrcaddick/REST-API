import { Repository, DataSource } from "typeorm";
import { inject, autoInjectable } from "tsyringe";
import { IDataSource } from "@root/config/db.config.interface";

@autoInjectable()
export class BaseRepository<T extends Object> {
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
}
