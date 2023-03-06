import {MigrationInterface, QueryRunner} from "typeorm";

export class castGender1641092336910 implements MigrationInterface {
    name = 'castGender1641092336910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`ALTER TABLE \`cast\` ADD \`gender\` varchar(100) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`ALTER TABLE \`cast\` DROP COLUMN \`gender\``);
    }

}
