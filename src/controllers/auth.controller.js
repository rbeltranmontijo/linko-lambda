const model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { encryptPassword, comparePassword } = require("../libs/encrypt.libs");
const { signToken } = require("../libs/token.libs");

const signUpController = async (req, res) => {
  req.body.password = await encryptPassword(req.body.password);
  body = req.body;

  model.Users.create(body).then((userSaved) => {
    res.json({
      ok: true,
      user: userSaved,
    });
  });
};

const signInController = async (req, res) => {
  if (!req.body.numeroTelefono && !req.body.nombreUsuario)
    return res.json({ ok: false, message: "Datos faltantes" });

  let user;
  if (req.body.numeroTelefono) {
    user = await model.Users.findOne({
      numeroTelefono: req.body.numeroTelefono,
    });
  } else {
    user = await model.Users.findOne({
      nombreUsuario: req.body.nombreUsuario,
    });
  }
  if (!user) return res.json({ ok: false, error: "Usuario no encontrado" });

  const matchPassword = await comparePassword(req.body.password, user.password);

  if (!matchPassword)
    return res.json({ ok: false, message: "Password Invalido" });

  filter = { _id: user._id };
  user = await model.Users.findByIdAndUpdate(filter, { isLogged: true });
  user = await model.Users.findById(filter);
  token = await signToken(user._id);
  console.log("USER UPDATE: ", user);
  res.json({
    ok: true,
    token: token,
    user: user,
  });
};

const logOutController = async (req, res) => {
  if (!req.body.numeroTelefono && !req.body.nombreUsuario)
    return res.json({ ok: false, message: "Datos faltantes" });

  let user;
  if (req.body.numeroTelefono) {
    user = await model.Users.findOne({
      numeroTelefono: req.body.numeroTelefono,
    });
  } else {
    user = await model.Users.findOne({
      nombreUsuario: req.body.nombreUsuario,
    });
  }
  if (!user) return res.json({ ok: false, error: "Usuario no encontrado" });

  const matchPassword = await comparePassword(req.body.password, user.password);

  if (!matchPassword)
    return res.json({ ok: false, message: "Password Invalido" });

  filter = { _id: user._id };
  user = await model.Users.findByIdAndUpdate(filter, { isLogged: false });

  res.json({
    ok: true,
    message: "Logout correcto",
  });
};

module.exports = {
  signUpController,
  signInController,
  logOutController,
};
