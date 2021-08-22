const mongoose = require("mongoose");
const { Schema } = mongoose;


const asignaturaShcema = new Schema(
    {
        asignaturaName: { type: String, required: false },
        asignaturauniversityname: { type: String, required: false },
        asignaturacarrername: { type: String, required: false },
        universityDate: { type: Date, default: Date.now },
        asignaturaSpecification: { type: String, required: false},
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

module.exports = mongoose.model("Asignatura", asignaturaShcema);

