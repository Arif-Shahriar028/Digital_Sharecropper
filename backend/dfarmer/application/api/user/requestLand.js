const getUserApi = require('./getUser.js');
const getDate = require('../../utils/getDate.js');

module.exports = {
  requestLand: async (req, res, contract, txId, createTxn) => {
    const { userId, landAmount, harvestType, landLocation, experience } =
      req.body;

    const data = await getUserApi.getUser(userId, contract);
    const user = JSON.parse(data);
    const nid = user[0].Record.Nid;
    const name = user[0].Record.Name;
    const currDate = getDate.date();
    const status = 'pending';

    // key would be fetch from cookie of browser
    const key = `requestland_${userId}`;
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
        currDate,
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
        currDate,
        experience,
        status
      );
      console.log(
        `Request for land request by ${name} is successful.\n Result: ${result}\n`
      );
      createTxn(txId, `Land Request by ${key} `, landLocation);
      res.send(result);
    } catch (error) {
      console.log(`*** Successfully caught the error: \n    ${error}\n`);
      res.send('failed');
    }
  },
};
