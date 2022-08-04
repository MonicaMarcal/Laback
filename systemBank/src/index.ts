import {Bank} from './Bank';
import {Account} from './Account';
import {Transaction} from './Transaction';

const bank: Bank = new Bank()
const action: string = process.argv[2] //segunda posição do meu array de argumentos do terminal

 switch(action){
  case 'createAccount':
    bank.createAccount(
      process.argv[3],
      process.argv[4],
      process.argv[5]
    )
    console.log("Sucesso")
    break;

  case 'getBalance':
      console.log(
        bank.getBalance(
        process.argv[3],
        process.argv[4]
        )
      )
      break

  case 'addBalance':
    bank.addBalance(
      process.argv[3],
      process.argv[4],
      Number(process.argv[5])
    )
    console.log("Sucesso")
    break

  case 'payBill':
    bank.payBill(
      process.argv[3],//cpf
      Number(process.argv[4]),//value
      process.argv[5], //description
      process.argv[6] //date
    )
    break

  case 'updateBalance':
    bank.updateBalance()
    break

    default:
      console.log("Operação invalida!")
      break;
 }