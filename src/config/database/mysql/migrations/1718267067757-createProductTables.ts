import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTables1718267067757 implements MigrationInterface {
  name = "CreateProductTables1718267067757";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE product_categories (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE products (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        description text NOT NULL,
        price decimal(10,2) NOT NULL,
        weight int NOT NULL,
        length int NOT NULL,
        width int NOT NULL,
        height int NOT NULL,
        brand varchar(255) NOT NULL,
        category_id int NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        CONSTRAINT fk__product__product_categories__category_id 
          FOREIGN KEY (category_id) REFERENCES product_categories(id) 
          ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE inventory (
        id int NOT NULL AUTO_INCREMENT,
        product_id int NOT NULL,
        quantity int NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        CONSTRAINT FK__inventory__products__product_id 
          FOREIGN KEY (product_id) REFERENCES products(id) 
          ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE product_price_history (
        id int NOT NULL AUTO_INCREMENT,
        product_id int NOT NULL,
        price decimal(10,2) NOT NULL,
        start_date datetime NOT NULL,
        end_date datetime NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        CONSTRAINT FK__product_price_history__products__product_id 
          FOREIGN KEY (product_id) REFERENCES products(id) 
          ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE promotions (
        id int NOT NULL AUTO_INCREMENT,
        product_id int NOT NULL,
        name varchar(255) NOT NULL,
        discount decimal(10,2) NOT NULL,
        start_date datetime NOT NULL,
        end_date datetime NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        CONSTRAINT FK__promotions__products__product_id 
          FOREIGN KEY (product_id) REFERENCES products(id) 
          ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE product_images (
        id int NOT NULL AUTO_INCREMENT,
        product_id int NOT NULL,
        image_url varchar(255) NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        CONSTRAINT FK__product_images__products__product_id 
          FOREIGN KEY (product_id) REFERENCES products(id) 
          ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE products 
      DROP FOREIGN KEY FK__products__products__product_id
    `);

    await queryRunner.query(`
      ALTER TABLE inventory 
      DROP FOREIGN KEY FK__inventory__products__product_id
    `);

    await queryRunner.query(`
      ALTER TABLE products 
      DROP FOREIGN KEY fk__product__product_categories__category_id
    `);

    await queryRunner.query(`
      ALTER TABLE promotions 
      DROP FOREIGN KEY FK__promotions__products__product_id
    `);

    await queryRunner.query(`
      ALTER TABLE product_price_history 
      DROP FOREIGN KEY FK__product_price_history__products__product_id
    `);

    await queryRunner.query(`
      ALTER TABLE product_images 
      DROP FOREIGN KEY FK__product_images__products__product_id
    `);

    await queryRunner.query("DROP TABLE products");
    await queryRunner.query("DROP TABLE inventory");
    await queryRunner.query("DROP TABLE products");
    await queryRunner.query("DROP TABLE product_categories");
    await queryRunner.query(`DROP TABLE product_images`);
    await queryRunner.query(`DROP TABLE promotions`);
    await queryRunner.query(`DROP TABLE product_price_history`);
  }
}
