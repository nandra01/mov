import {MigrationInterface, QueryRunner} from "typeorm";

export class movieCastRating1641093207739 implements MigrationInterface {
    name = 'movieCastRating1641093207739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`ALTER TABLE \`movie_cast\` ADD \`rating\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`ALTER TABLE \`movie_cast\` DROP COLUMN \`rating\``);
    }

}
