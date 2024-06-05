import { Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { IBaseEntity, ITimestampEntity } from "@entities/sql/interfaces/base.entity.interface";

@Entity()
export abstract class TimestampEntity implements ITimestampEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export abstract class BaseEntity extends TimestampEntity implements IBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
