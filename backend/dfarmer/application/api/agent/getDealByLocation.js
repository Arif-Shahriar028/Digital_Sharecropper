module.exports = {
  getDealByLocation: async (req, res, contract) => {
    // API implementation
    try {
      const result = await contract.evaluateTransaction(
        'GetDealByLocation',
        landLocation
      );
      res.send(result.toString());
    } catch (error) {
      res.status(400).send('Deal data not found');
    }
  },
};