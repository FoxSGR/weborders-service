import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1631828563726 implements MigrationInterface {
    name = 'Initial1631828563726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`weborders\`.\`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`line1\` varchar(255) NULL, \`line2\` varchar(255) NULL, \`city\` varchar(255) NULL, \`zipCode\` varchar(255) NULL, \`country\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`weborders\`.\`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`vat\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`weborders\`.\`pet\` (\`id\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`user_id\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`weborders\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`weborders\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`weborders\`.\`pet\``);
        await queryRunner.query(`DROP TABLE \`weborders\`.\`client\``);
        await queryRunner.query(`DROP TABLE \`weborders\`.\`address\``);
    }

}
