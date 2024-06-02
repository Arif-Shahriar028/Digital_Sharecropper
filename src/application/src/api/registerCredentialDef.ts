import { Contract } from "fabric-network";

const registerCredentialDef = async (contract: Contract, req: any, res: any) => {
  const {credentialDefinition} = req.body;

  const credentialDefJson = JSON.parse(credentialDefinition)
  const id = credentialDefJson.credentialDefinitionId

  try{
    let result = await contract.evaluateTransaction("RegisterCredentialDef", id, credentialDefinition)

    if(!result){
      await contract.submitTransaction("RegisterCredentialDef", id, credentialDefinition)
    }else{
      console.log(`Credential Definition already exist. Founded credential defition is: ${result}`)
    }
  }catch(error){
    console.log(error)
  }
}

export default registerCredentialDef