import {Bank} from './Bank';
import {Account} from './Account';
import {Transaction} from './Transaction';

//quando eu der o nom run start, deverei escolher qual metodo irei executar
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

    default:
      break;
 }