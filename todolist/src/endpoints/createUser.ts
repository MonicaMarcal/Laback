import {Request, Response} from 'express';
import insertUser from '../data/insertUser';

export default async function createUser(
  req:Request,
  res: Response
  ) {
    try{
      //validar entradas da requisição
      if(!req.body.name || !req.body.nickname || !req.body.email){ //se qualquar um desses (name, nickname, email) não existirem (!)
        (res.status(400).send('Preencha os campos "name","nickname" e "email"'))
      }  
      const id:string = Date.now() + Math.random().toString() //pegando o tempo exato da requisição do usuario e gerando um numero aleatorio
      
      await insertUser(
        id,
        req.body.name,
        req.body.nickname,
        req.body.email
      )                               
      res
        .status(200)
        .send('Usuario criado com sucesso!')

      
    }catch(error:any){
      res.status(400).send({
        message: error.message || error.sqlMessage
      })
    }
  
}