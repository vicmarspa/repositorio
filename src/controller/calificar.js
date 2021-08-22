const Calificar = require("../models/calificar");

const CalificarCtrl = {};




//insert calification

CalificarCtrl.addCalification = async(req, res, next)=>{
  
    const calificar = new Calificar({

        evaluationDocumentUserId: req.userId,
        evaluationDocumentId: req.body.evaluationDocumentId,
        evaluationDocumentStructure: req.body.evaluationDocumentStructure,
        evaluationDocumentCoherence: req.body.evaluationDocumentCoherence,
        evaluationDocumentAuthorship: req.body.evaluationDocumentAuthorship,
        evaluationDocumentTypeOfFonts: req.body.evaluationDocumentTypeOfFonts,
        evaluationDocumentUtility: req.body.evaluationDocumentUtility,



      });
      await calificar.save();
}

//get calification

CalificarCtrl.getCalification = async(req, res, next)=>{


  const { evaluationDocumentId } = req.params;
  console.log('este es el id'+ evaluationDocumentId);

  const calificar = await Calificar.find({ evaluationDocumentId: { $eq: evaluationDocumentId} });
  return res.json(calificar)
}








module.exports = CalificarCtrl;