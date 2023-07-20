// const getUserApi = require('../user/getUser.js');

module.exports = {
  requestDeal: async (req, res, contract, txId, createTxn) => {
    // API implementation
    const { agentId, landOwnerNid, farmerNid, landId, landAmount } = req.body;
    // const data1 = await getUserApi.getUser(farmerNid, contract);
    // const farmer = JSON.parse(data1);
    // const farmerPhoneNo = farmer[0].Record.PhoneNo;
    const key = `req_deal_${landOwnerNid}_${farmerNid}_${landId}`;
    const status = 'pending';
    try {
      let result = await contract.evaluateTransaction(
        'RequestDeal',
        key,
        txId,
        agentId,
        landOwnerNid,
        farmerNid,
        landId,
        landAmount,
        status
      );
      await contract.submitTransaction(
        'RequestDeal',
        key,
        txId,
        agentId,
        landOwnerNid,
        farmerNid,
        landId,
        landAmount,
        status
      );
      console.log(
        `Request lend land for user - ${userId} is successful.\n Result: ${result}\n`
      );
      createTxn(txId, `Request deal by agent: ${agentId}`, landlocation);
      res.send(result);
    } catch (error) {
      console.log(`*** Successfully caught the error: \n    ${error}\n`);
      res.send('failhttp://localhost:5173/ed');
    }
  },
};
