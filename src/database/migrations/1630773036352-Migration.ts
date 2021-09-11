import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1630773036352 implements MigrationInterface {
    name = 'Migration1630773036352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`pet\` DROP FOREIGN KEY \`fk_user_pet\``);
        await queryRunner.query(`CREATE TABLE \`weborders\`.\`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`line1\` varchar(255) NOT NULL, \`line2\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`zipCode\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`weborders\`.\`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`vat\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`pet\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`pet\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`pet\` ADD \`id\` char(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`user\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`user\` ADD \`id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`user\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`pet\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`pet\` ADD \`id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`pet\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`DROP TABLE \`weborders\`.\`client\``);
        await queryRunner.query(`DROP TABLE \`weborders\`.\`address\``);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`pet\` ADD CONSTRAINT \`fk_user_pet\` FOREIGN KEY (\`user_id\`) REFERENCES \`weborders\`.\`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
