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
        CONSTRAINT FK__reviews__users__user_id 
          FOREIGN KEY (user_id) REFERENCES users(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK__reviews__products__product_id 
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
        refund_method enum ('Payment Card', 'Customer Credit') NULL,
        total decimal(10,2) NOT NULL DEFAULT '0.00',
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX REL__returns__order_id (order_id),
        PRIMARY KEY (id),
        CONSTRAINT FK__returns__orders__order_id 
          FOREIGN KEY (order_id) REFERENCES orders(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION
      ) ENGINE=InnoDB`
    );

    await queryRunner.query(
      `CREATE TABLE return_items (
        return_id int NOT NULL,
        order_item_id int NOT NULL,
        quantity int NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (return_id, order_item_id),
        CONSTRAINT FK__return_items__returns__return_id 
          FOREIGN KEY (return_id) REFERENCES returns(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK__return_items__order_items__order_item_id 
          FOREIGN KEY (order_item_id) REFERENCES order_items(id) 
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
        CONSTRAINT FK__refunds__returns__return_id 
          FOREIGN KEY (return_id) REFERENCES returns(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK__refunds__payment_cards__payment_card_id 
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
        CONSTRAINT FK__shopping_carts__users__user_id 
          FOREIGN KEY (user_id) REFERENCES users(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK__shopping_carts__products__product_id 
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
        CONSTRAINT FK__sales__products__product_id 
          FOREIGN KEY (product_id) REFERENCES products(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK__sales__users__user_id 
          FOREIGN KEY (user_id) REFERENCES users(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION
      ) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE sales 
      DROP FOREIGN KEY FK__sales__users__user_id
    `);
    await queryRunner.query(`
      ALTER TABLE sales 
      DROP FOREIGN KEY FK__sales__products__product_id
    `);
    await queryRunner.query(`
      ALTER TABLE shopping_carts 
      DROP FOREIGN KEY FK__shopping_carts__users__user_id
    `);
    await queryRunner.query(`
      ALTER TABLE shopping_carts 
      DROP FOREIGN KEY FK__shopping_carts__products__product_id
    `);
    await queryRunner.query(`
      ALTER TABLE refunds 
      DROP FOREIGN KEY FK__refunds__returns__return_id
    `);
    await queryRunner.query(`
      ALTER TABLE refunds 
      DROP FOREIGN KEY FK__refunds__payment_cards__payment_card_id
    `);
    await queryRunner.query(`
      ALTER TABLE returns 
      DROP FOREIGN KEY FK__returns__orders__order_id
    `);
    await queryRunner.query(`
      ALTER TABLE return_items 
      DROP FOREIGN KEY FK__return_items__returns__return_id
    `);
    await queryRunner.query(`
      ALTER TABLE return_items 
      DROP FOREIGN KEY FK__return_items__products__product_id
    `);
    await queryRunner.query(`
      ALTER TABLE reviews 
      DROP FOREIGN KEY FK__reviews__users__user_id
    `);
    await queryRunner.query(`
      ALTER TABLE reviews 
      DROP FOREIGN KEY FK__reviews__products__product_id
    `);

    await queryRunner.query(`
      DROP INDEX REL__returns__order_id ON returns
    `);

    await queryRunner.query(`DROP TABLE sales`);
    await queryRunner.query(`DROP TABLE shopping_carts`);
    await queryRunner.query(`DROP TABLE refunds`);
    await queryRunner.query(`DROP TABLE returns`);
    await queryRunner.query(`DROP TABLE return_items`);
    await queryRunner.query(`DROP TABLE reviews`);
  }
}
