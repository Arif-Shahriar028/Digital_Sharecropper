module.exports = {
  updateProfile: async (req, res, contract, txId, createTxn) => {
    // API implementation
    const { name, phoneNo, nid, password, userType} = req.body;

    const key = `${phoneNo}`;
    console.log(key)
    try {
      let result = await contract.evaluateTransaction(
        'CreateAccount',
        key,
        txId,
        name,
        phoneNo,
        nid, 
        userType,
        password
      );
      console.log('check point 1')
      await contract.submitTransaction(
        'CreateAccount',
        key,
        txId,
        name,
        phoneNo,
        nid,
        userType,
        password
      );
      // const endorsedPayloads = endorsementResults.map(result => result.toString('utf8'));
      // console.log(endorsedPayloads);
      console.log(`${userType} register Successful\n Result: ${result}\n`);
      // setCount(`${userType}`);
      createTxn(txId, `${userType} registered`, name);
      res.send(result);
    } catch (error) {
      console.log(`*** Successfully caught the error: \n    ${error}\n`);
      res.send('failed');
    }
  },
};