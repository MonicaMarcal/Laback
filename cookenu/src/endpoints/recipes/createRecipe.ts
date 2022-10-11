import { Request, Response } from "express";
import connection from "../../connection";
import { getTokenData } from "../../services/authenticator";
import generateId from "../../services/idGenerator";
import { recipeTableName } from "../../types";

export default async function createRecipe(
  req:Request,
  res:Response
):Promise<void>{
  try{

    const {title, description} = req.body
    const token = req.headers.authorization

    const tokenData = getTokenData(token!)

    if(!tokenData){
      res.statusCode = 401
      throw new Error("unauthorized")
    }
    if(!title || description){
      res.statusCode = 422
      throw new Error("'title and description' required")
    }

    const id = generateId()

    const createdAt = new Date()

    await connection(recipeTableName)
    .insert({
      id, 
      title,
      description,
      created_at: createdAt,
      author_id: tokenData!.id
    })
    res.send("Recipe successfully created!")


  }catch(error:any){
    console.log(error.message)

    if(res.statusCode === 200){
      res.status(500).send("Internal Server Error");
    }else{
      res.send(error.message)
    }
  }
}