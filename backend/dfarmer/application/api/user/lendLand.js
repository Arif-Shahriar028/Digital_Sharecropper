module.exports = {
  lendLand: async (req, res, contract, txId, createTxn) => {
    // API implementation
    const { userId, landId, landLocation, landAmount, landType, ownerNid} = req.body;
        // key would be fetch from cookie of browser
        const key = `lendLand_${userId}_${landId}`
        try {
          let result = await contract.evaluateTransaction(
            'RequestLendLand',
            key,
            txId,
            userId,
            ownerNid,
            landId,
            landLocation,
            landAmount,
            landType
          );
          await contract.submitTransaction(
            'RequestLendLand',
            key,
            txId,
            userId,
            ownerNid,
            landId,
            landLocation,
            landAmount,
            landType
          );
          console.log(`Request lend land for user - ${userId} is successful.\n Result: ${result}\n`);
          createTxn(txId, `Request Lend land by ${key}`, landlocation);
          res.send(result);
        } catch (error) {
          console.log(`*** Successfully caught the error: \n    ${error}\n`);
          res.send('failed');
        }
  },
};