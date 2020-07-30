import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const transaction = await transactionRepository.findOne(id);

    if (transaction) {
      await transactionRepository.remove(transaction);
    } else {
      throw new AppError('Transaction does not exists!');
    }
  }
}

export default DeleteTransactionService;
