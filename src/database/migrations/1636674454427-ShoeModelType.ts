import {MigrationInterface, QueryRunner} from "typeorm";

export class ShoeModelType1636674454427 implements MigrationInterface {
    name = 'ShoeModelType1636674454427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shoe_model\` DROP FOREIGN KEY \`FK_de484518261cb8ecec74aaeba09\``);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` DROP FOREIGN KEY \`FK_e6a1f33a048cd2b3efcbfecaf3f\``);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` DROP COLUMN \`brandId\``);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` DROP COLUMN \`clientId\``);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` ADD \`type\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` ADD \`notes\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`red\` \`red\` int(3) NULL`);
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`green\` \`green\` int(3) NULL`);
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`blue\` \`blue\` int(3) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_d6169d33627d5f28a1dbea9643\` ON \`shoe_model\` (\`reference\`, \`ownerId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_d6169d33627d5f28a1dbea9643\` ON \`shoe_model\``);
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`blue\` \`blue\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`green\` \`green\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`red\` \`red\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` DROP COLUMN \`notes\``);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` ADD \`clientId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` ADD \`brandId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` ADD CONSTRAINT \`FK_e6a1f33a048cd2b3efcbfecaf3f\` FOREIGN KEY (\`brandId\`) REFERENCES \`brand\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` ADD CONSTRAINT \`FK_de484518261cb8ecec74aaeba09\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
