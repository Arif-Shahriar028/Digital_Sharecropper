module.exports = {
  getDealByFarmer: async (req, res, contract) => {
    // API implementation
    const userId = req.params.userId;
    try {
      const result = await contract.evaluateTransaction(
        'GetDealByFarmer',
        userId
      );
      res.send(result.toString());
    } catch (error) {
      res.status(400).send('Deal data not found');
    }
  },
};