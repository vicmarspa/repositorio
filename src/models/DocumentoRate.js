const mongoose = require("mongoose");
const { Schema } = mongoose;


const DocumentoRateShcema = new Schema(
    {
      documentRateDocId: { type: String, required: false},
      documentRate: { type: Number, required: false },
      documentDate: { type: Date, default: Date.now },
      documentRateUserId: { type: String, required: false},

    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

module.exports = mongoose.model("DocumentoRate", DocumentoRateShcema);

