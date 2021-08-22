const mongoose = require("mongoose");
const { Schema } = mongoose;


const refPresentacionesShcema = new Schema(
    {

        referencePresentationId: { type: String, required: true },
        referencePresentationDescription: { type: String, required: false },
        referencePresentationYear: { type: String, required: false },
        referencePresentationAuthor : { type: String, required: false },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

module.exports = mongoose.model("RefPresentaciones", refPresentacionesShcema);


