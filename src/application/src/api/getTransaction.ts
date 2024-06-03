import { Contract } from "fabric-network";

/**
 * @param contract
 * @param req 
 * @param res 
 * @method getTransaction
 * 
 * Validate formate of id (string)
 */

const getTransaction = async (contract: Contract, req: any, res: any) => {
  const {id} = req.body

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

    res.send(result.toString())
  }
  catch(error){
    console.log("Error")
    res.status(400).send(error)
  }
}

export default getTransaction