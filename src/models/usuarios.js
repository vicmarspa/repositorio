const mongoose = require("mongoose");
const { Schema } = mongoose;


const usuariosShcema = new Schema(
    {

        userName: { type: String, required: false },
        userEmail: { type: String, required: true },
        userPass: { type: String, required: true },
        userRol: { type: String, required: false },
        userDate:  { type: Date, default: Date.now },

    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

module.exports = mongoose.model("Usuario", usuariosShcema);


