module.exports = {
  getInvestData: async (req, res, contract) => {
    // API implementation
    const userId = req.params.userId;
    try {
      const result = await contract.evaluateTransaction(
        'GetInvestment',
        userId
      );
      res.send(result.toString());
    } catch (error) {
      res.status(400).send('Investment data not found');
    }
  },
};