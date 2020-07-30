import { uuid } from 'uuidv4';
import TypeEnum from './TypeEnum';

class Transaction {
  id: string;

  title: string;

  value: number;

  type: TypeEnum.INCOME | TypeEnum.OUTCOME;

  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Transaction;
