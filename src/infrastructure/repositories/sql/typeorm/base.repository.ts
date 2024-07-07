import {
  Repository,
  DataSource,
  InsertResult,
  SelectQueryBuilder,
  FindOptionsWhere,
  FindManyOptions,
  QueryRunner,
} from "typeorm";
import { inject, autoInjectable } from "tsyringe";
import { IDataSource } from "@root/config/db.config.interface";

type keyDef = {
  keyName: string;
  keyValue: number;
};

@autoInjectable()
export class BaseRepository<T extends Object, K> {
  protected repo: Repository<T>;
  protected client: DataSource;
  protected queryRunner: QueryRunner;

  constructor(private entity: T, @inject("DataSource") protected dataSource?: IDataSource) {
    if (!this.dataSource) {
      throw new Error("No Data Source injected!");
    }

    this.client = this.dataSource.getClient() as DataSource;

    this.queryRunner = this.client.createQueryRunner();

    const entityTarget = {
      type: this.entity,
      name: this.entity.constructor.name,
    };

    this.repo = this.client.getRepository(entityTarget);
  }

  // TODO: Fix type issue with data. For now it works
  async insertMany(data: Omit<K, "id">[]): Promise<InsertResult> {
    return await this.repo
      .createQueryBuilder()
      .insert()
      .values(data as any)
      .execute();
  }

  async insert(data: Omit<K, "id">): Promise<InsertResult> {
    return await this.repo
      .createQueryBuilder()
      .insert()
      .values(data as any)
      .execute();
  }

  async create(data: Omit<T, "id">): Promise<T> {
    return await this.repo.save(data as any, {});
  }

  async deletAll(): Promise<void> {
    await this.repo.createQueryBuilder().delete().execute();
  }

  // Bug with Typeorm typeings for generic base classes. Temp fix casting to unkown first
  async findOneWithRelations(id: number, ralations: string[]): Promise<T | null> {
    return await this.repo.findOne({ where: { id } as unknown as FindOptionsWhere<T>, relations: ralations });
  }

  async findWithRelations(ralations: string[]): Promise<T[]> {
    return await this.repo.find({ relations: ralations });
  }

  async findOneById(id: number | number[]): Promise<T | null> {
    return await this.repo.createQueryBuilder().where("id = :id", { id }).getOne();
  }

  async findById(id: number | number[]): Promise<T[] | null> {
    return await this.repo.createQueryBuilder().where("id = :id", { id }).getMany();
  }

  async findByKey(primaryKey: keyDef): Promise<T | null>;
  async findByKey(compositeKeys: keyDef[]): Promise<T | null>;
  async findByKey(arg1: keyDef | keyDef[]): Promise<T | null> {
    // Multiple composite keys
    if (Array.isArray(arg1)) {
      const whereClause = arg1.map((key) => `${key.keyName} = :${key.keyName}`).join(" AND ");
      const parameters = arg1.reduce((params, key) => ({ ...params, [key.keyName]: key.keyValue }), {});
      return await this.repo.createQueryBuilder().where(whereClause, parameters).getOne();
    }

    // Single primary key
    const { keyName, keyValue } = arg1;
    return await this.repo.createQueryBuilder().where(`${keyName} = :${keyName}`, { keyValue }).getOne();
  }
}
