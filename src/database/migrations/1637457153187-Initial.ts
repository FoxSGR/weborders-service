import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1637457153187 implements MigrationInterface {
    name = 'Initial1637457153187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`line1\` varchar(255) NULL, \`line2\` varchar(255) NULL, \`city\` varchar(255) NULL, \`zipCode\` varchar(255) NULL, \`country\` varchar(255) NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NULL, \`vat\` varchar(255) NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`roles\` text NOT NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`brand\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`color\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`red\` int(3) NULL, \`green\` int(3) NULL, \`blue\` int(3) NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`component\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('last', 'heel', 'sole', 'productionInsole', 'finishInsole', 'backCounter', 'laces', 'frontlet', 'lining', 'zip', 'leather', 'ornament') NOT NULL, \`name\` varchar(255) NOT NULL, \`amount\` int NULL, \`colorId\` int NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shoe_model\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('base', 'sample', 'order') NOT NULL, \`reference\` varchar(255) NULL, \`dateCreated\` datetime NULL, \`notes\` varchar(255) NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_d6169d33627d5f28a1dbea9643\` (\`reference\`, \`ownerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shoe_sample\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dateAsked\` datetime NULL, \`dateDelivery\` datetime NULL, \`dateCreated\` datetime NULL, \`notes\` varchar(255) NULL, \`baseModelId\` int NULL, \`clientId\` int NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shoe_model_components_component\` (\`shoeModelId\` int NOT NULL, \`componentId\` int NOT NULL, INDEX \`IDX_e545d340c795a9c15e1e3661f7\` (\`shoeModelId\`), INDEX \`IDX_1a27e16ae0b9949c17c3f91053\` (\`componentId\`), PRIMARY KEY (\`shoeModelId\`, \`componentId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`client\` ADD CONSTRAINT \`FK_ff81e27ae9e24835645c6e0c5ed\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`brand\` ADD CONSTRAINT \`FK_8a6b045926c158b885a9c8b5833\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`color\` ADD CONSTRAINT \`FK_03649c5b99d8943a1c43e7545a1\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`component\` ADD CONSTRAINT \`FK_1065b1dce9ca0df62f703235eb4\` FOREIGN KEY (\`colorId\`) REFERENCES \`color\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`component\` ADD CONSTRAINT \`FK_579e3e277e001f4e837cdf406e8\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` ADD CONSTRAINT \`FK_3d1347ae5112b0039779c728744\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` ADD CONSTRAINT \`FK_8662bfd58a035ce5afd02005cba\` FOREIGN KEY (\`baseModelId\`) REFERENCES \`shoe_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` ADD CONSTRAINT \`FK_d75c0624b5e338177d7a0f2d04c\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` ADD CONSTRAINT \`FK_958e06923d8b695d3913532c0d3\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_model_components_component\` ADD CONSTRAINT \`FK_e545d340c795a9c15e1e3661f7c\` FOREIGN KEY (\`shoeModelId\`) REFERENCES \`shoe_model\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`shoe_model_components_component\` ADD CONSTRAINT \`FK_1a27e16ae0b9949c17c3f910531\` FOREIGN KEY (\`componentId\`) REFERENCES \`component\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shoe_model_components_component\` DROP FOREIGN KEY \`FK_1a27e16ae0b9949c17c3f910531\``);
        await queryRunner.query(`ALTER TABLE \`shoe_model_components_component\` DROP FOREIGN KEY \`FK_e545d340c795a9c15e1e3661f7c\``);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` DROP FOREIGN KEY \`FK_958e06923d8b695d3913532c0d3\``);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` DROP FOREIGN KEY \`FK_d75c0624b5e338177d7a0f2d04c\``);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` DROP FOREIGN KEY \`FK_8662bfd58a035ce5afd02005cba\``);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` DROP FOREIGN KEY \`FK_3d1347ae5112b0039779c728744\``);
        await queryRunner.query(`ALTER TABLE \`component\` DROP FOREIGN KEY \`FK_579e3e277e001f4e837cdf406e8\``);
        await queryRunner.query(`ALTER TABLE \`component\` DROP FOREIGN KEY \`FK_1065b1dce9ca0df62f703235eb4\``);
        await queryRunner.query(`ALTER TABLE \`color\` DROP FOREIGN KEY \`FK_03649c5b99d8943a1c43e7545a1\``);
        await queryRunner.query(`ALTER TABLE \`brand\` DROP FOREIGN KEY \`FK_8a6b045926c158b885a9c8b5833\``);
        await queryRunner.query(`ALTER TABLE \`client\` DROP FOREIGN KEY \`FK_ff81e27ae9e24835645c6e0c5ed\``);
        await queryRunner.query(`DROP INDEX \`IDX_1a27e16ae0b9949c17c3f91053\` ON \`shoe_model_components_component\``);
        await queryRunner.query(`DROP INDEX \`IDX_e545d340c795a9c15e1e3661f7\` ON \`shoe_model_components_component\``);
        await queryRunner.query(`DROP TABLE \`shoe_model_components_component\``);
        await queryRunner.query(`DROP TABLE \`shoe_sample\``);
        await queryRunner.query(`DROP INDEX \`IDX_d6169d33627d5f28a1dbea9643\` ON \`shoe_model\``);
        await queryRunner.query(`DROP TABLE \`shoe_model\``);
        await queryRunner.query(`DROP TABLE \`component\``);
        await queryRunner.query(`DROP TABLE \`color\``);
        await queryRunner.query(`DROP TABLE \`brand\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`client\``);
        await queryRunner.query(`DROP TABLE \`address\``);
    }

}
