import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCsvFieldToTransactionsTable1587525944263
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'csvimport',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'csvimport');
  }
}
