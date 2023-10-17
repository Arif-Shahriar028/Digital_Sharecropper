module.exports = {
  setAppointment: async (req, res, contract, txId, createTxn) => {
    // API implementation
    const { userId, agentId, appointmentTime, place } = req.body;
      // key would be fetch from cookie of browser
      const key = `$appointment_${userId}_${agentId}_${appointmentTime}`
      try {
        let result = await contract.evaluateTransaction(
          'SetAppointment',
          key,
          txId,
          userId,
          agentId,
          appointmentTime,
          place
        );
        await contract.submitTransaction(
          'SetAppointment',
          key,
          txId,
          userId,
          agentId,
          appointmentTime,
          place
        );
        console.log(`Appointment set for user - ${userId} is successful.\n Result: ${result}\n`);
        createTxn(txId, `Set Appointment ${key}`, place);
        res.send(result);
      } catch (error) {
        console.log(`*** Successfully caught the error: \n    ${error}\n`);
        res.send('failed');
      }
  },
};