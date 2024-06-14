import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { IInvoiceEntity } from "../interfaces/invoice.entity.interface";
import { BaseEntity } from "./base.entity";
import { OrderEntity } from "./order.entity";

@Entity("invoices")
export class InvoiceEntity extends BaseEntity implements IInvoiceEntity {
  @Column({ name: "invoice_date", type: "date" })
  invoiceDate: Date;

  @Column({ name: "total_due", type: "decimal", precision: 10, scale: 2 })
  totalDue: number;

  @Column({ name: "vat_due", type: "decimal", precision: 10, scale: 2 })
  vatDue: number;

  @Column({ name: "order_id" })
  orderId: number;

  @OneToOne(() => OrderEntity, (order) => order.id)
  @JoinColumn({
    name: "order_id",
    referencedColumnName: "id",
  })
  order: OrderEntity;
}
