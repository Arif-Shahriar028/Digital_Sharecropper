module.exports = {
  getData: async (req, res, contract) => {
    // API implementation
    const landLocation = req.params.location;
    try {
      const result = await contract.evaluateTransaction(
        'GetFarmerReqByLocation',
        landLocation
      );
      res.send(result.toString());
    } catch (error) {
      res.status(400).send('Requested data not found');
    }
  },
};
