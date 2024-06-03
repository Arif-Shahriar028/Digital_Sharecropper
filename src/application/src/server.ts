import { Contract } from "fabric-network";
import getContract from "./utils/contract"
import express from 'express';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import registerSchema from "./api/registerSchema";
import registerCredentialDef from "./api/registerCredentialDef";
import getTransaction from "./api/getTransaction";

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

  server.post("/endorser/register-schema", async (req, res)=>{
    await registerSchema(contract, req, res)
  })

  server.post("/endorser/register-cred-def", async (req, res) => {
    await registerCredentialDef(contract, req, res)
  })

  server.get("/transaction", async (req, res)=>{
    await getTransaction(contract, req, res)
  })

  server.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
  })
  
}

void run()