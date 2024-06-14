import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderTables1718361328834 implements MigrationInterface {
  name = "CreateOrderTables1718361328834";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE courriers (
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        id int NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        contact_number varchar(255) NOT NULL,
        shipping_cost varchar(255) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB`
    );

    await queryRunner.query(
      `CREATE TABLE payment_cards (
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        id int NOT NULL AUTO_INCREMENT,
        card_type varchar(255) NOT NULL,
        last_four_digits varchar(255) NOT NULL,
        expiry_month int NOT NULL,
        expiry_year int NOT NULL,
        card_token varchar(255) NOT NULL,
        user_id int NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB`
    );

    await queryRunner.query(
      `CREATE TABLE order_statuses (
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        id int NOT NULL AUTO_INCREMENT,
        status varchar(255) NOT NULL,
        description varchar(255) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB`
    );

    await queryRunner.query(
      `CREATE TABLE orders (
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        id int NOT NULL AUTO_INCREMENT,
        order_date date NOT NULL,
        shipped_date date NOT NULL,
        total_due decimal(10,2) NOT NULL,
        user_id int NOT NULL,
        address_id int NOT NULL,
        courrier_id int NOT NULL,
        payment_id int NOT NULL,
        order_status_id int NOT NULL,
        payment_card_id int NULL,
        PRIMARY KEY (id),
        CONSTRAINT FK__orders__users__user_id 
          FOREIGN KEY (user_id) REFERENCES users(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK__orders__addresses__address_id 
          FOREIGN KEY (address_id) REFERENCES addresses(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK__orders__courriers__courrier_id 
          FOREIGN KEY (courrier_id) REFERENCES courriers(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK__orders__payment_cards__payment_card_id 
          FOREIGN KEY (payment_card_id) REFERENCES payment_cards(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK__orders__order_statuses__order_status_id 
          FOREIGN KEY (order_status_id) REFERENCES order_statuses(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION
      ) ENGINE=InnoDB`
    );

    await queryRunner.query(
      `CREATE TABLE invoices (
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        id int NOT NULL AUTO_INCREMENT,
        invoice_date date NOT NULL,
        total_due decimal(10,2) NOT NULL,
        vat_due decimal(10,2) NOT NULL,
        order_id int NOT NULL,
        UNIQUE INDEX REL__invoices__order_id (order_id),
        PRIMARY KEY (id),
        CONSTRAINT FK__invoices__orders__order_id 
          FOREIGN KEY (order_id) REFERENCES orders(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION
      ) ENGINE=InnoDB`
    );

    await queryRunner.query(
      `CREATE TABLE order_items (
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        id int NOT NULL AUTO_INCREMENT,
        order_id int NOT NULL,
        product_variant_id int NOT NULL,
        price decimal(10,2) NOT NULL,
        quantity int NOT NULL,
        PRIMARY KEY (id, order_id, product_variant_id),
        CONSTRAINT FK__order_items__orders__order_id 
          FOREIGN KEY (order_id) REFERENCES orders(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK__order_items__product_variants__product_variant_id 
          FOREIGN KEY (product_variant_id) REFERENCES product_variants(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION
      ) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys
    await queryRunner.query(`
      ALTER TABLE invoices 
      DROP FOREIGN KEY FK__invoices__orders__order_id
    `);
    await queryRunner.query(`
      ALTER TABLE order_items 
      DROP FOREIGN KEY FK__order_items__orders__order_id
    `);
    await queryRunner.query(`
      ALTER TABLE order_items 
      DROP FOREIGN KEY FK__order_items__product_variants__product_variant_id
    `);
    await queryRunner.query(`
      ALTER TABLE orders 
      DROP FOREIGN KEY FK__orders__users__user_id
    `);
    await queryRunner.query(`
      ALTER TABLE orders 
      DROP FOREIGN KEY FK__orders__addresses__address_id
    `);
    await queryRunner.query(`
      ALTER TABLE orders 
      DROP FOREIGN KEY FK__orders__courriers__courrier_id
    `);
    await queryRunner.query(`
      ALTER TABLE orders 
      DROP FOREIGN KEY FK__orders__payment_cards__payment_card_id
    `);
    await queryRunner.query(`
      ALTER TABLE orders 
      DROP FOREIGN KEY FK__orders__order_statuses__order_status_id
    `);

    // Drop indices
    await queryRunner.query(`
      DROP INDEX REL__invoices__order_id ON invoices
    `);

    // Drop tables
    await queryRunner.query(`DROP TABLE invoices`);
    await queryRunner.query(`DROP TABLE order_items`);
    await queryRunner.query(`DROP TABLE orders`);
    await queryRunner.query(`DROP TABLE order_statuses`);
    await queryRunner.query(`DROP TABLE payment_cards`);
    await queryRunner.query(`DROP TABLE courriers`);
  }
}
