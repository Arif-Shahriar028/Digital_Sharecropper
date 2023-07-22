module.exports = {
  registerUser: async (req, res, contract, txId, createTxn) => {
    // API implementation
    const { name, email, password, location } = req.body;

    const key = `${email}`;
    console.log(key);
    try {
      let result = await contract.evaluateTransaction(
        'CreateAgent',
        key,
        name,
        email,
        location,
        password
      );
      console.log('check point 1');
      await contract.submitTransaction(
        'CreateAgent',
        key,
        name,
        email,
        location,
        password
      );
      // const endorsedPayloads = endorsementResults.map(result => result.toString('utf8'));
      // console.log(endorsedPayloads);
      // console.log(`${userType} register Successful\n Result: ${result}\n`);
      // setCount(`${userType}`);
      // createTxn(txId, `${userType} registered`, name);
      res.send(result);
    } catch (error) {
      console.log(`*** Successfully caught the error: \n    ${error}\n`);
      res.send('failed');
    }
  },
};
