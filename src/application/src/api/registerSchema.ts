import { Contract } from "fabric-network";

const registerSchema = async (contract: Contract, req: any, res: any) => {

  // const {schemaResult} = req.body;
  // console.log(schemaResult)

  // const schemaJson = JSON.parse(schemaResult)
  // const id = schemaJson.schemaId

  // console.log(`schema id: ${id}`)

  const schemaResult = "schema"
  const id = "1" 

  try{
    let result = await contract.evaluateTransaction("RegisterSchema", id, schemaResult)

    if(!result){
      await contract.submitTransaction("RegisterSchema", id, schemaResult)
    }else{
      console.log(`Schema already exist. Founded shcema is: ${result}`)
    }
  }catch(error){
    console.log(error)
  }
}

export default registerSchema