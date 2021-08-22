const mongoose = require("mongoose");
const { Schema } = mongoose;


const carrersShcema = new Schema(
    {
      carrerName: { type: String, required: false },
      carreruniversityId: { type: String, required: false },
      carreruniversityname: { type: String, required: false },
      universityDate: { type: Date, default: Date.now },
      carrerSpecification: { type: String, required: false},
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

module.exports = mongoose.model("Carrer", carrersShcema);

