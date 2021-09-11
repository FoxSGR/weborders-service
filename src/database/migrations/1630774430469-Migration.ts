import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1630774430469 implements MigrationInterface {
    name = 'Migration1630774430469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`address\` CHANGE \`line1\` \`line1\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`address\` CHANGE \`line2\` \`line2\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`address\` CHANGE \`city\` \`city\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`address\` CHANGE \`zipCode\` \`zipCode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`address\` CHANGE \`country\` \`country\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`address\` CHANGE \`country\` \`country\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`address\` CHANGE \`zipCode\` \`zipCode\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`address\` CHANGE \`city\` \`city\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`address\` CHANGE \`line2\` \`line2\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`weborders\`.\`address\` CHANGE \`line1\` \`line1\` varchar(255) NOT NULL`);
    }

}
