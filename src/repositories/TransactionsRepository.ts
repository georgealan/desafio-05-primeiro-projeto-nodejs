import Transaction from '../models/Transaction';
import TypeEnum from '../models/TypeEnum';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionDTO {
  title: string;
  value: number;
  type: TypeEnum;
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions;

    const incomeItens = balance.filter(item => {
      return item.type === TypeEnum.INCOME;
    });

    const outcomeItens = balance.filter(item => {
      return item.type === TypeEnum.OUTCOME;
    });

    const valueIncomes = incomeItens.reduce((accumulated, actual) => {
      return accumulated + actual.value;
    }, 0);

    const valueOutcomes = outcomeItens.reduce((accumulated, actual) => {
      return accumulated + actual.value;
    }, 0);

    if (valueOutcomes > valueIncomes) {
      throw Error(
        'Transaction not accepted, because value income a smaller who outcome',
      );
    }

    const totalSubtractInandOut = valueIncomes - valueOutcomes;

    const newObjectBalance: Balance = {
      income: valueIncomes,
      outcome: valueOutcomes,
      total: totalSubtractInandOut,
    };

    return newObjectBalance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
