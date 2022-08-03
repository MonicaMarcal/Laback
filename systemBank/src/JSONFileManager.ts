import * as fs from 'fs';

export class JSONFileManager{
  private fileName: string = 'data.json'

  public readDatabase(): any{
      try{
          return JSON.parse(fs.readFileSync(`./${this.fileName}`).toString()) // depois que estiver transformado em string, rodará o json.parse para rodar o arquivo e caso de errado caira no catch
      }catch(error){
        return[] // retornando array vazio do bank.ts
    }
  }
  public writeToDatabase(data: any): void{//dados que eu quero salvar
    try{
      const dataAsString: string = JSON.stringify(data, null, 2)
      fs.writeFileSync(`./${this.fileName}`, dataAsString)
    }catch(error){
      console.log("Falha ao atualizar a base de dados")//não temo como saber o erro que retornará pois esse parametro é VOID, então só demos um console.log
    }
  }
}