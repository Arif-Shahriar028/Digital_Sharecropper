module.exports = {
  getUser: async (userId, contract) => {
    // API implementation
    try {
      const result = await contract.evaluateTransaction(
        'GetUser',
        userId
      );
      console.log(`get user result: ${result.toString()}`);
      return result.toString();
    } catch (error) {
      console.log(error);
    }
  },
};