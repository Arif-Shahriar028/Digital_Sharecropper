const getDate = require('../../utils/getDate.js');

module.exports = {
  invest: async (req, res, contract, txId, createTxn) => {
    // API implementation
    const { userId, name, nid, investAmount } = req.body;
    const key = `invest_${userId}`;
    console.log(req.body);
    console.log(`${key}`);
    const currDate = getDate.date();
    const transactionId = 'null';
    try {
      let result = await contract.evaluateTransaction(
        'RequestInvest',
        key,
        txId,
        userId,
        name,
        nid,
        investAmount,
        transactionId,
        currDate
      );
      console.log('checkpoint 2');
      await contract.submitTransaction(
        'RequestInvest',
        key,
        txId,
        userId,
        name,
        nid,
        investAmount,
        transactionId,
        currDate
      );
      console.log('checkpoint 2');
      console.log(
        `Request invest by - investor: ${userId}, amount: ${investAmount} is successful.\n Result: ${result}\n`
      );
      createTxn(txId, `Request invest ${userId}`, investAmount);
      res.send(result.toString());
    } catch (error) {
      console.log(`*** Successfully caught the error: \n    ${error}\n`);
      res.send('failed');
    }
  },
};
