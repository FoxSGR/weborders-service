import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1635683812159 implements MigrationInterface {
  name = 'Initial1635683812159';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`address\` CHANGE \`line1\` \`line1\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`address\` CHANGE \`line2\` \`line2\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`address\` CHANGE \`city\` \`city\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`address\` CHANGE \`zipCode\` \`zipCode\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`address\` CHANGE \`country\` \`country\` varchar(255) NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`address\` CHANGE \`country\` \`country\` varchar(255) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`address\` CHANGE \`zipCode\` \`zipCode\` varchar(255) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`address\` CHANGE \`city\` \`city\` varchar(255) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`address\` CHANGE \`line2\` \`line2\` varchar(255) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`address\` CHANGE \`line1\` \`line1\` varchar(255) NOT NULL`
    );
  }
}
