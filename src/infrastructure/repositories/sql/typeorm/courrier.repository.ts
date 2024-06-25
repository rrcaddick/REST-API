import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { CourrierEntity } from "@entities/sql/typeorm/courrier.entity";
import { ICourrierEntity } from "@entities/sql/interfaces/courrier.entity.interface";

@autoInjectable()
export class CourrierRepository extends BaseRepository<CourrierEntity, ICourrierEntity> {
  constructor(@inject("CourrierEntity") courrierEntity: CourrierEntity) {
    super(courrierEntity);
  }
}
