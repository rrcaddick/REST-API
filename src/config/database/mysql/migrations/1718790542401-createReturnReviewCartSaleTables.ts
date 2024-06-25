import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReturnReviewCartSaleTables1718790542401 implements MigrationInterface {
  name = "CreateReturnReviewCartSaleTables1718790542401";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE reviews (
        id int NOT NULL AUTO_INCREMENT,
        user_id int NOT NULL,
        product_id int NOT NULL,
        rating int NOT NULL,
        comment text NULL,
        review_date datetime NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        CONSTRAINT FK_reviews_users_user_id 
          FOREIGN KEY (user_id) REFERENCES users(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK_reviews_products_product_id 
          FOREIGN KEY (product_id) REFERENCES products(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION
      ) ENGINE=InnoDB`
    );

    await queryRunner.query(
      `CREATE TABLE returns (
        id int NOT NULL AUTO_INCREMENT,
        order_id int NOT NULL,
        return_date datetime NOT NULL,
        status enum ('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
        reason text NOT NULL,
        refund_method enum ('Payment Card', 'Customer Credit') NOT NULL,
        total decimal(10,2) NOT NULL DEFAULT '0.00',
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX REL_returns_order_id (order_id),
        PRIMARY KEY (id),
        CONSTRAINT FK_returns_orders_order_id 
          FOREIGN KEY (order_id) REFERENCES orders(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION
      ) ENGINE=InnoDB`
    );

    await queryRunner.query(
      `CREATE TABLE return_items (
        return_id int NOT NULL,
        product_id int NOT NULL,
        quantity int NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (return_id, product_id),
        CONSTRAINT FK_return_items_returns_return_id 
          FOREIGN KEY (return_id) REFERENCES returns(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK_return_items_products_product_id 
          FOREIGN KEY (product_id) REFERENCES products(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION
      ) ENGINE=InnoDB`
    );

    await queryRunner.query(
      `CREATE TABLE refunds (
        id int NOT NULL AUTO_INCREMENT,
        return_id int NOT NULL,
        payment_card_id int NOT NULL,
        date datetime NOT NULL,
        amount decimal(10,2) NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        CONSTRAINT FK_refunds_returns_return_id 
          FOREIGN KEY (return_id) REFERENCES returns(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK_refunds_payment_cards_payment_card_id 
          FOREIGN KEY (payment_card_id) REFERENCES payment_cards(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION
      ) ENGINE=InnoDB`
    );

    await queryRunner.query(
      `CREATE TABLE shopping_carts (
        id int NOT NULL AUTO_INCREMENT,
        user_id int NOT NULL,
        product_id int NOT NULL,
        quantity int NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        CONSTRAINT FK_shopping_carts_users_user_id 
          FOREIGN KEY (user_id) REFERENCES users(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK_shopping_carts_products_product_id 
          FOREIGN KEY (product_id) REFERENCES products(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION
      ) ENGINE=InnoDB`
    );

    await queryRunner.query(
      `CREATE TABLE sales (
        id int NOT NULL AUTO_INCREMENT,
        user_id int NOT NULL,
        product_id int NOT NULL,
        date datetime NOT NULL,
        quantity int NOT NULL,
        price decimal(10,2) NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        CONSTRAINT FK_sales_products_product_id 
          FOREIGN KEY (product_id) REFERENCES products(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK_sales_users_user_id 
          FOREIGN KEY (user_id) REFERENCES users(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION
      ) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE sales 
      DROP FOREIGN KEY FK_sales_users_user_id
    `);
    await queryRunner.query(`
      ALTER TABLE sales 
      DROP FOREIGN KEY FK_sales_products_product_id
    `);
    await queryRunner.query(`
      ALTER TABLE shopping_carts 
      DROP FOREIGN KEY FK_shopping_carts_users_user_id
    `);
    await queryRunner.query(`
      ALTER TABLE shopping_carts 
      DROP FOREIGN KEY FK_shopping_carts_products_product_id
    `);
    await queryRunner.query(`
      ALTER TABLE refunds 
      DROP FOREIGN KEY FK_refunds_returns_return_id
    `);
    await queryRunner.query(`
      ALTER TABLE refunds 
      DROP FOREIGN KEY FK_refunds_payment_cards_payment_card_id
    `);
    await queryRunner.query(`
      ALTER TABLE returns 
      DROP FOREIGN KEY FK_returns_orders_order_id
    `);
    await queryRunner.query(`
      ALTER TABLE return_items 
      DROP FOREIGN KEY FK_return_items_returns_return_id
    `);
    await queryRunner.query(`
      ALTER TABLE return_items 
      DROP FOREIGN KEY FK_return_items_products_product_id
    `);
    await queryRunner.query(`
      ALTER TABLE reviews 
      DROP FOREIGN KEY FK_reviews_users_user_id
    `);
    await queryRunner.query(`
      ALTER TABLE reviews 
      DROP FOREIGN KEY FK_reviews_products_product_id
    `);

    await queryRunner.query(`
      DROP INDEX REL_returns_order_id ON returns
    `);

    await queryRunner.query(`DROP TABLE sales`);
    await queryRunner.query(`DROP TABLE shopping_carts`);
    await queryRunner.query(`DROP TABLE refunds`);
    await queryRunner.query(`DROP TABLE returns`);
    await queryRunner.query(`DROP TABLE return_items`);
    await queryRunner.query(`DROP TABLE reviews`);
  }
}
