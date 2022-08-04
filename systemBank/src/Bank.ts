import { Account } from "./Account";
import { JSONFileManager } from "./JSONFileManager";
import * as moment from "moment"
import { Transaction } from "./Transaction";

export class Bank{
  private fileManager: JSONFileManager = new JSONFileManager() //classe que lê e escreve arquivos json 
  private accounts: Account[] = [] //array de contas que começa com array vazio
 
  //ler a base de dados e transforma-los em instancias da classe
  constructor(){
    const fileData: any = this.fileManager.readDatabase() //o que tinha no meu JSON está salvo nessa fileData
    this.accounts = fileData.map(
      (item : any) => {
        return new Account(
          item.name,
          item.cpf,
          item.birthDate,
          item.balance,
          item.transactions 
        )
      }
    )
  }
  createAccount(name: string, cpf: string, birthDate: string): void{//função que recebe os parametros nome, cpf e a data de nascimento
    const duplicateAccount: Account | undefined = this.accounts.find( 
      (account) => {return account.getCpf() === cpf}  //VALIDANDO CPF:procurando pela conta onde o cpf seja igual ao cpf que estou recebendo
      )
    //validação: (cpf um por conta)se meu duplicateAccount existir, se não for undefind
    if(duplicateAccount){
      throw new Error("CPF informado já possui uma conta cadastrada!") //Error é uma classe nativa do typescript
    }

      //VALIDANDO IDADE:pegando o ano de nascimento do usuario e subtraindo pelo ano atual
      const birthDateAsObject = moment(birthDate, "DD/MM/YYYY")
      const age = moment().diff(birthDateAsObject, "years")
      //validação: (idade maior de dezoito anos)
      if(age < 18){
        throw new Error("Usuario deve ter 18 anos ou mais!")
      }
      //CRIANDO CONTA
      this.accounts.push(
        new Account(name, cpf, birthDate)
      )
      this.fileManager.writeToDatabase(this.accounts) //salvando no banco de dados
      }

      // Validando se tem alguem com o cpf e nome informado pelo usuario
      getBalance(name: string, cpf: string):number{
        const userAccount: Account | undefined = this.accounts.find( 
          (account) => {return account.getCpf() === cpf && account.getName() === name}  //VALIDANDO CPF E NAME
          )
          if (userAccount){
            return userAccount.getBalance()
          }else{
            throw new Error("Usuario não encontrado!")
          }
      }
      addBalance(name: string, cpf: string, value: number): void{
        const date: string = moment().format("DD/MM/YYYY")
        const description: string = "Deposito de dinheiro"

        this.accounts.forEach( 
          (account) => {
              if(account.getCpf() === cpf && account.getName() === name ){
                account.addTransaction(
                  new Transaction(
                    value,
                    description,
                    date
                  )
                )
            }
          }  
        )
        this.fileManager.writeToDatabase(this.accounts) //salvando no banco de dados json
      }
    }
  
