export interface IBaseEntity extends ITimestampEntity {
  id: number;
}

export interface ITimestampEntity {
  createdAt: Date;
  updatedAt: Date;
}
