import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1637799153370 implements MigrationInterface {
    name = 'Initial1637799153370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`line1\` varchar(255) NULL, \`line2\` varchar(255) NULL, \`city\` varchar(255) NULL, \`zipCode\` varchar(255) NULL, \`country\` varchar(255) NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NULL, \`vat\` varchar(255) NULL, \`notes\` varchar(255) NOT NULL DEFAULT '', \`addressId\` int NULL, \`agentId\` int NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_6e6c7c79fbf5ab39520cd1723e\` (\`addressId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`roles\` text NOT NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`agent\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NULL, \`vat\` varchar(255) NULL, \`addressId\` int NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_0b82f0b04f37c25a503fb3883c\` (\`addressId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`brand\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`color\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`red\` int(3) NULL, \`green\` int(3) NULL, \`blue\` int(3) NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`component\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('last', 'heel', 'sole', 'productionInsole', 'finishInsole', 'backCounter', 'laces', 'frontlet', 'lining', 'zip', 'leather', 'ornament') NOT NULL, \`name\` varchar(255) NOT NULL, \`amount\` int NULL, \`price\` int NULL, \`notes\` varchar(255) NOT NULL DEFAULT '', \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shoe_model_component\` (\`modelId\` int NOT NULL, \`componentId\` int NOT NULL, \`amount\` int NULL, \`price\` int NULL, \`notes\` varchar(255) NOT NULL DEFAULT '', \`colorId\` int NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`modelId\`, \`componentId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shoe_model\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('base', 'sample', 'order') NOT NULL, \`reference\` varchar(255) NULL, \`photos\` text NOT NULL DEFAULT '[]', \`dateCreated\` datetime NULL, \`notes\` varchar(255) NOT NULL DEFAULT '', \`ownerId\` int NULL, \`seasonYear\` int NOT NULL, \`seasonSeasons\` enum ('fall_winter', 'spring_summer') NOT NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_58840e127d517ed1600b62f5ba\` (\`reference\`, \`ownerId\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shoe_sample\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dateAsked\` datetime NULL, \`dateDelivery\` datetime NULL, \`notes\` varchar(255) NOT NULL DEFAULT '', \`baseModelId\` int NULL, \`sampleModelId\` int NULL, \`clientId\` int NULL, \`agentId\` int NULL, \`brandId\` int NULL, \`ownerId\` int NULL, \`deletedAt\` timestamp(6) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_5b88995272d9d97889820901b2\` (\`sampleModelId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`client\` ADD CONSTRAINT \`FK_6e6c7c79fbf5ab39520cd1723e2\` FOREIGN KEY (\`addressId\`) REFERENCES \`address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`client\` ADD CONSTRAINT \`FK_626d76371510025cccd6c0ff75d\` FOREIGN KEY (\`agentId\`) REFERENCES \`agent\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`client\` ADD CONSTRAINT \`FK_ff81e27ae9e24835645c6e0c5ed\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agent\` ADD CONSTRAINT \`FK_0b82f0b04f37c25a503fb3883cf\` FOREIGN KEY (\`addressId\`) REFERENCES \`address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agent\` ADD CONSTRAINT \`FK_bd023b044232bc5e4f21b8e94cf\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`brand\` ADD CONSTRAINT \`FK_8a6b045926c158b885a9c8b5833\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`color\` ADD CONSTRAINT \`FK_03649c5b99d8943a1c43e7545a1\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`component\` ADD CONSTRAINT \`FK_579e3e277e001f4e837cdf406e8\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_model_component\` ADD CONSTRAINT \`FK_00b805249afaf421b29324cf855\` FOREIGN KEY (\`modelId\`) REFERENCES \`shoe_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_model_component\` ADD CONSTRAINT \`FK_f8628b330ad4f59bce694a383ba\` FOREIGN KEY (\`componentId\`) REFERENCES \`component\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_model_component\` ADD CONSTRAINT \`FK_cce2cb02e55d18257aeb2898a96\` FOREIGN KEY (\`colorId\`) REFERENCES \`color\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_model_component\` ADD CONSTRAINT \`FK_4c34f07824e2af844f7fadc46b2\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` ADD CONSTRAINT \`FK_3d1347ae5112b0039779c728744\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` ADD CONSTRAINT \`FK_8662bfd58a035ce5afd02005cba\` FOREIGN KEY (\`baseModelId\`) REFERENCES \`shoe_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` ADD CONSTRAINT \`FK_5b88995272d9d97889820901b2a\` FOREIGN KEY (\`sampleModelId\`) REFERENCES \`shoe_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` ADD CONSTRAINT \`FK_d75c0624b5e338177d7a0f2d04c\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` ADD CONSTRAINT \`FK_14f8bbf9c9c78428532d057d306\` FOREIGN KEY (\`agentId\`) REFERENCES \`agent\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` ADD CONSTRAINT \`FK_9c5d2a1f773ea6ba2ccb1a763b9\` FOREIGN KEY (\`brandId\`) REFERENCES \`brand\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` ADD CONSTRAINT \`FK_958e06923d8b695d3913532c0d3\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` DROP FOREIGN KEY \`FK_958e06923d8b695d3913532c0d3\``);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` DROP FOREIGN KEY \`FK_9c5d2a1f773ea6ba2ccb1a763b9\``);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` DROP FOREIGN KEY \`FK_14f8bbf9c9c78428532d057d306\``);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` DROP FOREIGN KEY \`FK_d75c0624b5e338177d7a0f2d04c\``);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` DROP FOREIGN KEY \`FK_5b88995272d9d97889820901b2a\``);
        await queryRunner.query(`ALTER TABLE \`shoe_sample\` DROP FOREIGN KEY \`FK_8662bfd58a035ce5afd02005cba\``);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` DROP FOREIGN KEY \`FK_3d1347ae5112b0039779c728744\``);
        await queryRunner.query(`ALTER TABLE \`shoe_model_component\` DROP FOREIGN KEY \`FK_4c34f07824e2af844f7fadc46b2\``);
        await queryRunner.query(`ALTER TABLE \`shoe_model_component\` DROP FOREIGN KEY \`FK_cce2cb02e55d18257aeb2898a96\``);
        await queryRunner.query(`ALTER TABLE \`shoe_model_component\` DROP FOREIGN KEY \`FK_f8628b330ad4f59bce694a383ba\``);
        await queryRunner.query(`ALTER TABLE \`shoe_model_component\` DROP FOREIGN KEY \`FK_00b805249afaf421b29324cf855\``);
        await queryRunner.query(`ALTER TABLE \`component\` DROP FOREIGN KEY \`FK_579e3e277e001f4e837cdf406e8\``);
        await queryRunner.query(`ALTER TABLE \`color\` DROP FOREIGN KEY \`FK_03649c5b99d8943a1c43e7545a1\``);
        await queryRunner.query(`ALTER TABLE \`brand\` DROP FOREIGN KEY \`FK_8a6b045926c158b885a9c8b5833\``);
        await queryRunner.query(`ALTER TABLE \`agent\` DROP FOREIGN KEY \`FK_bd023b044232bc5e4f21b8e94cf\``);
        await queryRunner.query(`ALTER TABLE \`agent\` DROP FOREIGN KEY \`FK_0b82f0b04f37c25a503fb3883cf\``);
        await queryRunner.query(`ALTER TABLE \`client\` DROP FOREIGN KEY \`FK_ff81e27ae9e24835645c6e0c5ed\``);
        await queryRunner.query(`ALTER TABLE \`client\` DROP FOREIGN KEY \`FK_626d76371510025cccd6c0ff75d\``);
        await queryRunner.query(`ALTER TABLE \`client\` DROP FOREIGN KEY \`FK_6e6c7c79fbf5ab39520cd1723e2\``);
        await queryRunner.query(`DROP INDEX \`REL_5b88995272d9d97889820901b2\` ON \`shoe_sample\``);
        await queryRunner.query(`DROP TABLE \`shoe_sample\``);
        await queryRunner.query(`DROP INDEX \`IDX_58840e127d517ed1600b62f5ba\` ON \`shoe_model\``);
        await queryRunner.query(`DROP TABLE \`shoe_model\``);
        await queryRunner.query(`DROP TABLE \`shoe_model_component\``);
        await queryRunner.query(`DROP TABLE \`component\``);
        await queryRunner.query(`DROP TABLE \`color\``);
        await queryRunner.query(`DROP TABLE \`brand\``);
        await queryRunner.query(`DROP INDEX \`REL_0b82f0b04f37c25a503fb3883c\` ON \`agent\``);
        await queryRunner.query(`DROP TABLE \`agent\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_6e6c7c79fbf5ab39520cd1723e\` ON \`client\``);
        await queryRunner.query(`DROP TABLE \`client\``);
        await queryRunner.query(`DROP TABLE \`address\``);
    }

}
