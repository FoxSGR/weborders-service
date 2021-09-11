import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1630774393247 implements MigrationInterface {
    name = 'Migration1630774393247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`fk_user_pet\` ON \`weborders\`.\`pet\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`fk_user_pet\` ON \`weborders\`.\`pet\` (\`user_id\`)`);
    }

}
