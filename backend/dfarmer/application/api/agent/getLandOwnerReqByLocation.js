module.exports = {
  getData: async (req, res, contract) => {
    // API implementation
    const landLocation = req.params.location;
    console.log(landLocation);
    try {
      const result = await contract.evaluateTransaction(
        'GetLandOwnerReqByLocation',
        landLocation
      );
      console.log('Land owner land' + result);
      res.send(result.toString());
    } catch (error) {
      res.status(400).send('Requested data not found');
    }
  },
};
