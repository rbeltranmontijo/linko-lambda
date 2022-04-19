const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordEncrypted = await bcrypt.hash(password, salt);
  return passwordEncrypted;
};

const comparePassword = async (password, receivedPassword) => {
  return bcrypt.compare(password, receivedPassword);
};

module.exports = {
  encryptPassword,
  comparePassword,
};
