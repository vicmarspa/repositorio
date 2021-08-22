const mongoose = require("mongoose");
const { Schema } = mongoose;


const universityShcema = new Schema(
    {
      universityName: { type: String, required: false },
      universityConuntry: { type: String, required: false },
      universityDate: { type: Date, default: Date.now },
      universitySpecification: { type: String, required: false},
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

module.exports = mongoose.model("University", universityShcema);

