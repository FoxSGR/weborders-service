import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1636510476611 implements MigrationInterface {
    name = 'Initial1636510476611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`line1\` varchar(255) NULL, \`line2\` varchar(255) NULL, \`city\` varchar(255) NULL, \`zipCode\` varchar(255) NULL, \`country\` varchar(255) NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NULL, \`vat\` varchar(255) NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`roles\` text NOT NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`brand\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`color\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`red\` int(3) NULL, \`green\` int(3) NULL, \`blue\` int(3) NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`component\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('last', 'heel', 'sole', 'productionInsole', 'finishInsole', 'backCounter', 'laces', 'frontlet', 'lining', 'zip', 'leather', 'ornament') NULL, \`name\` varchar(255) NOT NULL, \`amount\` int NULL, \`colorId\` int NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`client\` ADD CONSTRAINT \`FK_ff81e27ae9e24835645c6e0c5ed\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`brand\` ADD CONSTRAINT \`FK_8a6b045926c158b885a9c8b5833\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`color\` ADD CONSTRAINT \`FK_03649c5b99d8943a1c43e7545a1\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`component\` ADD CONSTRAINT \`FK_1065b1dce9ca0df62f703235eb4\` FOREIGN KEY (\`colorId\`) REFERENCES \`color\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`component\` ADD CONSTRAINT \`FK_579e3e277e001f4e837cdf406e8\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`component\` DROP FOREIGN KEY \`FK_579e3e277e001f4e837cdf406e8\``);
        await queryRunner.query(`ALTER TABLE \`component\` DROP FOREIGN KEY \`FK_1065b1dce9ca0df62f703235eb4\``);
        await queryRunner.query(`ALTER TABLE \`color\` DROP FOREIGN KEY \`FK_03649c5b99d8943a1c43e7545a1\``);
        await queryRunner.query(`ALTER TABLE \`brand\` DROP FOREIGN KEY \`FK_8a6b045926c158b885a9c8b5833\``);
        await queryRunner.query(`ALTER TABLE \`client\` DROP FOREIGN KEY \`FK_ff81e27ae9e24835645c6e0c5ed\``);
        await queryRunner.query(`DROP TABLE \`component\``);
        await queryRunner.query(`DROP TABLE \`color\``);
        await queryRunner.query(`DROP TABLE \`brand\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`client\``);
        await queryRunner.query(`DROP TABLE \`address\``);
    }

}
