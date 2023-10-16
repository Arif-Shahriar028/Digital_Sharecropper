module.exports = {
  login: async (req, res, contract) => {
    // API implementation
    const { email, password } = req.body;
    const key = `${email}`;
    try {
      let result = await contract.evaluateTransaction(
        'FindUser',
        key,
        email,
        password
      );

      const userInfo = JSON.parse(result.toString());
      console.log(
        `========== user infor: ${JSON.stringify(userInfo)} ============`
      );
      res.cookie('admin', userInfo, {
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
