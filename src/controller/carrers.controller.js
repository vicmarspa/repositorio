const Carrer = require("../models/carrers");

const CarrerCtrl = {};




//insert rate

CarrerCtrl.addCarrer = async(req, res, next)=>{
  
    const carrer = new Carrer({
        carrerName: req.body.carrerName,
        carreruniversityId: req.body.carreruniversityId,
        carreruniversityname: req.body.carreruniversityname,
        carrerSpecification: req.body.carrerSpecification,
      });
      await carrer.save();
}

//get rate


CarrerCtrl.getCarrers = async(req, res, next)=>{
  const carrer = await Carrer.find();
  return res.json(carrer)
}




module.exports = CarrerCtrl;