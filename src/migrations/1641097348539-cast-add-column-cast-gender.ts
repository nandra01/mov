import {MigrationInterface, QueryRunner} from "typeorm";

export class castAddColumnCastGender1641097348539 implements MigrationInterface {
    name = 'castAddColumnCastGender1641097348539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`ALTER TABLE \`cast\` ADD \`gender\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`ALTER TABLE \`cast\` DROP COLUMN \`gender\``);
    }

}
