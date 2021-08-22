const mongoose = require("mongoose");
const { Schema } = mongoose;


const calificarShcema = new Schema(
    {
      evaluationDocumentId: { type: String, required: false },
      evaluationDocumentUserId: { type: String, required: false },
      evaluationDocumentDate: { type: Date, default: Date.now },
      evaluationDocumentStructure: { type: Number, required: false },
      evaluationDocumentCoherence: { type: Number, required: false },
      evaluationDocumentAuthorship: { type: Number, required: false },
      evaluationDocumentTypeOfFonts: { type: Number, required: false },
      evaluationDocumentUtility: { type: Number, required: false },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

module.exports = mongoose.model("Calificar", calificarShcema);

