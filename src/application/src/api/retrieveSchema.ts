import { Contract } from "fabric-network";
import { ISchema } from "../utils/Types";

const retrieveSchema = async (contract: Contract, req: any, res: any) =>{
  const id = req.query.schemaId

  console.log("type of id: ", typeof id)

  if(typeof id !== "string") {
    console.log("Type of id not mached")
    res.status(422).send("Invalide type of id, required type string")
  }

  try{
    console.log("\n Retrieving data ... \n")
    const result = await contract.evaluateTransaction("ReadAsset", id)

    if(!result || result.toString().length === 0){
      console.log("\n No result found \n")
      res.status(400).send("Data not found")
    }

    const resultJson = JSON.parse(result.toString())
    const schemaJson : ISchema = resultJson.Schema

    console.log(schemaJson)

    res.send(schemaJson)
  }
  catch(error){
    console.log("Error")
    res.status(400).send(error)
  }
}

export default retrieveSchema