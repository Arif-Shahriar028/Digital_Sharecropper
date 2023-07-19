const getUserApi = require('./getUser.js');

module.exports = {
  lendLand: async (req, res, contract, txId, createTxn) => {
    // API implementation
    const { userId, landId, landLocation, landAmount } = req.body;
    // key would be fetch from cookie of browser
    const data = await getUserApi.getUser(userId, contract);
    const user = JSON.parse(data);
    console.log(`checkpoint 1 user: ${user}`);
    const nid = user[0].Record.Nid;

    const key = `lendLand_${userId}_${landId}`;
    try {
      let result = await contract.evaluateTransaction(
        'RequestLendLand',
        key,
        txId,
        userId,
        nid,
        landId,
        landLocation,
        landAmount
      );
      await contract.submitTransaction(
        'RequestLendLand',
        key,
        txId,
        userId,
        nid,
        landId,
        landLocation,
        landAmount
      );
      console.log(
        `Request lend land for user - ${userId} is successful.\n Result: ${result}\n`
      );
      createTxn(txId, `Request Lend land by ${key}`, landLocation);
      res.send(result);
    } catch (error) {
      console.log(`*** Successfully caught the error: \n    ${error}\n`);
      res.send('failed');
    }
  },
};
