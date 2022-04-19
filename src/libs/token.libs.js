const jwt = require("jsonwebtoken");

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.SECRET_JWT_SEED, {
    expiresIn: process.env.SECRET_JWT_EXPIRES,
  });

module.exports = {
  signToken,
};
