module.exports = {
  getAppointment: async (req, res, contract) => {
    // API implementation
    const userId = req.params.userId;
        console.log('key is:', userId);
        try {
          const result = await contract.evaluateTransaction(
            'GetAppointment',
            userId
          );
          res.send(result.toString());
        } catch (error) {
          res.status(400).send('Appointment data not found');
        }
  },
};