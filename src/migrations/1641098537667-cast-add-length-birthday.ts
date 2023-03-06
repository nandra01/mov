import {MigrationInterface, QueryRunner} from "typeorm";

export class castAddLengthBirthday1641098537667 implements MigrationInterface {
    name = 'castAddLengthBirthday1641098537667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cast\` DROP COLUMN \`birthday\``);
        await queryRunner.query(`ALTER TABLE \`cast\` ADD \`birthday\` varchar(100) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cast\` DROP COLUMN \`birthday\``);
        await queryRunner.query(`ALTER TABLE \`cast\` ADD \`birthday\` varchar(255) NULL`);
    }

}
