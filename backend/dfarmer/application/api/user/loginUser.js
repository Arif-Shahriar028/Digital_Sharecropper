module.exports = {
  login: async (req, res, contract) => {
    // API implementation
    const { phoneNo, password} = req.body;
        const key = `${phoneNo}`;
        try {
          let result = await contract.evaluateTransaction(
            'FindUser',
            key,
            phoneNo,
            password
          );

          const userInfo = JSON.parse(result.toString());
          console.log(
            `========== user infor: ${JSON.stringify(userInfo)} ============`
          );
          res.cookie('user', userInfo, {
            maxAge: 3600_000,
            httpOnly: false,
          });
          // console.log(`cookie data : ${res.cookie.user}`);
          console.log(userInfo.Key);
          res.send(result.toString());
        } catch (error) {
          res.status(400).json({
            error: error.toString(),
          });
        }
  },
};