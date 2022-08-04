import {Transaction} from './Transaction';
import * as moment from 'moment';

export class Account {
  constructor(
    private name: string,
    private cpf: string,
    private birthDate: string,
    private balance: number = 0,
    private transactions: Transaction[] = []
  ) {
    
  }
  getName = () => this.name
  getCpf = () => this.cpf
  getBirthDate = () => this.birthDate
  getBalance = () => this.balance
  getTransactions = () => this.transactions

  addTransaction(transaction: Transaction): void{
    this.transactions.push(transaction)
  }
  calculateBalance():void{
    this.transactions.forEach(
      (transaction) =>{
        const today: moment.Moment = moment() //data de hoje
        const dateAsObject = moment(transaction.getDate(), "DD/MM/YYYY")//data da transação 
        
        const difference = today.diff(dateAsObject, 'days')//se a data da transação for anterior a de hoje pego o valor que esta nela e lanço no meu saldo
        if (difference >= 0){
          this.balance += transaction.getValue()
        }
      }
    )
    console.log(this.getBalance()) //verificando se ocorreu tudo certo
    }
  }
