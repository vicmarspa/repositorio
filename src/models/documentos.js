const mongoose = require("mongoose");
const { Schema } = mongoose;


const documentosShcema = new Schema(
    {

      documentTitle: { type: String, required: false },
      documentAuthor: { type: String, required: false },
      documentDescription: { type: String, required: false },
      documentRes: { type: String, required: false },
      documentArea: { type: String, required: false },
      documentSubArea: { type: String, required: false },
      documentuniversityName: { type: String, required: false },
      documentcarrerName: { type: String, required: false },
      documentAsignaturaName: { type: String, required: false },
      documentUser: { type: String, required: false },
      documentDate: { type: Date, default: Date.now },
      documentType: { type: String, required: false },
      documentUrl: { type: String, required: false },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

module.exports = mongoose.model("Documento", documentosShcema);


