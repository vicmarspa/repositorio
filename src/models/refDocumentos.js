const mongoose = require("mongoose");
const { Schema } = mongoose;


const refDocumentosShcema = new Schema(
    {

        referenceDocumentId: { type: String, required: true },
        referenceDocumentDescription: { type: String, required: false },
        referenceDocumentYear: { type: String, required: false },
        referenceDocumentAuthor : { type: String, required: false },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );



module.exports = mongoose.model("RefDocumentos", refDocumentosShcema);


