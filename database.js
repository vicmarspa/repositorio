const mongoose = require("mongoose");


//donde está la base de datos
const URI = "mongodb+srv://repositoriotesis:repositoriotesis1234@cluster0.wm95q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//mongodb+srv://Enzo:<password>@cluster0.wm95q.mongodb.net/test

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  //esto es una promesa
  .then((db) => console.log("db is connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;
