import { Contract } from "fabric-network";
import { ICredDef } from "../utils/Types";

/** 
 * @param contract
 * @param req 
 * @param res 
 * @method registerCredentialDef 
 * Check duplicacy of credential definition
 * Handle credential definition format and id format
 * Asset key will be credential definition id
 */

const registerCredentialDef = async (contract: Contract, req: any, res: any) => {
  const newCredDef: ICredDef = req.body.newCredDef;

  const id = newCredDef.credentialDefinitionId

  console.log(`credental definition id: ${id}`)

  try{
    const exist = await contract.evaluateTransaction("AssetExists", id)

    if(exist.toString() === "false"){

      console.log("\n Registering Credential Definition to the ledger \n")

      const newCredDefString = JSON.stringify(newCredDef)
      const result = await contract.submitTransaction("RegisterCredentialDef", id, newCredDefString)

      res.send(result)

    }else{
      console.log(`Credential Definition already exist for id: ${id}`)
      res.send({message: "Credential definition exist"})
    }
  }catch(error){
    console.log(error)
    res.send({message: "Failed"})
  }
}

export default registerCredentialDef