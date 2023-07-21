module.exports = {
  getData: async (req, res, contract) => {
    // API implementation
    const landLocation = req.params.location;
    console.log(landLocation);
    try {
      const result = await contract.evaluateTransaction(
        'GetFarmerReqByLocation',
        landLocation
      );
      res.send(result.toString());
    } catch (error) {
      console.log(error);
      res.status(400).send('Requested data not found');
    }
  },
};
