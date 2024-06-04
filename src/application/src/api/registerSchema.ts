import { Contract } from "fabric-network";
import { ISchema } from "../utils/Types";


/** 
 * @param contract
 * @param req 
 * @param res 
 * @method registerSchema 
 * Check duplicacy of schema
 * Handle schema format and id format
 * Asset key will be schemaId
 */

const registerSchema = async (contract: Contract, req: any, res: any) => {

  const newSchema: ISchema = req.body.newSchema;
  console.log(newSchema)

  const id = newSchema.schemaId

  console.log(`schema id: ${id}`)


  try{
    const exist = await contract.evaluateTransaction("AssetExists", id)
  
    if(exist.toString() === "false"){

      console.log("\nRegistering schema to the ledger\n")

      const newSchemaString = JSON.stringify(newSchema) 

      const result = await contract.submitTransaction("RegisterSchema", id, newSchemaString)
      
      res.send(result)

    } else {
      console.log(`Schema already exist for id: ${id}`)
      res.send({message: "Schema exist"})
    }
  } catch (error){
    console.log(error)
    res.send({message: "Failed"})
  }
}

export default registerSchema