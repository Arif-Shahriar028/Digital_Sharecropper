module.exports = {
  getAppointment: async (req, res, contract) => {
    // API implementation
    const key = req.params.key;
        console.log('key is:', key);
        try {
          const result = await contract.evaluateTransaction(
            'GetAppointment',
            key
          );
          res.send(result.toString());
        } catch (error) {
          res.status(400).send('Appointment data not found');
        }
  },
};