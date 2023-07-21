const getDate = require('../../utils/getDate.js');
const getLandOwnerReq = require('./getLandOwnerReqByNid.js');

module.exports = {
  updateData: async (nid, contract, createTxn) => {
    let data = await getLandOwnerReq.getData(nid, contract);
    // key would be fetch from cookie of browser
    data = JSON.parse(data);
    const key = data[0].Record.Nid;
    const txId = data[0].Record.TxnId;
    const userId = data[0].Record.LandOwnerId;
    const landId = data[0].Record.LandId;
    const landLocation = data[0].Record.LandLocation;
    const landAmount = data[0].Record.LandAmount;
    const time = data[0].Record.ReqTime;

    const status = 'approved';
    try {
      let result = await contract.evaluateTransaction(
        'RequestLendLand',
        key,
        txId,
        userId,
        nid,
        landId,
        landLocation,
        landAmount,
        time,
        status
      );
      await contract.submitTransaction(
        'RequestLendLand',
        key,
        txId,
        userId,
        nid,
        landId,
        landLocation,
        landAmount,
        time,
        status
      );
      console.log(
        `Request lend land for user - ${userId} is successful.\n Result: ${result}\n`
      );
      createTxn(txId + '0', `Request Lend land by ${key}`, landLocation);
      res.send(result);
    } catch (error) {
      console.log(`*** Successfully caught the error: \n    ${error}\n`);
      res.send('failed');
    }
  },
};
