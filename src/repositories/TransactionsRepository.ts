import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const incomes = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, { value }) => {
        return total + Number(value);
      }, 0);

    const outcomes = transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((total, { value }) => {
        return total + Number(value);
      }, 0);

    const balance = {
      income: incomes,
      outcome: outcomes,
      total: incomes - outcomes,
    };

    return balance;
  }
}

export default TransactionsRepository;
