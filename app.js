const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


// Routes

app.use('/api', require('./src/routes/index'));



///////
///////

const path = require('path');
const multer =require('multer');

let storage = multer.diskStorage({
    destination:(req,file, cb)=>{
        cb(null,'./server/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-'+ Date.now()+ path.extname(file.originalname));
    }
})

const upload=multer({storage});




/*
app.post('/subir', upload.single('file'), (req, res)=>{
    console.log('voy aca en la 39');
    console.log(`Storge location is ${req.hostname}/${req.file.path}`);
    return res.send(req.file);
})
*/







//////
//////

module.exports = app;
