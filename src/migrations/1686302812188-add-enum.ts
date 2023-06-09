import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEnum1686302812188 implements MigrationInterface {
    name = 'AddEnum1686302812188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`movies\`
            ADD \`status_movie\` enum ('now showing', 'coming soon') NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`cast\`
            ADD \`region\` varchar(100) NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`cast\` DROP COLUMN \`region\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`movies\` DROP COLUMN \`status_movie\`
        `);
    }

}
