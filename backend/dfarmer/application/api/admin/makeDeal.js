module.exports = {
  makeDeal: async (req, res, contract, txId, createTxn) => {
    // API implementation
    const { landOwnerNid, landOwnerPhoneNo, farmerNid, farmerPhoneNo, landId, landAmount, harvestType} = req.body;
        const landownerId = `landowner_${landOwnerPhoneNo}`
        const farmerId = `farmer_${farmerPhoneNo}`
        const key = `deal_${landOwnerId}_${farmerId}_${landId}`
        try {
          let result = await contract.evaluateTransaction(
            'CreateDeal',
            key,
            txId,
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
            'CreateDeal',
            key,
            txId,
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
          console.log(`Creation of deal for - farmer: ${farmerId}, landowner: ${LandOwnerId} and land id: ${landId} is successful.\n Result: ${result}\n`);
          createTxn(txId, `Request Lend land by ${key}`, landlocation);
          res.send(result);
        } catch (error) {
          console.log(`*** Successfully caught the error: \n    ${error}\n`);
          res.send('failed');
        }
  },
};