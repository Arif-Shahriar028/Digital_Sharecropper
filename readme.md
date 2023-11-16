# Digital Sharecropper

Welcome to Digital Sharecropper github repo. To run the project follow the following commands.

## Clone the repo

First, clone the repo to your local system:

`git clone https://github.com/Hasibul-Islam-Shanto/olympiad.git`

## To run backend:

### Open terminal and change directory to `olympiad/backend/` and run following command:

- Download fabric binary files script:

  `curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh`

- Run script to download binaries

  `./install-fabric.sh docker binary`

- Give excution permission to all .sh files:

  `find . -type f -name "*.sh" -exec chmod +x {} \;`

### Now open terminal in root and run command:

`sudo usermod -aG docker user_name`

`sudo chmod -R 755 path-of-project/backend`

** if all process above done once then no necessary to do it again **

### Now, open terminal and change directory to `/backend/test-network`

1. Stop the network:
   `sudo ./network.sh down`
2. Start test network:
   `sudo ./network.sh createChannel -ca -c syschannel -s couchdb`
3. Deploy Chanicode:
   `sudo ./network.sh deployCC -ccn sysChaincode -ccp ../dfarmer/chaincode/ -ccl javascript`

**(After completion of deploying chaincode)**

4. Run express server: Open terminal on `backend/dfarmer/application` and then:

   `npm i`

   `node app.js`

\*\* If you kill the process or restart the network then, start form process 1. Before running `node app.js`, delete files under _wallet_ folder located in `backend/dfarmer/application/wallet`

---

## To run frontend:

1. Open a terminal on frontend directory and run:

   `npm install -g yarn`

   `npm install -g json-server`

   `yarn install`

   `yarn dev`

2. Open another terminal on frontend directory and run:

   ` json-server --watch db.json --port 4000`

### Generate admin and agent profile using manual POST request.

For that, (to avoid postman)

1. Install a extension in VSCode named REST Client (id: humao.rest-client)

2. Then open api-test.rest file located in `/backend/dfarmer/application/api-test.rest`

3. Now click the send requet option shown in the file.
   By this process admin and agent will be created.

---

Now, the system is ready to use. The website is running on localhost:3000 port

**To check couchdb:**
`http://localhost:5984/_utils/`
username: admin
pass: adminpw
