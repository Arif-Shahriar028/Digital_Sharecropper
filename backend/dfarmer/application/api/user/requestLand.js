const getUserApi = require('./getUser.js');

module.exports = {
  requestLand: async (req, res, contract, txId, createTxn) => {
    const { userId, landAmount, landLocation, experience } = req.body;

    const data = await getUserApi.getUser(userId, contract);
    const user = JSON.parse(data);
    console.log(`checkpoint 1 user: ${user}`);
    const nid = user[0].Record.Nid;
    const name = user[0].Record.Name;
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
        landAmount,
        experience
      );
      await contract.submitTransaction(
        'RequestLand',
        key,
        userId,
        txId,
        name,
        nid,
        landLocation,
        landAmount,
        experience
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
