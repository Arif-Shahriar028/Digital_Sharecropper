const reqDealApi = require('../user/getDealReqByLandId.js');
const updateFarmerReq = require('./updateFarmerReq.js');
const updateLandOwnerReq = require('./updateLandOwnerReq.js');

module.exports = {
  makeDeal: async (req, res, contract, txId, createTxn) => {
    // API implementation
    const { landId } = req.body;

    console.log(`land id : ${landId}`);

    const data = await reqDealApi.getDealReq(landId, contract);
    const reqDeal = JSON.parse(data);

    const agentId = reqDeal[0].Record.AgentId;
    const landOwnerNid = reqDeal[0].Record.LandOwnerNid;
    const farmerNid = reqDeal[0].Record.FarmerNid;
    const landAmount = reqDeal[0].Record.LandAmount;
    const txId_ = reqDeal[0].Record.TxnId;
    const time = reqDeal[0].Record.ReqTime;
    const status = 'approved';

    console.log(
      `req deal ${agentId}, ${farmerNid}, ${landOwnerNid}, ${landAmount}, ${txId_}`
    );

    await updateFarmerReq.updateData(farmerNid, contract, createTxn);
    await updateLandOwnerReq.updateData(landOwnerNid, contract, createTxn);
    await updateReqDeal(
      contract,
      txId_,
      agentId,
      landOwnerNid,
      farmerNid,
      landId,
      landAmount,
      time,
      status
    );

    const key = `deal_${landOwnerNid}_${farmerNid}_${landId}`;
    try {
      let result = await contract.evaluateTransaction(
        'CreatDeal',
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
        'CreatDeal',
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
        `Creation of deal for - farmer: ${farmerNid}, landowner: ${landOwnerNid} and land id: ${landId} is successful.\n Result: ${result}\n`
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
  contract,
  txId,
  agentId,
  landOwnerNid,
  farmerNid,
  landId,
  landAmount,
  time,
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
      time,
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
      time,
      status
    );
    console.log(
      `Request lend land for user - ${userId} is successful.\n Result: ${result}\n`
    );
    createTxn(txId, `Request deal by agent: ${agentId}`, landlocation);
    return result;
  } catch (error) {
    console.log(`*** Successfully caught the error: \n    ${error}\n`);
    return error;
  }
};
