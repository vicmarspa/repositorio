const Documento = require("../models/documentos");
//const documentosCalificacionU = require("../models/documentosCalificacionU");

const documentoCtrl = {};



var idDocumentProfile = {};




/*
recibe desde el index.js el req con las variables a ingresar dentro de estas variables se encuentra el url y el userid
*/
documentoCtrl.uploadFile = async(req, res, next)=>{

    const documento = new Documento({
        documentTitle: req.body.documentTitle,
        documentAuthor: req.body.documentAuthor,
        documentDescription: req.body.documentDescription,
        documentRes: req.body.documentRes,
        documentArea: req.body.documentArea,
        documentSubArea: req.body.documentSubArea,
        documentuniversityName: req.body.documentuniversityName,
        documentcarrerName: req.body.documentcarrerName,
        documentAsignaturaName: req.body.documentAsignaturaName,
        documentUser: req.userId,
        documentType: req.body.documentType,
        documentUrl: req.file.filename,
        
      });
      await documento.save();
    //console.log(`Storge location is ${req.hostname}/${req.file.path}`);
    //return res.send(req.file);
}

documentoCtrl.getDocuments = async(req, res, next)=>{
  const documents = await Documento.find();
  return res.json(documents)
}


/*

documentoCtrl.getDocumentsProfileId = async(req, res, next)=>{

  idDocumentProfile = req;
  console.log(req+'aca recibe el id');
 
} 

documentoCtrl.getDocumentsProfile = async(req, res, next)=>{
  console.log('aca estamos en la funcion que hace la lista');
  const { idperfil } = idDocumentProfile;
  console.log(idDocumentProfile+'aca lo recibe otra vez');
  const documentsUser = await Documento.find({ idperfil: { $eq:idperfil } });
  console.log(documentsUser);


  return res.json(documentsUser)  
} 



*/







/* visualizar contenido */






documentoCtrl.getDocument = async(req, res, next)=>{
  const { _id } = req.params
  console.log('este es el id'+_id);
  const documents = await Documento.findById(_id);
  return res.json(documents)
}









module.exports = documentoCtrl;