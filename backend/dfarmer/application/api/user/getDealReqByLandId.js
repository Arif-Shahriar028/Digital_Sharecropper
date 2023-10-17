module.exports = {
  getDealReq: async (landId, contract) => {
    // API implementation
    try {
      const result = await contract.evaluateTransaction(
        'GetDealReqByLandId',
        landId
      );
      console.log(`get deal-req result: ${result.toString()}`);
      return result.toString();
    } catch (error) {
      console.log(error);
    }
  },
};
