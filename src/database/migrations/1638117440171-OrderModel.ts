import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderModel1638117440171 implements MigrationInterface {
  name = 'OrderModel1638117440171';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      ADD \`modelId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`address\`
      CHANGE \`line1\` \`line1\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`address\`
      CHANGE \`line2\` \`line2\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`address\`
      CHANGE \`city\` \`city\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`address\`
      CHANGE \`zipCode\` \`zipCode\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`address\`
      CHANGE \`country\` \`country\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`address\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`client\`
      DROP FOREIGN KEY \`FK_6e6c7c79fbf5ab39520cd1723e2\``);
    await queryRunner.query(`ALTER TABLE \`client\`
      DROP FOREIGN KEY \`FK_626d76371510025cccd6c0ff75d\``);
    await queryRunner.query(`ALTER TABLE \`client\`
      DROP FOREIGN KEY \`FK_ff81e27ae9e24835645c6e0c5ed\``);
    await queryRunner.query(`ALTER TABLE \`client\`
      CHANGE \`phoneNumber\` \`phoneNumber\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`client\`
      CHANGE \`vat\` \`vat\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`client\`
      CHANGE \`addressId\` \`addressId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`client\`
      CHANGE \`agentId\` \`agentId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`client\`
      CHANGE \`ownerId\` \`ownerId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`client\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`agent\`
      DROP FOREIGN KEY \`FK_0b82f0b04f37c25a503fb3883cf\``);
    await queryRunner.query(`ALTER TABLE \`agent\`
      DROP FOREIGN KEY \`FK_bd023b044232bc5e4f21b8e94cf\``);
    await queryRunner.query(`ALTER TABLE \`agent\`
      CHANGE \`phoneNumber\` \`phoneNumber\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`agent\`
      CHANGE \`vat\` \`vat\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`agent\`
      CHANGE \`addressId\` \`addressId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`agent\`
      CHANGE \`ownerId\` \`ownerId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`agent\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`brand\`
      DROP FOREIGN KEY \`FK_8a6b045926c158b885a9c8b5833\``);
    await queryRunner.query(`ALTER TABLE \`brand\`
      CHANGE \`ownerId\` \`ownerId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`brand\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`color\`
      DROP FOREIGN KEY \`FK_03649c5b99d8943a1c43e7545a1\``);
    await queryRunner.query(`ALTER TABLE \`color\`
      CHANGE \`red\` \`red\` int(3) NULL`);
    await queryRunner.query(`ALTER TABLE \`color\`
      CHANGE \`green\` \`green\` int(3) NULL`);
    await queryRunner.query(`ALTER TABLE \`color\`
      CHANGE \`blue\` \`blue\` int(3) NULL`);
    await queryRunner.query(`ALTER TABLE \`color\`
      CHANGE \`ownerId\` \`ownerId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`color\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`component\`
      DROP FOREIGN KEY \`FK_579e3e277e001f4e837cdf406e8\``);
    await queryRunner.query(`ALTER TABLE \`component\`
      CHANGE \`amount\` \`amount\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`component\`
      CHANGE \`price\` \`price\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`component\`
      CHANGE \`ownerId\` \`ownerId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`component\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      DROP FOREIGN KEY \`FK_cce2cb02e55d18257aeb2898a96\``);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      DROP FOREIGN KEY \`FK_4c34f07824e2af844f7fadc46b2\``);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      CHANGE \`amount\` \`amount\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      CHANGE \`price\` \`price\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      CHANGE \`colorId\` \`colorId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      CHANGE \`ownerId\` \`ownerId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_model\`
      DROP FOREIGN KEY \`FK_3d1347ae5112b0039779c728744\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_58840e127d517ed1600b62f5ba\` ON \`shoe_model\``
    );
    await queryRunner.query(`ALTER TABLE \`shoe_model\`
      CHANGE \`reference\` \`reference\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_model\`
      CHANGE \`dateCreated\` \`dateCreated\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_model\`
      CHANGE \`ownerId\` \`ownerId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_model\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      DROP FOREIGN KEY \`FK_8662bfd58a035ce5afd02005cba\``);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      DROP FOREIGN KEY \`FK_5b88995272d9d97889820901b2a\``);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      DROP FOREIGN KEY \`FK_d75c0624b5e338177d7a0f2d04c\``);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      DROP FOREIGN KEY \`FK_14f8bbf9c9c78428532d057d306\``);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      DROP FOREIGN KEY \`FK_9c5d2a1f773ea6ba2ccb1a763b9\``);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      DROP FOREIGN KEY \`FK_958e06923d8b695d3913532c0d3\``);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`dateAsked\` \`dateAsked\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`dateDelivery\` \`dateDelivery\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`baseModelId\` \`baseModelId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`sampleModelId\` \`sampleModelId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`clientId\` \`clientId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`agentId\` \`agentId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`brandId\` \`brandId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`ownerId\` \`ownerId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      DROP FOREIGN KEY \`FK_5e66ad6b92581433ca1ceb67f0b\``);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      DROP FOREIGN KEY \`FK_bc885faba8b3eef09d0cd44e23e\``);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      CHANGE \`dateAsked\` \`dateAsked\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      CHANGE \`dateDelivery\` \`dateDelivery\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      CHANGE \`sampleId\` \`sampleId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      CHANGE \`ownerId\` \`ownerId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_58840e127d517ed1600b62f5ba\` ON \`shoe_model\` (\`reference\`, \`ownerId\`, \`type\`)`
    );
    await queryRunner.query(`ALTER TABLE \`client\`
      ADD CONSTRAINT \`FK_6e6c7c79fbf5ab39520cd1723e2\` FOREIGN KEY (\`addressId\`) REFERENCES \`address\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`client\`
      ADD CONSTRAINT \`FK_626d76371510025cccd6c0ff75d\` FOREIGN KEY (\`agentId\`) REFERENCES \`agent\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`client\`
      ADD CONSTRAINT \`FK_ff81e27ae9e24835645c6e0c5ed\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`agent\`
      ADD CONSTRAINT \`FK_0b82f0b04f37c25a503fb3883cf\` FOREIGN KEY (\`addressId\`) REFERENCES \`address\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`agent\`
      ADD CONSTRAINT \`FK_bd023b044232bc5e4f21b8e94cf\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`brand\`
      ADD CONSTRAINT \`FK_8a6b045926c158b885a9c8b5833\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`color\`
      ADD CONSTRAINT \`FK_03649c5b99d8943a1c43e7545a1\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`component\`
      ADD CONSTRAINT \`FK_579e3e277e001f4e837cdf406e8\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      ADD CONSTRAINT \`FK_cce2cb02e55d18257aeb2898a96\` FOREIGN KEY (\`colorId\`) REFERENCES \`color\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      ADD CONSTRAINT \`FK_4c34f07824e2af844f7fadc46b2\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_model\`
      ADD CONSTRAINT \`FK_3d1347ae5112b0039779c728744\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      ADD CONSTRAINT \`FK_8662bfd58a035ce5afd02005cba\` FOREIGN KEY (\`baseModelId\`) REFERENCES \`shoe_model\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      ADD CONSTRAINT \`FK_5b88995272d9d97889820901b2a\` FOREIGN KEY (\`sampleModelId\`) REFERENCES \`shoe_model\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      ADD CONSTRAINT \`FK_d75c0624b5e338177d7a0f2d04c\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      ADD CONSTRAINT \`FK_14f8bbf9c9c78428532d057d306\` FOREIGN KEY (\`agentId\`) REFERENCES \`agent\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      ADD CONSTRAINT \`FK_9c5d2a1f773ea6ba2ccb1a763b9\` FOREIGN KEY (\`brandId\`) REFERENCES \`brand\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      ADD CONSTRAINT \`FK_958e06923d8b695d3913532c0d3\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      ADD CONSTRAINT \`FK_5e66ad6b92581433ca1ceb67f0b\` FOREIGN KEY (\`sampleId\`) REFERENCES \`shoe_sample\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      ADD CONSTRAINT \`FK_1ba4de05ad24021e6f254700585\` FOREIGN KEY (\`modelId\`) REFERENCES \`shoe_model\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      ADD CONSTRAINT \`FK_bc885faba8b3eef09d0cd44e23e\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      DROP FOREIGN KEY \`FK_bc885faba8b3eef09d0cd44e23e\``);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      DROP FOREIGN KEY \`FK_1ba4de05ad24021e6f254700585\``);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      DROP FOREIGN KEY \`FK_5e66ad6b92581433ca1ceb67f0b\``);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      DROP FOREIGN KEY \`FK_958e06923d8b695d3913532c0d3\``);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      DROP FOREIGN KEY \`FK_9c5d2a1f773ea6ba2ccb1a763b9\``);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      DROP FOREIGN KEY \`FK_14f8bbf9c9c78428532d057d306\``);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      DROP FOREIGN KEY \`FK_d75c0624b5e338177d7a0f2d04c\``);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      DROP FOREIGN KEY \`FK_5b88995272d9d97889820901b2a\``);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      DROP FOREIGN KEY \`FK_8662bfd58a035ce5afd02005cba\``);
    await queryRunner.query(`ALTER TABLE \`shoe_model\`
      DROP FOREIGN KEY \`FK_3d1347ae5112b0039779c728744\``);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      DROP FOREIGN KEY \`FK_4c34f07824e2af844f7fadc46b2\``);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      DROP FOREIGN KEY \`FK_cce2cb02e55d18257aeb2898a96\``);
    await queryRunner.query(`ALTER TABLE \`component\`
      DROP FOREIGN KEY \`FK_579e3e277e001f4e837cdf406e8\``);
    await queryRunner.query(`ALTER TABLE \`color\`
      DROP FOREIGN KEY \`FK_03649c5b99d8943a1c43e7545a1\``);
    await queryRunner.query(`ALTER TABLE \`brand\`
      DROP FOREIGN KEY \`FK_8a6b045926c158b885a9c8b5833\``);
    await queryRunner.query(`ALTER TABLE \`agent\`
      DROP FOREIGN KEY \`FK_bd023b044232bc5e4f21b8e94cf\``);
    await queryRunner.query(`ALTER TABLE \`agent\`
      DROP FOREIGN KEY \`FK_0b82f0b04f37c25a503fb3883cf\``);
    await queryRunner.query(`ALTER TABLE \`client\`
      DROP FOREIGN KEY \`FK_ff81e27ae9e24835645c6e0c5ed\``);
    await queryRunner.query(`ALTER TABLE \`client\`
      DROP FOREIGN KEY \`FK_626d76371510025cccd6c0ff75d\``);
    await queryRunner.query(`ALTER TABLE \`client\`
      DROP FOREIGN KEY \`FK_6e6c7c79fbf5ab39520cd1723e2\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_58840e127d517ed1600b62f5ba\` ON \`shoe_model\``
    );
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      CHANGE \`ownerId\` \`ownerId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      CHANGE \`sampleId\` \`sampleId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      CHANGE \`dateDelivery\` \`dateDelivery\` datetime NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      CHANGE \`dateAsked\` \`dateAsked\` datetime NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      ADD CONSTRAINT \`FK_bc885faba8b3eef09d0cd44e23e\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      ADD CONSTRAINT \`FK_5e66ad6b92581433ca1ceb67f0b\` FOREIGN KEY (\`sampleId\`) REFERENCES \`shoe_sample\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`ownerId\` \`ownerId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`brandId\` \`brandId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`agentId\` \`agentId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`clientId\` \`clientId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`sampleModelId\` \`sampleModelId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`baseModelId\` \`baseModelId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`dateDelivery\` \`dateDelivery\` datetime NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      CHANGE \`dateAsked\` \`dateAsked\` datetime NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      ADD CONSTRAINT \`FK_958e06923d8b695d3913532c0d3\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      ADD CONSTRAINT \`FK_9c5d2a1f773ea6ba2ccb1a763b9\` FOREIGN KEY (\`brandId\`) REFERENCES \`brand\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      ADD CONSTRAINT \`FK_14f8bbf9c9c78428532d057d306\` FOREIGN KEY (\`agentId\`) REFERENCES \`agent\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      ADD CONSTRAINT \`FK_d75c0624b5e338177d7a0f2d04c\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      ADD CONSTRAINT \`FK_5b88995272d9d97889820901b2a\` FOREIGN KEY (\`sampleModelId\`) REFERENCES \`shoe_model\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_sample\`
      ADD CONSTRAINT \`FK_8662bfd58a035ce5afd02005cba\` FOREIGN KEY (\`baseModelId\`) REFERENCES \`shoe_model\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_model\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_model\`
      CHANGE \`ownerId\` \`ownerId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_model\`
      CHANGE \`dateCreated\` \`dateCreated\` datetime NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_model\`
      CHANGE \`reference\` \`reference\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_58840e127d517ed1600b62f5ba\` ON \`shoe_model\` (\`reference\`, \`ownerId\`, \`type\`)`
    );
    await queryRunner.query(`ALTER TABLE \`shoe_model\`
      ADD CONSTRAINT \`FK_3d1347ae5112b0039779c728744\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      CHANGE \`ownerId\` \`ownerId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      CHANGE \`colorId\` \`colorId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      CHANGE \`price\` \`price\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      CHANGE \`amount\` \`amount\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      ADD CONSTRAINT \`FK_4c34f07824e2af844f7fadc46b2\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`shoe_model_component\`
      ADD CONSTRAINT \`FK_cce2cb02e55d18257aeb2898a96\` FOREIGN KEY (\`colorId\`) REFERENCES \`color\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`component\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`component\`
      CHANGE \`ownerId\` \`ownerId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`component\`
      CHANGE \`price\` \`price\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`component\`
      CHANGE \`amount\` \`amount\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`component\`
      ADD CONSTRAINT \`FK_579e3e277e001f4e837cdf406e8\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`color\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`color\`
      CHANGE \`ownerId\` \`ownerId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`color\`
      CHANGE \`blue\` \`blue\` int(3) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`color\`
      CHANGE \`green\` \`green\` int(3) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`color\`
      CHANGE \`red\` \`red\` int(3) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`color\`
      ADD CONSTRAINT \`FK_03649c5b99d8943a1c43e7545a1\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`brand\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`brand\`
      CHANGE \`ownerId\` \`ownerId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`brand\`
      ADD CONSTRAINT \`FK_8a6b045926c158b885a9c8b5833\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`agent\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`agent\`
      CHANGE \`ownerId\` \`ownerId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`agent\`
      CHANGE \`addressId\` \`addressId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`agent\`
      CHANGE \`vat\` \`vat\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`agent\`
      CHANGE \`phoneNumber\` \`phoneNumber\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`agent\`
      ADD CONSTRAINT \`FK_bd023b044232bc5e4f21b8e94cf\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`agent\`
      ADD CONSTRAINT \`FK_0b82f0b04f37c25a503fb3883cf\` FOREIGN KEY (\`addressId\`) REFERENCES \`address\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`user\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`client\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`client\`
      CHANGE \`ownerId\` \`ownerId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`client\`
      CHANGE \`agentId\` \`agentId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`client\`
      CHANGE \`addressId\` \`addressId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`client\`
      CHANGE \`vat\` \`vat\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`client\`
      CHANGE \`phoneNumber\` \`phoneNumber\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`client\`
      ADD CONSTRAINT \`FK_ff81e27ae9e24835645c6e0c5ed\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`client\`
      ADD CONSTRAINT \`FK_626d76371510025cccd6c0ff75d\` FOREIGN KEY (\`agentId\`) REFERENCES \`agent\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`client\`
      ADD CONSTRAINT \`FK_6e6c7c79fbf5ab39520cd1723e2\` FOREIGN KEY (\`addressId\`) REFERENCES \`address\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`address\`
      CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`address\`
      CHANGE \`country\` \`country\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`address\`
      CHANGE \`zipCode\` \`zipCode\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`address\`
      CHANGE \`city\` \`city\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`address\`
      CHANGE \`line2\` \`line2\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`address\`
      CHANGE \`line1\` \`line1\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`shoe_order\`
      DROP COLUMN \`modelId\``);
  }
}
