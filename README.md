## To run the fabric-api:

### Open terminal and change directory to project root and run following command:

- Download fabric binary file download sript:
  `curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh`
- Run download script
  `./install-fabric.sh docker binary`
- Give excution permission to all .sh files:
  `find . -type f -name "*.sh" -exec chmod +x {} \;`

### Now open terminal in root and run command:

`sudo usermod -aG docker user_name`
`sudo chmod -R 755 path-of-project`

** if all process above done once then no necessary to do it again **

### Now, open terminal and change directory to backend/test-network

1. Stop the network:
   `./network.sh down`
2. Start the network:
   `./network.sh up -ca`
3. Start test network:
   `./network.sh createChannel -ca -c syschannel -s couchdb`
4. Deploy Chanicode:
   `./network.sh deployCC -ccn manageIdentity -ccp ../src/chaincode/ -ccl typescript`

**(After completion of deploying chaincode)**

5. Run express server: Open terminal on "root_directory/src/application" and then:
   `npm install`
   `npx ts-node server.ts`

**To check couchdb:**
`http://localhost:5984/_utils/`
username: admin
pass: adminpw
