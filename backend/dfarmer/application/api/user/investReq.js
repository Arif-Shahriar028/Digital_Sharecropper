module.exports = {
  invest: async (req, res, contract, txId, createTxn) => {
    // API implementation
    const { userId, name, nid, investAmount } = req.body;
         const key = `invest_${userId}`
        
        try {
          let result = await contract.evaluateTransaction(
            'RequestInvest',
            key,
            txId,
            userId,
            name, 
            nid, 
            investAmount 
          );
          await contract.submitTransaction(
            'RequestInvest',
            key,
            txId,
            userId,
            name, 
            nid, 
            investAmount 
          );
          console.log(`Request invest by - investor: ${userId}, amount: ${investAmount} is successful.\n Result: ${result}\n`);
          createTxn(txId, `Request invest ${userId}`, investAmount);
          res.send(result);
        } catch (error) {
          console.log(`*** Successfully caught the error: \n    ${error}\n`);
          res.send('failed');
        }
  },
};