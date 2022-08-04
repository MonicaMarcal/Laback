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
        const transactions = item.transactions.map(
          (transaction: any) => new Transaction (
            transaction.value,
            transaction.description,
            transaction.date
          )
        )
        return new Account(
          item.name,
          item.cpf,
          item.birthDate,
          item.balance,
          transactions 
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
      //pagando conta
      payBill(
         cpf: string,
         value: number, 
         description: string,
         date: string = moment().format("DD/MM/YYYY")
         ): void{
         value = Number(value)/////
         this.accounts.forEach( 
          (account) => {
            const dateAsObject = moment(date, "DD/MM/YYYY")
            if(
              account.getCpf() === cpf &&
              value < account.getBalance() &&
              dateAsObject.diff(moment() , 'days') >= 0 //timestamp do momento que o codigo esta sendo executado
            ){
              account.addTransaction(//criando uma nova transaction
                new Transaction (
                (value * -1),//tem que ser negativo porque estou tirando dinheiro da conta
                description,
                date
                )
              )
              this.fileManager.writeToDatabase(this.accounts) //salvando no banco de dados json
              console.log("Sucesso")
            }else{
             console.log(
              account.getCpf() === cpf,
              value < account.getBalance(),
              dateAsObject.diff(moment() , 'days') >= 0 ///
             )
            }
          }  
        )
      }
      //Essa função não recebe nada, o que ela precisa fazer é passar
      //por todas as contas e para cada conta ela vai passar pelo array de transações
      //e para cada transação ela vai atualizar o saldo
      updateBalance(){
        this.accounts.forEach(
          (account) =>{
            account.calculateBalance()
          }
        )
        this.fileManager.writeToDatabase(this.accounts)
      }
      makeTransfer(
        depositaryName:string,
        depositaryCpf:string, 
        recipientName:string, 
        recipientCpf:string, 
        value:number
        ):void{
          const depositaryAccount: Account | undefined = this.accounts.find(
            (account) => {return account.getCpf() === depositaryCpf && account.getName() === depositaryName}
          )
          const recipientAccount: Account | undefined = this.accounts.find(
            (account) => {return account.getCpf() === recipientCpf && account.getName() === recipientName}
          )
          //caso um dos dois não exista
          if(!depositaryAccount || !recipientAccount){
            throw new Error("Contas não encontradas")
          }
          //caso as duas existam
          this.accounts.forEach(
            account => {
              if(account.getCpf() === depositaryCpf && account.getName() === depositaryName){
                  account.addTransaction(new Transaction( //esse if é a conta da onde está saindo o dinheiro
                    value * -1,
                    "Transferencia entre contas"
                  ))
              }
              if(account.getCpf() === recipientCpf && account.getName() === recipientName){
                account.addTransaction(new Transaction( //esse if é a conta da onde está saindo o dinheiro
                    value,
                    "Transferencia entre contas"
                  ))
              }
            }
          )
          this.fileManager.writeToDatabase(this.accounts)

        }
  }
  
