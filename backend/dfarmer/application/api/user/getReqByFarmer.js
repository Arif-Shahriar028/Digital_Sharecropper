module.exports = {
  getReq: async (req, res, contract) => {
    // API implementation
    const userId = req.params.userId;
    console.log('checkpoint 1');
    try {
      const result = await contract.evaluateTransaction(
        'GetRequestByFarmer',
        userId
      );
      console.log(result.toString());
      res.send(result.toString());
    } catch (error) {
      res.status(400).send('Req data not found');
    }
  },
};
