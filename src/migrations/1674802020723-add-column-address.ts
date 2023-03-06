import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnAddress1674802020723 implements MigrationInterface {
  name = 'addColumnAddress1674802020723';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`movies\` ADD \`address\` varchar(50) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`movies\` DROP COLUMN \`address\``);
  }
}
