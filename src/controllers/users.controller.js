const model = require("../models/user.model");

const getUsersController = async (req, res) => {
  model.Users.find()
    .select("-password")
    .then(async (products) => {
      res.json({
        ok: true,
        data: products,
      });
    })
    .catch((err) => {
      res.json({
        ok: false,
        error: err,
      });
    });
};

module.exports = {
  getUsersController,
};
