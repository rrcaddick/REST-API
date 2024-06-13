import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserRolesTables1718204167628 implements MigrationInterface {
  name = "CreateUserRolesTables1718204167628";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE roles (
        id int NOT NULL AUTO_INCREMENT,
        role_name varchar(255) NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE users (
        id int NOT NULL AUTO_INCREMENT,
        first_name varchar(255) NOT NULL,
        last_name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        date_of_birth date NOT NULL,
        mobile varchar(255) NOT NULL,
        credit decimal(10,2) NOT NULL DEFAULT 0.00,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX IDX__users__email (email),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE user_roles (
        user_id int NOT NULL,
        role_id int NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (user_id, role_id),
        CONSTRAINT FK__user_roles__users__user_id 
          FOREIGN KEY (user_id) REFERENCES users(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION,
        CONSTRAINT FK__user_roles__roles__role_id 
          FOREIGN KEY (role_id) REFERENCES roles(id) 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE INDEX IDX__user_roles__user_id 
      ON user_roles (user_id)
    `);

    await queryRunner.query(`
      CREATE INDEX IDX__user_roles__role_id 
      ON user_roles (role_id)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE user_roles 
      DROP FOREIGN KEY FK__user_roles__roles__role_id
    `);

    await queryRunner.query(`
      ALTER TABLE user_roles 
      DROP FOREIGN KEY FK__user_roles__users__user_id
    `);

    await queryRunner.query(`
      DROP INDEX IDX__user_roles__role_id 
      ON user_roles
    `);

    await queryRunner.query(`
      DROP INDEX IDX__user_roles__user_id 
      ON user_roles
    `);

    await queryRunner.query(`
      DROP INDEX IDX__users__email 
      ON users
    `);

    await queryRunner.query(`DROP TABLE user_roles`);
    await queryRunner.query(`DROP TABLE users`);
    await queryRunner.query(`DROP TABLE roles`);
  }
}
