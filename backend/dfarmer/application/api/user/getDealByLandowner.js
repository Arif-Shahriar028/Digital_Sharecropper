module.exports = {
  getDealByLandOwner: async (req, res, contract, txId) => {
    // API implementation
    const userId = req.params.userId;
    try {
      const result = await contract.evaluateTransaction(
        'GetDealByLandOwner',
        userId
      );
      res.send(result.toString());
    } catch (error) {
      res.status(400).send('Deal data not found');
    }
  },
};