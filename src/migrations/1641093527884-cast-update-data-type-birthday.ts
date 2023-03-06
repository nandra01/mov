import {MigrationInterface, QueryRunner} from "typeorm";

export class castUpdateDataTypeBirthday1641093527884 implements MigrationInterface {
    name = 'castUpdateDataTypeBirthday1641093527884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cast\` DROP COLUMN \`birthday\``);
        await queryRunner.query(`ALTER TABLE \`cast\` ADD \`birthday\` varchar(100) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cast\` DROP COLUMN \`birthday\``);
        await queryRunner.query(`ALTER TABLE \`cast\` ADD \`birthday\` timestamp NULL`);
    }

}
