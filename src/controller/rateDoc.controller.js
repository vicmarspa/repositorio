const DocumentoRate = require("../models/DocumentoRate");

const DocumentoRateCtrl = {};




//insert rate

DocumentoRateCtrl.rateDoc = async(req, res, next)=>{
  
    const documentoRate = new DocumentoRate({
        documentRateDocId: req.body.documentRateDocId,
        documentRate: req.body.documentRate,
        documentRateUserId: req.userId,
      });
      await documentoRate.save();
}

//get rate


DocumentoRateCtrl.getDocumentProm = async(req, res, next)=>{
  const { documentRateDocId } = req.params;
  console.log('este es el id'+ documentRateDocId);
  const documentRate = await DocumentoRate.find({ documentRateDocId: { $eq: documentRateDocId} });
  return res.json(documentRate)
}








module.exports = DocumentoRateCtrl;