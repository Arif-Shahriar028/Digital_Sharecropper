const getDate = require('../../utils/getDate.js');
const getFarmerReq = require('./getFarmerReqByNid.js');

module.exports = {
  updateData: async (nid, contract, createTxn) => {
    let data = await getFarmerReq.getData(nid, contract);
    data = JSON.parse(data);
    const key = data[0].Record.Key;
    const farmerId = data[0].Record.FarmerId;
    const name = data[0].Record.Name;
    const landLocation = data[0].Record.LandLocation;
    const harvestType = data[0].Record.harvestType;
    const landAmount = data[0].Record.LandAmount;
    const time = data[0].Record.ReqTime;
    const experience = data[0].Record.ExpTime;
    // const currDate = getDate.date();
    const status = 'approved';
    // key would be fetch from cookie of browser
    try {
      let result = await contract.evaluateTransaction(
        'RequestLand',
        key,
        userId,
        txId,
        name,
        nid,
        landLocation,
        harvestType,
        landAmount,
        time,
        experience,
        status
      );
      await contract.submitTransaction(
        'RequestLand',
        key,
        userId,
        txId,
        name,
        nid,
        landLocation,
        harvestType,
        landAmount,
        time,
        experience,
        status
      );
      console.log(
        `Request for land request by ${name} is successful.\n Result: ${result}\n`
      );
      createTxn(txId + '0', `Land Request by ${key} `, landLocation);
      res.send(result);
    } catch (error) {
      console.log(`*** Successfully caught the error: \n    ${error}\n`);
      res.send('failed');
    }
  },
};
