module.exports = {
  getData: async (nid, contract) => {
    // API implementation
    try {
      const result = await contract.evaluateTransaction(
        'GetLandOwnerReqByNid',
        nid
      );
      console.log(result.toString());
      return result.toString();
    } catch (error) {
      res.status(400).send('Req data not found');
    }
  },
};
