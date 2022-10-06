import {hashSync, compareSync, genSaltSync} from "bcryptjs";
import {config} from "dotenv";

config();

//função que recebe um texto/string e devolve um texto/string cifrado
export const generateHash = (
  plainText: string
): string => {
  const rounds: number = Number(process.env.BCRYPT_COST);
  const salt: string = genSaltSync(rounds)
  return hashSync(plainText, salt)
}

//funçao que compara um hash com um texto/string que possa ter gerado esse hash 
//vendo se o cypherText foi gerado apartir do plainText
export const compareHash = (
  plainText : string,
  cypherText: string
): boolean => compareSync(plainText,cypherText)
