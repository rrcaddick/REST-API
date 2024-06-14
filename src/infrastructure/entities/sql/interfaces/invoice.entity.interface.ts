import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IInvoiceEntity extends IBaseEntity {
  orderId: number;
  invoiceDate: Date;
  totalDue: number;
  vatDue: number;
}
