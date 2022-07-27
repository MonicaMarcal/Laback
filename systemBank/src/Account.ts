import {Transaction} from './Transaction';

export class Account {
  constructor(
    private name: string,
    private cpf: string,
    private birthDate: string,
    private balance: number = 0,
    private transactions: Transaction[] = []
  ) {
    
  }
}