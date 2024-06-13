import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTables1718267067757 implements MigrationInterface {
  name = "CreateProductTables1718267067757";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE product_category (
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        id int NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE products (
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        id int NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        description text NOT NULL,
        price decimal(10,2) NOT NULL,
        weight int NOT NULL,
        color varchar(255) NOT NULL,
        length int NOT NULL,
        width int NOT NULL,
        depth int NOT NULL,
        category_id int NOT NULL,
        brand varchar(255) NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT fk__product__product_category__category_id 
          FOREIGN KEY (category_id) REFERENCES product_category(id) 
          ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE inventory (
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        id int NOT NULL AUTO_INCREMENT,
        product_variant_id int NOT NULL,
        quantity int NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT FK__inventory__product_variants__product_variant_id 
          FOREIGN KEY (product_variant_id) REFERENCES product_variants(id) 
          ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE product_variants (
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        id int NOT NULL AUTO_INCREMENT,
        product_id int NOT NULL,
        variant_name varchar(255) NOT NULL,
        variant_value varchar(255) NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT FK__product_variants__products__product_id 
          FOREIGN KEY (product_id) REFERENCES products(id) 
          ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE product_price_history (
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        id int NOT NULL AUTO_INCREMENT,
        product_id int NOT NULL,
        price decimal(10,2) NOT NULL,
        start_date datetime NOT NULL,
        end_date datetime NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT FK__product_price_history__products__product_id 
          FOREIGN KEY (product_id) REFERENCES products(id) 
          ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE promotions (
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        id int NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        description text NOT NULL,
        discount decimal(10,2) NOT NULL,
        start_date datetime NOT NULL,
        end_date datetime NOT NULL,
        product_id int NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT FK__promotions__products__product_id 
          FOREIGN KEY (product_id) REFERENCES products(id) 
          ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE product_images (
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        id int NOT NULL AUTO_INCREMENT,
        product_id int NOT NULL,
        image_url varchar(255) NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT FK__product_images__products__product_id 
          FOREIGN KEY (product_id) REFERENCES products(id) 
          ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE product_variants 
      DROP FOREIGN KEY FK__product_variants__products__product_id
    `);

    await queryRunner.query(`
      ALTER TABLE inventory 
      DROP FOREIGN KEY FK__inventory__product_variants__product_variant_id
    `);

    await queryRunner.query(`
      ALTER TABLE products 
      DROP FOREIGN KEY fk__product__product_category__category_id
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

    await queryRunner.query("DROP TABLE product_variants");
    await queryRunner.query("DROP TABLE inventory");
    await queryRunner.query("DROP TABLE products");
    await queryRunner.query("DROP TABLE product_category");
    await queryRunner.query(`DROP TABLE product_images`);
    await queryRunner.query(`DROP TABLE promotions`);
    await queryRunner.query(`DROP TABLE product_price_history`);
  }
}
