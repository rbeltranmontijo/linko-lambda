const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Nombre es necesario"],
    },
    apellidoPaterno: {
      type: String,
      required: [true, "Apellido paterni es necesario"],
    },
    apellidoMaterno: {
      type: String,
    },
    numeroTelefono: {
      type: Number,
      required: [true, "Numero de telefono es necesario"],
    },
    email: {
      type: String,
      unique: true,
    },
    nombreUsuario: {
      type: String,
      unique: true,
      required: [true, "Nombre de usuario es necesario"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es necesaria"],
    },
    isLogged: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

exports.Users = mongoose.model("Users", userSchema);
