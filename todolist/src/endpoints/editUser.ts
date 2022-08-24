import {Request, Response} from 'express';
import updateUser from '../data/updateUser';

export default async function editUser(
  req:Request,
  res: Response
  ) {
    try{
      //validar entradas da requisição
      if(
        req.body.name === '' ||
        req.body.nickname === '' ||
        req.body.email === ''
      ){
        res.status(400).send({
          message: "Nenhum dos campos pode estar em branco"
        })
        return
      }
   //se não existir  name, nickname, email
   if (!req.body.name && !req.body.nickname && !req.body.email ){
    res.status(400).send({
      message: "Escolha pelo menos um valor para alterar"
    })
    return
   }
   //consultar o banco de dados
   await updateUser(
    req.params.id,
    req.body.name,
    req.body.nickname,
    req.body.email
   )
   //responder a requsição
   res.status(200).send({
    message: "Usuario atualizado"
  })
      
    }catch(error:any){
      res.status(400).send({
        message: error.message || error.sqlMessage
      })
    }
  
}