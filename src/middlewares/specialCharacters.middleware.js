const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
const emailvalidator = require("email-validator");

const verifySpecuialCharacter = async (req, res, next) => {
  const {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    numeroTelefono,
    nombreUsuario,
    email,
    password,
  } = req.body;

  if (nombre) {
    if (specialCharacterCheck(nombre))
      return res.json({ ok: false, message: "Datos incorrectos en nombre" });

    if (nombre.length > 40)
      return res.json({
        ok: false,
        message: "Excede longitud máxima en nombre",
      });
  } else {
    return res.json({
      ok: false,
      message: "Datos faltantes: nombre",
    });
  }
  if (apellidoPaterno) {
    if (specialCharacterCheck(apellidoPaterno))
      return res.json({
        ok: false,
        message: "Datos incorrectos en apellidoPaterno",
      });
    if (apellidoPaterno.length > 40)
      return res.json({
        ok: false,
        message: "Excede longitud máxima en apellidoPaterno",
      });
  } else {
    return res.json({
      ok: false,
      message: "Datos faltantes: apellidoPaterno",
    });
  }
  if (apellidoMaterno) {
    if (specialCharacterCheck(apellidoMaterno))
      return res.json({
        ok: false,
        message: "Datos faltantes: apellidoMaterno",
      });
    if (apellidoMaterno.length > 40)
      return res.json({
        ok: false,
        message: "Excede longitud máxima en apellidoMaterno",
      });
  }
  if (numeroTelefono) {
    console.log("TIPO DE NUMERO");
    console.log(typeof numeroTelefono);
    console.log("validacion de tipo: ", typeof numeroTelefono === "number");
    if (typeof numeroTelefono !== "number")
      return res.json({
        ok: false,
        message: "Error en numeroTelefono",
      });
    if (numeroTelefono.length > 10)
      return res.json({
        ok: false,
        message: "Excede longitud máxima en numeroTelefono",
      });
  } else {
    return res.json({
      ok: false,
      message: "Datos faltantes: numeroTelefono",
    });
  }
  if (nombreUsuario) {
    if (specialCharacterCheck(nombreUsuario))
      return res.json({
        ok: false,
        message: "Datos incorrectos en nombreUsuario",
      });
    if (nombreUsuario.length > 30)
      return res.json({
        ok: false,
        message: "Excede longitud máxima en nombreUsuario",
      });
  } else {
    return res.json({
      ok: false,
      message: "Datos faltantes: nombreUsuario",
    });
  }
  if (password) {
    if (specialCharacterCheck(password))
      return res.json({
        ok: false,
        message: "Datos incorrectos en password",
      });
    if (password.length > 20)
      return res.json({
        ok: false,
        message: "Excede longitud máxima en password",
      });
  } else {
    return res.json({
      ok: false,
      message: "Datos faltantes: password",
    });
  }
  console.log("EMAIL VALIDATOR: ", emailvalidator.validate(email));
  if (email) {
    if (!emailvalidator.validate(email))
      return res.json({
        ok: false,
        message: "Datos incorrectos en email",
      });
    if (email.length > 40)
      return res.json({
        ok: false,
        message: "Excede longitud máxima en email",
      });
  } else {
    return res.json({
      ok: false,
      message: "Datos faltantes: email",
    });
  }
  next();
};

const specialCharacterCheck = (str) =>
  specialChars.split("").some((specialChars) => {
    if (str.includes(specialChars)) {
      return true;
    }

    return false;
  });

module.exports = {
  verifySpecuialCharacter,
};
