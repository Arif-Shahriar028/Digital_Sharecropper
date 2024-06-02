import { Contract } from "fabric-network";
import { prettyJSONString } from "./utils/AppUtil";
import getContract from "./utils/contract"

const run = async() => {

  const contract:Contract = await getContract()

  console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
  await contract.submitTransaction('InitLedger');
  console.log('*** Result: committed');

  // Let's try a query type operation (function).
  // This will be sent to just one peer and the results will be shown.
  console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
  let result = await contract.evaluateTransaction('GetAllAssets');
  console.log(`*** Result: ${prettyJSONString(result.toString())}`);

  // Now let's try to submit a transaction.
  // This will be sent to both peers and if both peers endorse the transaction, the endorsed proposal will be sent
  // to the orderer to be committed by each of the peer's to the channel ledger.
  console.log('\n--> Submit Transaction: CreateAsset, creates new asset with ID, color, owner, size, and appraisedValue arguments');
  await contract.submitTransaction('CreateAsset', 'asset413', 'yellow', '5', 'Tom', '1300');
  console.log('*** Result: committed');

  console.log('\n--> Evaluate Transaction: ReadAsset, function returns an asset with a given assetID');
  result = await contract.evaluateTransaction('ReadAsset', 'asset413');
  console.log(`*** Result: ${prettyJSONString(result.toString())}`);

  console.log('\n--> Evaluate Transaction: AssetExists, function returns "true" if an asset with given assetID exist');
  result = await contract.evaluateTransaction('AssetExists', 'asset1');
  console.log(`*** Result: ${prettyJSONString(result.toString())}`);

  console.log('\n--> Submit Transaction: UpdateAsset asset1, change the appraisedValue to 350');
  await contract.submitTransaction('UpdateAsset', 'asset1', 'blue', '5', 'Tomoko', '350');
  console.log('*** Result: committed');

  console.log('\n--> Evaluate Transaction: ReadAsset, function returns "asset1" attributes');
  result = await contract.evaluateTransaction('ReadAsset', 'asset1');
  console.log(`*** Result: ${prettyJSONString(result.toString())}`);

  try {
      // How about we try a transactions where the executing chaincode throws an error
      // Notice how the submitTransaction will throw an error containing the error thrown by the chaincode
      console.log('\n--> Submit Transaction: UpdateAsset asset70, asset70 does not exist and should return an error');
      await contract.submitTransaction('UpdateAsset', 'asset70', 'blue', '5', 'Tomoko', '300');
      console.log('******** FAILED to return an error');
  } catch (error) {
      console.log(`*** Successfully caught the error: \n    ${error}`);
  }

  console.log('\n--> Submit Transaction: TransferAsset asset1, transfer to new owner of Tom');
  await contract.submitTransaction('TransferAsset', 'asset1', 'Tom');
  console.log('*** Result: committed');

  console.log('\n--> Evaluate Transaction: ReadAsset, function returns "asset1" attributes');
  result = await contract.evaluateTransaction('ReadAsset', 'asset1');
  console.log(`*** Result: ${prettyJSONString(result.toString())}`);
}

void run()