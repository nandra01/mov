import { MigrationInterface, QueryRunner } from "typeorm";

export class init1678108672445 implements MigrationInterface {
    name = 'init1678108672445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`cast\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`name\` varchar(100) NULL,
                \`birthday\` varchar(100) NULL,
                \`deadday\` timestamp NULL,
                \`rating\` int NULL,
                \`address\` varchar(255) NULL,
                \`city\` varchar(255) NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`movie_cast\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`movie_id\` bigint NULL,
                \`cast_id\` bigint NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`movies\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`name\` varchar(100) NULL,
                \`language\` varchar(30) NULL,
                \`status\` varchar(10) NULL,
                \`rating\` int NULL,
                \`address\` varchar(50) NULL,
                \`city\` varchar(50) NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`movies\`
        `);
        await queryRunner.query(`
            DROP TABLE \`movie_cast\`
        `);
        await queryRunner.query(`
            DROP TABLE \`cast\`
        `);
    }

}
