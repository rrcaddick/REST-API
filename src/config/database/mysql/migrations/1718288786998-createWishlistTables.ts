import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWishlistTables1718288786998 implements MigrationInterface {
  name = "CreateWishlistTables1718288786998";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE wishlists (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        user_id int NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        CONSTRAINT FK__wishlists__users__user_id 
          FOREIGN KEY (user_id) REFERENCES users(id) 
          ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE wishlist_items (
        wishlist_id int NOT NULL,
        product_id int NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (wishlist_id, product_id),
        CONSTRAINT FK__wishlist_items__wishlists__wishlist_id 
          FOREIGN KEY (wishlist_id) REFERENCES wishlists(id) 
          ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT FK__wishlist_items__products__product_id 
          FOREIGN KEY (product_id) REFERENCES products(id) 
          ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE wishlist_items 
      DROP FOREIGN KEY FK__wishlist_items__products__product_id
    `);

    await queryRunner.query(`
      ALTER TABLE wishlist_items 
      DROP FOREIGN KEY FK__wishlist_items__wishlists__wishlist_id
    `);

    await queryRunner.query(`
      ALTER TABLE wishlists 
      DROP FOREIGN KEY FK__wishlists__users__user_id
    `);

    await queryRunner.query(`DROP TABLE wishlist_items`);
    await queryRunner.query(`DROP TABLE wishlists`);
  }
}
