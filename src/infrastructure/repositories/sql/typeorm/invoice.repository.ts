import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { InvoiceEntity } from "@entities/sql/typeorm/invoice.entity";
import { IInvoiceEntity } from "@entities/sql/interfaces/invoice.entity.interface";

@autoInjectable()
export class InvoiceRepository extends BaseRepository<InvoiceEntity, IInvoiceEntity> {
  constructor(@inject("InvoiceEntity") invoiceEntity: InvoiceEntity) {
    super(invoiceEntity);
  }
}
