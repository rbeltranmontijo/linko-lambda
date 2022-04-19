const jwt = require("jsonwebtoken");
const model = require("../models/user.model");

const verifyToken = async (req, res, next) => {
  try {
    const tokenHeader = req.headers["x-token"];
    if (tokenHeader) {
      return new Promise((resolve, reject) => {
        jwt.verify(
          tokenHeader,
          process.env.SECRET_JWT_SEED,
          async (err, decoded) => {
            if (err) {
              res.status(401).json({ ok: false, message: "Token Invalido" });
            } else {
              const user = await model.Users.findById(decoded.id, {
                password: 0,
              });
              if (!user)
                return res
                  .status(401)
                  .json({
                    ok: false,
                    message: "Usuario de login no encontrado",
                  });
              if (!user.isLogged)
                return res
                  .status(401)
                  .json({ ok: false, message: "Usiario no logueado" });
              next();
            }
          }
        );
      });
    } else {
      res.status(401).json({ ok: false, message: "No se agrego token" });
    }
  } catch (error) {
    res.status(401).json({ ok: false, message: "Unauthorize" });
  }
};

module.exports = {
  verifyToken,
};
