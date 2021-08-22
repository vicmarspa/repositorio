const { Router } = require ('express');
const router = Router();
const usuarios = require('../models/Usuarios');
const Documento = require("../models/documentos");
const jwt = require('jsonwebtoken');




/////////controladores
const ctrlDocument = require('../controller/documento.controller');
const ctrlu = require('../controller/usuarios.controller');
const DocumentoRateCtrl = require('../controller/rateDoc.controller');
const DocumentoCommentCtrl = require('../controller/commentDoc.controller');
const UniversityCtrl = require('../controller/university.controller');
const CarrerCtrl = require('../controller/carrers.controller');
const AsignaturaCtrl = require('../controller/asignatura.controller');
const CalificarCtrl = require('../controller/calificar');





///////////////////




//librerias para el uso de multer
const path = require('path');
const multer =require('multer');
const { getDocuments, getDocumentsProfile, getDocument } = require('../controller/documento.controller');
const { getDocumentProm } = require('../controller/rateDoc.controller');
const { getDocumentComment } = require('../controller/commentDoc.controller');

////////////////////





////////////
////////////
////////////
////////////  INICIO SECCIÓN DE AUTENTICACION DE USUARIO
////////////
////////////
////////////
////////////


router.post('/signup', async (req, res) => {
    const { userEmail, userPass, userName, userRol } = req.body;
    const newUser = new usuarios({userEmail, userPass, userName, userRol});
    await newUser.save();
	
    const token = await jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token});
});


router.post('/signin', async (req, res) => {
    const { userEmail, userPass } = req.body;

    const user = await usuarios.findOne({userEmail});
    if (!user) return res.status(401).send('The email doesnt\' exists');
    if (user.userPass !== userPass) return res.status(401).send('Wrong Password');

		const token = jwt.sign({_id: user._id}, 'secretkey');

    return res.status(200).json({token});
});

router.get('/tasks', (req, res) => {

    
    res.json([
        {
            _id: '1',
            name: 'CIENCIAS NATURALES',

        },
        {
            _id: '2',
            name: "INGENIERÍA Y TECNOLOGÍA",

        },
        {
            _id: '3',
            name: "CIENCIAS MÉDICA Y DE LA SALUD",

        },
        {
            _id: '4',
            name: "CIENCIAS AGRÍCOLAS",

        },
        {
            _id: '5',
            name: "CIENCIAS SOCIALES",

        },
        {
            _id: '6',
            name: "HUMANIDADES",

        },
    ])

    console.log(res.json+'OFICIAL');
});



router.get('/private-tasks', verifyToken, async(req, res) => {
 
    const id = req.userId;
    const result = await usuarios.findById(id);
    res.json([
        {
            _id: result.userId,
            name: result.userName,
            description: result.userEmail,
            date: result.userRol
        },
    ])
});



async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}


router.get('/profile', verifyToken, async(req, res)  => {
    
    res.send(req.userId);
    //forma como usar metodo pasando datos por request
    ctrlDocument.obtenerId(req.userId);
});



router.put('/editprofile', verifyToken, async (req, res) => {

    
    const id = req.userId;
    console.log('esto resulta22',id);
    await usuarios.findByIdAndUpdate(id, {$set: req.body}, {new: true});
	res.json({ status: "El proceso ha sido modificado" });

});





router.get('/editprofile2', verifyToken, async (req, res) => {
    const id = req.userId;
    console.log('esto resulta22',id);
});


router.route('/inicio')
    .get(getDocuments);

////////////
////////////
////////////
////////////  TERMINO SECCIÓN DE AUTENTICACION DE USUARIO
////////////
////////////
////////////
////////////






///////////
///////////LIBS OF MULTER
let storage = multer.diskStorage({
    destination:(req,file, cb)=>{
        cb(null,'./server/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-'+ Date.now()+ path.extname(file.originalname));
       
    }
})


const upload=multer({storage});
///////////LIBS OF MULTER
///////////



/*
primero verifica el token
lo que realiza primero antes de subir la información del documento es subir el documento luego recupera la información
propia del documento y la envía por req al controlador, luego los datos que se requieren de la subida del documento
son almacenados como parte de la información del mismo documento.
*/



    router.route('/documentos', verifyToken)
        .post(upload.single('file'),verifyToken ,async (req, res) => {
            res.send(req.file);
            ctrlDocument.uploadFile(req);
        });
    
 
/*
esta funcion se realizara con el proposito de obtener los documentos solo de un usuario
*/

    router.get('/documentosperfil', verifyToken, async(req, res) => {
        const id = req.userId;
        const result = await Documento.find({ documentUser: { $eq:id } });
        res.json(result)  
    });



    router.route('/documento/:_id')
    .get(getDocument);
   // .delete(deletePhoto)
   // .put(updatePhoto);




////////
//calificar documento
////

