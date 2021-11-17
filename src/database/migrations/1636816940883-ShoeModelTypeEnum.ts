import {MigrationInterface, QueryRunner} from "typeorm";

export class ShoeModelTypeEnum1636816940883 implements MigrationInterface {
    name = 'ShoeModelTypeEnum1636816940883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`red\` \`red\` int(3) NULL`);
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`green\` \`green\` int(3) NULL`);
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`blue\` \`blue\` int(3) NULL`);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` ADD \`type\` enum ('base', 'sample', 'order') NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shoe_model\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`shoe_model\` ADD \`type\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`blue\` \`blue\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`green\` \`green\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`red\` \`red\` int NULL`);
    }

}
