module.exports = {
  getData: async (req, res, contract) => {
    // API implementation
    try {
      const result = await contract.evaluateTransaction('GetAllDealRequest');

      res.send(result);
    } catch (error) {
      res.status(400).send(error.toString());
    }
  },
};
