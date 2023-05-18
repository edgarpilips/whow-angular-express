import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1684342935579 implements MigrationInterface {
    name = 'initial1684342935579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`postal_address\` CHANGE \`companyId\` \`companyId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Other') NULL`);
        await queryRunner.query(`ALTER TABLE \`postal_address\` ADD CONSTRAINT \`FK_3bcc2ab59bbd589dbafc5a63f25\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`postal_address\` DROP FOREIGN KEY \`FK_3bcc2ab59bbd589dbafc5a63f25\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Other') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`postal_address\` CHANGE \`companyId\` \`companyId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`company\``);
    }

}
