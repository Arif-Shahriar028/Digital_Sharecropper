// const getUserApi = require('../user/getUser.js');
const getDate = require('../../utils/getDate.js');

module.exports = {
  requestDeal: async (req, res, contract, txId, createTxn) => {
    // API implementation
    const { agentId, landOwnerNid, farmerNid, landId, landAmount } = req.body;
    // const data1 = await getUserApi.getUser(farmerNid, contract);
    // const farmer = JSON.parse(data1);
    // const farmerPhoneNo = farmer[0].Record.PhoneNo;
    const key = `req_deal_${landOwnerNid}_${farmerNid}_${landId}`;
    const status = 'pending';
    const currDate = getDate.date();

    try {
      console.log(
        `${key}, ${currDate}, ${txId}, ${status}, ${agentId}, ${landOwnerNid}, ${farmerNid}, ${landAmount}, ${landId}`
      );
      let result = await contract.evaluateTransaction(
        'RequestDeal',
        key,
        txId,
        agentId,
        landOwnerNid,
        farmerNid,
        landId,
        landAmount,
        currDate,
        status
      );
      // console.log(result);
      await contract.submitTransaction(
        'RequestDeal',
        key,
        txId,
        agentId,
        landOwnerNid,
        farmerNid,
        landId,
        landAmount,
        currDate,
        status
      );
      console.log(
        `Request deal for user - ${agentId} is successful.\n Result: ${result}\n`
      );
      createTxn(txId, `Request deal by agent: ${agentId}`, landId);
      res.send(result);
    } catch (error) {
      console.log(`*** Successfully caught the error: \n    ${error}\n`);
      res.send('failhttp://localhost:5173/ed');
    }
  },
};
