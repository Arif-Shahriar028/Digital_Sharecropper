module.exports = {
  getData: async (nid, contract) => {
    // API implementation
    console.log(`nid: ${nid}`);
    try {
      const result = await contract.evaluateTransaction(
        'GetLandOwnerReqByNid',
        nid
      );
      console.log(`requested data : ${result.toString()}`);
      return result.toString();
    } catch (error) {
      return error;
    }
  },
};
