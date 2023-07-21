module.exports = {
  date: () => {
    const currentDate = new Date();

    // Get the current year, month, day, hours, minutes, and seconds
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // January is 0, so we add 1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    return `${day}-${month}-${year}`;
  },
};
