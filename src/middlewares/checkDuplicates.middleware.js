const model = require("../models/user.model");

const checkDuplicateUser = async (req, res, next) => {
  try {
    const userEmail = await model.Users.findOne({ email: req.body.email });
    if (userEmail)
      return res
        .status(400)
        .json({ ok: false, message: "El usuario ya existe" });

    const nombreUsuario = await model.Users.findOne({
      nombreUsuario: req.body.nombreUsuario,
    });

    if (nombreUsuario)
      return res
        .status(400)
        .json({ ok: false, message: "El usuario ya existe" });

    const userNumeroTelefono = await model.Users.findOne({
      numeroTelefono: req.body.numeroTelefono,
    });
    if (userNumeroTelefono)
      return res
        .status(400)
        .json({ ok: false, message: "El usuario ya existe" });

    next();
  } catch (error) {
    res.status(400).json({ message: "El usuario ya existe" });
  }
};

module.exports = {
  checkDuplicateUser,
};
