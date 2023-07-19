/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const {
  buildCAClient,
  registerAndEnrollUser,
  enrollAdmin,
} = require('../../test-application/javascript/CAUtil.js');
const {
  buildCCPOrg1,
  buildWallet,
} = require('../../test-application/javascript/AppUtil.js');

const channelName = 'syschannel';
const chaincodeName = 'sysChaincode';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const getAllInvestmentApi = require('./api/admin/getAllInvestment.js');
const makeDealApi = require('./api/admin/makeDeal.js');
const getTransactionApi = require('./api/admin/getTransaction.js');

const getDealByLocationApi = require('./api/agent/getDealByLocation.js');
const requestDealApi = require('./api/agent/requestDeal.js');
const setAppointmentApi = require('./api/agent/setAppointment.js');

const registerApi = require('./api/user/createAccount.js');
const loginApi = require('./api/user/loginUser.js');
const getAppointmentDataApi = require('./api/user/getAppointmentData.js');
const getDataByInvestorApi = require('./api/user/getDataByInvestor.js');
const getDealByFarmerApi = require('./api/user/getDealByFarmer.js');
const getDealByLandownerApi = require('./api/user/getDealByLandowner.js');
const investReqApi = require('./api/user/investReq.js');
const lendLandApi = require('./api/user/lendLand.js');
const requestLandApi = require('./api/user/requestLand.js');
const updateProfileApi = require('./api/user/updateProfile.js');



function prettyJSONString(inputString) {
  return JSON.stringify(JSON.parse(inputString), null, 2);
}

