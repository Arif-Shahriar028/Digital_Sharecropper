module.exports = {
  requestLand: async (req, res, contract, txId, createTxn) => {
    // API implementation
    const { userId, name, landUnit, landLocation, experience, nid } = req.body;
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
        txId,
        name,
        nid,
        landLocation,
        landAmount,
        experience
      );
      console.log(`Request for land request by ${name} is successful.\n Result: ${result}\n`);
      createTxn(txId, `Land Request by ${key} `, landLocation);
      res.send(result);
    } catch (error) {
      console.log(`*** Successfully caught the error: \n    ${error}\n`);
      res.send('failed');
    }
  },
};