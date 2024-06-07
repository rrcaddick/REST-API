import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddresses1717757254547 implements MigrationInterface {
  name = "UserAddresses1717757254547";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`fk_user_roles_user_id\``);
    await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`fk_user_roles_role_id\``);
    await queryRunner.query(`DROP INDEX \`IDX_87b8888186ca9769c960e92687\` ON \`user_roles\``);
    await queryRunner.query(`DROP INDEX \`IDX_b23c65e50a758245a33ee35fda\` ON \`user_roles\``);
    await queryRunner.query(
      `CREATE TABLE \`user_addresses\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NOT NULL, \`address_id\` int NOT NULL, PRIMARY KEY (\`user_id\`, \`address_id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`addresses\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`street\` varchar(255) NOT NULL, \`building_complex\` varchar(255) NOT NULL, \`suburb\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`province\` varchar(255) NOT NULL, \`post_code\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(`ALTER TABLE \`user_roles\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`user_roles\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`user_addresses\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`user_addresses\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_addresses\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_addresses\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`
    );
    await queryRunner.query(`CREATE INDEX \`IDX_87b8888186ca9769c960e92687\` ON \`user_roles\` (\`user_id\`)`);
    await queryRunner.query(`CREATE INDEX \`IDX_b23c65e50a758245a33ee35fda\` ON \`user_roles\` (\`role_id\`)`);
    await queryRunner.query(`CREATE INDEX \`IDX_7a5100ce0548ef27a6f1533a5c\` ON \`user_addresses\` (\`user_id\`)`);
    await queryRunner.query(`CREATE INDEX \`IDX_cf9550753babc294d756269f85\` ON \`user_addresses\` (\`address_id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`fk_user_roles_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`fk_user_roles_role_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_addresses\` ADD CONSTRAINT \`fk_user_addresses_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_addresses\` ADD CONSTRAINT \`fk_user_addresses_address_id\` FOREIGN KEY (\`address_id\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user_addresses\` DROP FOREIGN KEY \`fk_user_addresses_address_id\``);
    await queryRunner.query(`ALTER TABLE \`user_addresses\` DROP FOREIGN KEY \`fk_user_addresses_user_id\``);
    await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`fk_user_roles_user_id\``);
    await queryRunner.query(`DROP INDEX \`IDX_cf9550753babc294d756269f85\` ON \`user_addresses\``);
    await queryRunner.query(`DROP INDEX \`IDX_7a5100ce0548ef27a6f1533a5c\` ON \`user_addresses\``);
    await queryRunner.query(`DROP INDEX \`IDX_b23c65e50a758245a33ee35fda\` ON \`user_roles\``);
    await queryRunner.query(`DROP INDEX \`IDX_87b8888186ca9769c960e92687\` ON \`user_roles\``);
    await queryRunner.query(`ALTER TABLE \`user_addresses\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`user_addresses\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`user_roles\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`user_roles\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(
      `ALTER TABLE \`user_addresses\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_addresses\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`
    );
    await queryRunner.query(`DROP TABLE \`addresses\``);
    await queryRunner.query(`DROP TABLE \`user_addresses\``);
    await queryRunner.query(`CREATE INDEX \`IDX_b23c65e50a758245a33ee35fda\` ON \`user_roles\` (\`role_id\`)`);
    await queryRunner.query(`CREATE INDEX \`IDX_87b8888186ca9769c960e92687\` ON \`user_roles\` (\`user_id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`fk_user_roles_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`fk_user_roles_role_id\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
