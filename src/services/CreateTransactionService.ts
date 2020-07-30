import { getCustomRepository, getRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}
class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: RequestDTO): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    const { total } = await transactionsRepository.getBalance();

    if (type === 'outcome' && value > total) {
      throw new AppError('Insuficient Founds!', 400);
    }

    let checkCategory = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    if (!checkCategory) {
      checkCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(checkCategory);
    }
    const transaction = transactionsRepository.create({
      title,
      type,
      value,
      category: checkCategory,
    });
    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
