import { Contract } from "fabric-network";

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
  const {credentialDefinition} = req.body;

  const credentialDefJson = JSON.parse(credentialDefinition)
  const id = credentialDefJson.credentialDefinitionId

  try{
    const exist = await contract.evaluateTransaction("AssetExists", id)

    if(exist.toString() === "false"){
      console.log("\n Registering Credential Definition to the ledger \n")
      const result = await contract.submitTransaction("RegisterCredentialDef", id, credentialDefinition)
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