async function main() {
  try {
    // build an in memory object with the network configuration (also known as a connection profile)
    const ccp = buildCCPOrg1();

    // build an instance of the fabric ca services client based on
    // the information in the network configuration
    const caClient = buildCAClient(
      FabricCAServices,
      ccp,
      'ca.org1.example.com'
    );

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(Wallets, walletPath);

    // in a real application this would be done on an administrative flow, and only once
    await enrollAdmin(caClient, wallet, mspOrg1);

    // in a real application this would be done only when a new user was required to be added
    // and would be part of an administrative flow
    await registerAndEnrollUser(
      caClient,
      wallet,
      mspOrg1,
      org1UserId,
      'org1.department1'
    );

    // Create a new gateway instance for interacting with the fabric network.
    // In a real application this would be done as the backend server session is setup for
    // a user that has been verified.
    const gateway = new Gateway();

    try {
      await gateway.connect(ccp, {
        wallet,
        identity: org1UserId,
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
      });

      // Build a network instance based on the channel where the smart contract is deployed
      const network = await gateway.getNetwork(channelName);

      // Get the contract from the network.
      const contract = network.getContract(chaincodeName);

      //*============== From here to start code ===================

      const app = express();
      app.use(cookieParser());
      app.use(express.json());
      app.use(bodyParser.urlencoded({ extended: true }));

      const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true, //access-control-allow-credentials:true
        optionSuccessStatus: 200,
      };
      app.use(cors(corsOptions));



      //*============== Register User ===================
      app.post('/register', async (req, res) => {
        const txId = getRandomString(18);
        await registerApi.registerUser(req, res, contract, txId, createTxn);
      });


      //*============== Login user ======================
      app.post('/login', async (req, res) => {
        const txId = getRandomString(18);
        await loginApi.login(req, res, contract, txId);
      });

      app.post('/update-profile', async (req, res) => {
        const txId = getRandomString(18);
        await .registerUser(req, res, contract, txId, createTxn);
      });

      //*====================== Farmer Request for land rent ========================
      app.post('/farmer/request-land', async (req, res) => {
        const txId = getRandomString(18);
        await requestLandApi.requestLand(req, res, contract, txId, createTxn);
      });


      //*================= Agent set appointment ======================
      app.post('/agent/set-appointment', async (req, res) => {
        const txId = getRandomString(18);
        await setAppointmentApi.setAppointment(req, res, contract, txId, createTxn);
      });


      //*================== Farmer and landowner get appointment ===================
      app.get('/user/get-appointment/:userId', async (req, res) => {
        await getAppointmentDataApi.getAppointment(req, res, contract);
        
      });


      //*================= Landowner request for land lend ======================
      app.post('/landowner/lend-land', async (req, res) => {
        const txId = getRandomString(18);
        await lendLandApi.lendLand(req, res, contract, txId, createTxn);
      });



      //*================= Agent requst a deal to admin ======================
      app.post('/agent/req-deal', async (req, res) => {
        const txId = getRandomString(18);
        await requestDealApi.requestDeal(req, res, contract, txId, createTxn);
      });


      //*===================== Admin create deal =======================
      app.post('/admin/make-deal', async (req, res) => {
        const txId = getRandomString(18);
        await makeDealApi.makeDeal(req, res, contract, txId, createTxn);
      });

      //*==================== Get Deal Info by farmer ====================
      app.get('/farmer/current-deal/:userId', async (req, res) => {
        await getDealByFarmerApi.getDealByFarmer(req, res, contract);
      });


      //*==================== Get Deal Info by landowner ====================
      app.get('/landowner/current-deal/:userId', async (req, res) => {
        await getDealByLandownerApi.getDealByLandOwner(req, res, contract);
        
      });


       //*===================== Investor request for invest =======================
       app.post('/investor/invest-req', async (req, res) => {
        const txId = getRandomString(18);
        await investReqApi.invest(req, res, contract, txId, createTxn);

      });


      //*================= Get investment details by investor =================
      app.get('/investor/investment/:userId', async (req, res) => {
        // const { nid } = req.body;
        await getDataByInvestorApi.getInvestData(req, res, contract);
        
      });


       //*================== Get All invest by admin ==================
       app.get('/admin/all-investment', async (req, res) => {
          await getAllInvestmentApi.getAllInvestment(req, res, contract);
      });


      app.get('/deal/:landLocation', async (req, res) => {
        await getDealByLocationApi.getDealByLocation(req, res, contract);
      });

      app.get('/transaction', async (req, res) => {
        await getTransactionApi.getTransaction(req, res, contract);
      });

      //*================== Set Count ====================
      app.post('/count', async (req, res) => {
        const { court, jail, passport, police, criminal } = req.body;
        const key = `count`;
        try {
          const result = await contract.evaluateTransaction(
            'SetCount',
            key,
            court,
            jail,
            passport,
            police,
            criminal
          );
          await contract.submitTransaction(
            'SetCount',
            key,
            court,
            jail,
            passport,
            police,
            criminal
          );
          res.send(result);
        } catch (error) {
          res.status(400).send('Count data not found');
        }
      });

      //*================== Get Count ==================
      app.get('/count', async (req, res) => {
        try {
          const result = await contract.evaluateTransaction('GetCount');

          res.send(result);
        } catch (error) {
          res.status(400).send(error.toString());
        }
      });

      //*=================== logout =======================
      app.get('/logout', async (req, res) => {
        try {
          res.cookie('user', '', { maxAge: -1, httpOnly: true });
          res.json({ status: 'you have successfully logged out' });
        } catch (error) {
          res.status(400).send(error.toString());
        }
      });

      

      //*================== Set Count =====================
      const setCount = async (org) => {
        try {
          let result = await contract.evaluateTransaction('GetCount');
          result = JSON.parse(result);
          let [
            {
              Record: { Court, Criminal, DocType, Jail, Key, Passport, Police },
            },
          ] = result;
          console.log(Court);
          if (org === 'court') {
            const val = Number(Court) + 1;
            Court = val.toString();
          } else if (org === 'jail') {
            let val = Number(Jail) + 1;
            Jail = val.toString();
          } else if (org === 'passport') {
            let val = Number(Passport) + 1;
            Passport = val.toString();
          } else if (org === 'police') {
            let val = Number(Police) + 1;
            Police = val.toString();
          } else if (org === 'criminal') {
            let val = Number(Criminal) + 1;
            Criminal = val.toString();
          }
          const key = `count`;
          try {
            const result = await contract.evaluateTransaction(
              'SetCount',
              key,
              Court,
              Jail,
              Passport,
              Police,
              Criminal
            );
            await contract.submitTransaction(
              'SetCount',
              key,
              Court,
              Jail,
              Passport,
              Police,
              Criminal
            );
            console.log(result.toString());
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      };

      //*================ Create Transaction ================
      const createTxn = async (txId, type, name) => {
        const today = new Date();
        const date = today.toLocaleDateString();
        const key = `${type}_${txId}`;
        const hours = today.getHours().toString().padStart(2, '0');
        const minutes = today.getMinutes().toString().padStart(2, '0');
        const seconds = today.getSeconds().toString().padStart(2, '0');
        const time = `${hours}:${minutes}:${seconds}`;
        try {
          const result = await contract.evaluateTransaction(
            'CreateTxn',
            key,
            txId,
            date,
            time,
            type,
            name
          );
          await contract.submitTransaction(
            'CreateTxn',
            key,
            txId,
            date,
            time,
            type,
            name
          );
          console.log('Txn: ', result.toString());
        } catch (error) {
          console.log(error);
        }
      };

      // //*=================== Get Transaction ===================
      // app.get('/transaction', async (req, res) => {
      //   try {
      //     const result = await contract.evaluateTransaction('GetTxn');

      //     res.send(result);
      //   } catch (error) {
      //     res.status(400).send(error.toString());
      //   }
      // });

      function getRandomString(length) {
        const characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
        return result;
      }

      app.listen(3001, () => {
        console.log('app is running on port 3001');
      });
    } finally {
      // Disconnect from the gateway when the application is closing
      // This will close all connections to the network
      //gateway.disconnect();
    }
  } catch (error) {
    console.error(`******** FAILED to run the application: ${error}`);
  }
}

main();
