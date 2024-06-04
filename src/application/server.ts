import { Contract } from "fabric-network";
import getContract from "./src/utils/contract"
import express from 'express';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import registerSchema from "./src/api/registerSchema";
import registerCredentialDef from "./src/api/registerCredentialDef";
import getTransaction from "./src/api/getTransaction";
import retrieveSchema from "./src/api/retrieveSchema";
import retrieveCredDef from "./src/api/retrieveCredDef";

const PORT = 3009;

const run = async() => {

  const contract:Contract = await getContract()

  const server = express();
  server.use(cookieParser())
  server.use(express.json())
  server.use(bodyParser.urlencoded({extended: true}))

  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
  server.use(cors(corsOptions));

  server.post("/storeSchema", async (req, res)=>{
    await registerSchema(contract, req, res)
  })

  server.get("/getSchemas", async (req, res)=>{
    await retrieveSchema(contract, req, res)
  })

  server.post("/storeCredentialDefinition", async (req, res) => {
    await registerCredentialDef(contract, req, res)
  })

  server.get("/getCredentialDefinitions",async (req, res) => {
    await retrieveCredDef(contract, req, res)    
  })

  server.get("/transaction", async (req, res)=>{
    await getTransaction(contract, req, res)
  })

  server.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
  })
  
}

void run()