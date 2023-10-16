## To run backend:

### Open terminal and change directory to project/backend/ and run following command:
* Download fabric binary file download sript:
```curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh``` 
* Run download script
```./install-fabric.sh docker binary```
* Give excution permission to all .sh files: 
```find . -type f -name "*.sh" -exec chmod +x {} \;```


### Now open terminal in root and run command:
```sudo usermod -aG docker user_name```
```sudo chmod -R 755 path-of-project/backend```

** if all process above done once then no necessary to do it again **

### Now, open terminal and change directory to backend/test-network
1. Stop the network:
```sudo ./network.sh down```
2. Start the network:
```sudo ./network.sh up -ca```
3. Start test network:
```sudo ./network.sh createChannel -ca -c syschannel -s couchdb```
4. Deploy Chanicode:
```sudo ./network.sh deployCC -ccn sysChaincode -ccp ../dfarmer/chaincode/ -ccl javascript```

**(After completion of deploying chaincode)**
5. Run express server:  Open terminal on "backend/dfarmer/application" and then:
```npm i```
```node app.js```


**To check couchdb:**
```http://localhost:5984/_utils/```
 username: admin
pass: adminpw


