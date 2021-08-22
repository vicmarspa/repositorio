const mongoose = require("mongoose");
const { Schema } = mongoose;


const presentacionesShcema = new Schema(
    {

        presentationTitle: { type: String, required: true },
        presentationAuthor: { type: String, required: true },
        presentationDescription: { type: String, required: true },
        presentationUser: { type: String, required: true },
        presentationDate: { type: Date, default: Date.now },
        presentationType: { type: String, required: true },
        presentationUrl: { type: String, required: true },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

module.exports = mongoose.model("Presentacion", presentacionesShcema);


