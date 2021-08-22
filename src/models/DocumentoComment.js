const mongoose = require("mongoose");
const { Schema } = mongoose;


const DocumentoCommentShcema = new Schema(
    {
      documentCommentDocId: { type: String, required: false},
      documentComment: { type: String, required: false },
      documentDate: { type: Date, default: Date.now },
      documentCommentUserId: { type: String, required: false},
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

module.exports = mongoose.model("DocumentoComment", DocumentoCommentShcema);

