import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import TypeEnum from '../models/TypeEnum';

interface Request {
  title: string;
  value: number;
  type: TypeEnum.INCOME | TypeEnum.OUTCOME;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type !== TypeEnum.INCOME && type !== TypeEnum.OUTCOME) {
      throw Error(
        'The Type is not accepted this value, please change to value',
      );
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
