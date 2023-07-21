const reqDealApi = require('../user/getDealReqByLandId.js');
const updateFarmerReq = require('./updateFarmerReq.js');
const updateLandOwnerReq = require('./updateLandOwnerReq.js');

module.exports = {
  makeDeal: async (req, res, contract, txId, createTxn) => {
    // API implementation
    const { landId } = req.body;

    const data = await reqDealApi.getDealReq(landId, contract);
    const reqDeal = JSON.parse(data);
    const agentId = reqDeal[0].Record.AgentId;
    const landOwnerNid = reqDeal[0].Record.LandOwnerNid;
    const farmerNid = reqDeal[0].Record.FarmerNid;
    const landAmount = reqDeal[0].Record.LandAmount;
    const txId_ = reqDeal[0].Record.TxnId;
    const status = 'approved';

    await updateReqDeal(
      txId_,
      agentId,
      landOwnerNid,
      farmerNid,
      landId,
      landAmount,
      status
    );

    await updateFarmerReq.updateData(farmerNid, contract, createTxn);
    await updateLandOwnerReq.updateData(landOwnerNid, contract, createTxn);

    const key = `deal_${landOwnerNid}_${farmerNid}_${landId}`;
    try {
      let result = await contract.evaluateTransaction(
        'CreateDeal',
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
        'CreateDeal',
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
        `Creation of deal for - farmer: ${farmerId}, landowner: ${LandOwnerId} and land id: ${landId} is successful.\n Result: ${result}\n`
      );
      createTxn(txId, `Request Lend land by ${key}`, landlocation);
      res.send(result);
    } catch (error) {
      console.log(`*** Successfully caught the error: \n    ${error}\n`);
      res.send('failed');
    }
  },
};

const updateReqDeal = async (
  txId,
  agentId,
  landOwnerNid,
  farmerNid,
  landId,
  landAmount,
  status
) => {
  const key = `req_deal_${landOwnerNid}_${farmerNid}_${landId}`;
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
};
