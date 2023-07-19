module.exports = {
  requestDeal: async (req, res, contract, txId, createTxn) => {
    // API implementation
    const { agentId, landOwnerNid, landOwnerPhoneNo, farmerNid, farmerPhoneNo, landId, landAmount, harvestType} = req.body;
        const landownerId = `landowner_${landOwnerPhoneNo}`
        const farmerId = `farmer_${farmerPhoneNo}`
        const key = `req_deal_${landOwnerId}_${farmerId}_${landId}`
        try {
          let result = await contract.evaluateTransaction(
            'RequestDeal',
            key,
            txId,
            agentId,
            landOwnerId,
            farmerId, 
            landOwnerNid, 
            landOwnerPhoneNo, 
            farmerNid, 
            farmerPhoneNo, 
            landId, 
            landAmount, 
            harvestType
          );
          await contract.submitTransaction(
            'RequestDeal',
            key,
            txId,
            agentId,
            landOwnerId,
            farmerId, 
            landOwnerNid, 
            landOwnerPhoneNo, 
            farmerNid, 
            farmerPhoneNo, 
            landId, 
            landAmount, 
            harvestType
          );
          console.log(`Request lend land for user - ${userId} is successful.\n Result: ${result}\n`);
          createTxn(txId, `Request deal by agent: ${agentId}`, landlocation);
          res.send(result);
        } catch (error) {
          console.log(`*** Successfully caught the error: \n    ${error}\n`);
          res.send('failed');
        }
  },
};