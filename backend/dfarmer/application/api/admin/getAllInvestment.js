module.exports = {
  getAllInvestment: async (req, res, contract) => {
    // API implementation
    try {
      const result = await contract.evaluateTransaction('GetAllInvestment');

      res.send(result);
    } catch (error) {
      res.status(400).send(error.toString());
    }
  },
};