router.route('/ratedoc', verifyToken)
.post(verifyToken ,async (req, res) => {
    DocumentoRateCtrl.rateDoc(req);
   res.json({ status: "El proceso ha sido modificado" });
});







///////
//promedio de documentos
///////


router.route('/documentorateobtener/:documentRateDocId')
.get(getDocumentProm);
// .delete(deletePhoto)
// .put(updatePhoto);



////////
//comentar documento
////

router.route('/commentdoc', verifyToken)
.post(verifyToken ,async (req, res) => {
    DocumentoCommentCtrl.commentDoc(req);
   res.json({ status: "El proceso ha sido modificado" });
});




///////
//obtener documentos
///////
router.route('/documentocommentobtener/:documentCommentDocId')
.get(getDocumentComment);
// .delete(deletePhoto)
// .put(updatePhoto);



///////
//obtener documentos
///////
router.get('/descargardocumento/:id',function(req,res){
res.download('./server/uploads/'+req.params.id, 
req.params.id, function(err){
    if(err){
        console.log(err);
    }else{
        console.log('funciona'); 
    }
    });
});




///////
//inscribir universidad
///////
router.route('/adduniversity', verifyToken)
.post(verifyToken ,async (req, res) => {
    UniversityCtrl.addUniversity(req);
   res.json({ status: "Universidad Agregada" });
});

///////
//buscar universidades
///////


router.route('/searchuniversities')
.get(UniversityCtrl.getUniversities);





///////
//inscribir carrera
///////


router.route('/addcarrer', verifyToken)
.post(verifyToken ,async (req, res) => {
    CarrerCtrl.addCarrer(req);
   res.json({ status: "Carrera Agregada" });
});

///////
//buscar carreras
///////


router.route('/searchcarrers')
.get(CarrerCtrl.getCarrers);


///////
//inscribir asignatura
///////


router.route('/addasignatura', verifyToken)
.post(verifyToken ,async (req, res) => {
    AsignaturaCtrl.addAsignatura(req);
   res.json({ status: "Asignatura Agregada" });
});

///////
//buscar asignatura
///////


router.route('/searchasignatura')
.get(AsignaturaCtrl.getAsignaturas);




/////
//busqueda avanzada
/////
//// AREA
//// TIPO
//// SUB-CATEGORÍA

// /getadvance/:documentArea&&:documentType&&:documentSubArea

router.get('/getadvance/:documentArea&&:documentSubArea&&:documentType', verifyToken, async(req, res) => {
//el enlace se maneja asi http://localhost:3000/api/getadvance/CIENCIAS NATURALES&&CARRERA UNO UNIVERSIDAD UNO&&Documento
    const id = req.userId;
    const area = req.params.documentArea;
    const subArea =req.params.documentSubArea;
    const doctype = req.params.documentType;

    const result = await Documento.find({documentArea: { $eq:area }, documentSubArea: { $eq:subArea }, documentType: { $eq:doctype }});
    res.json(result)  
}); 




router.get('/getesp/:documentuniversityName&&:documentcarrerName&&:documentAsignaturaName&&:documentType', verifyToken, async(req, res) => {
    //el enlace se maneja asi http://localhost:3000/api/getesp/UNIVERSIDAD UNO&&CARRERA DOS UNIVERSIDAD UNO&&PRUEBA 1&&Documento

        const id = req.userId;
        const university = req.params.documentuniversityName;
        const carrer =req.params.documentcarrerName;
        const asignature = req.params.documentAsignaturaName;
        const type = req.params.documentType;

        const result = await Documento.find({documentuniversityName: { $eq:university }, documentcarrerName: { $eq:carrer }, documentAsignaturaName: { $eq:asignature }, documentType: { $eq:type }});
        res.json(result)  
    }); 



    router.get('/getsearchfinal/:documentTitle', verifyToken, async(req, res) => {
        //el enlace se maneja asi http://localhost:3000/api/getadvance/CIENCIAS NATURALES&&CARRERA UNO UNIVERSIDAD UNO&&Documento
            const documentTitle = req.params.documentTitle;
            const result = await Documento.find({documentTitle: { $eq:documentTitle }});
            res.json(result)  
        }); 

//////////
////
////ELIMINAR DOCUMENTO
//////////






router.delete('/eliminarDocumento/:_id', verifyToken, async(req, res) => {
        const _id = req.params._id;
        await Documento.findByIdAndRemove(_id) ;
        res.json({message: 'Documento Eliminado.'})  
    });


////////
////
////ESTO ES EL EDITAR
////////





////////
////
////ESTO ES EL calificar
////////
router.route('/addcalification', verifyToken)
.post(verifyToken ,async (req, res) => {
    CalificarCtrl.addCalification(req);
   res.json({ status: "Universidad Agregada" });
});








///////
//obtener calificaciones de documentos
///////


router.route('/obtenercalificaciones/:evaluationDocumentId')
.get(CalificarCtrl.getCalification);






module.exports = router;