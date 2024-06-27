import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAddressTables1718204893205 implements MigrationInterface {
  name = "CreateUserAddressTables1718204893205";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE address_types (
        id int NOT NULL AUTO_INCREMENT,
        address_type varchar(255) NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE addresses (
        id int NOT NULL AUTO_INCREMENT,
        building_company_name varchar(255) NULL,
        street varchar(255) NOT NULL,
        city varchar(255) NOT NULL,
        state varchar(255) NOT NULL,
        post_code int NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE user_addresses (
        user_id int NOT NULL,
        address_id int NOT NULL,
        address_type_id int NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (user_id, address_id, address_type_id),
      CONSTRAINT FK__user_addresses__addresses__address_id
        FOREIGN KEY (address_id) REFERENCES addresses(id)
        ON DELETE NO ACTION 
        ON UPDATE NO ACTION,
      CONSTRAINT FK__user_addresses__address_types__address_type_id
        FOREIGN KEY (address_type_id) REFERENCES address_types(id) 
        ON DELETE NO ACTION 
        ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE INDEX IDX__user_addresses__user_id 
      ON user_addresses (user_id)
    `);

    await queryRunner.query(`
      CREATE INDEX IDX__user_addresses__address_id 
      ON user_addresses (address_id)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE user_addresses 
      DROP FOREIGN KEY FK__user_addresses__address_types__address_type_id
    `);

    await queryRunner.query(`
      ALTER TABLE user_addresses 
      DROP FOREIGN KEY FK__user_addresses__addresses__address_id
    `);

    await queryRunner.query(`
      ALTER TABLE user_addresses 
      DROP FOREIGN KEY FK__user_addresses__users__user_id
    `);

    await queryRunner.query(`
      DROP INDEX IDX__user_addresses__address_id 
      ON user_addresses
    `);

    await queryRunner.query(`
      DROP INDEX IDX__user_addresses__user_id 
      ON user_addresses
    `);

    await queryRunner.query(`DROP TABLE user_addresses`);
    await queryRunner.query(`DROP TABLE addresses`);
    await queryRunner.query(`DROP TABLE address_types`);
  }
}
