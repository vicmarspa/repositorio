const University = require("../models/university");

const UniversityCtrl = {};




//insert rate

UniversityCtrl.addUniversity = async(req, res, next)=>{
  
    const university = new University({
        universityName: req.body.universityName,
        universityConuntry: req.body.universityConuntry,
        universitySpecification: req.body.universitySpecification,
      });
      await university.save();
}

//get rate


UniversityCtrl.getUniversities = async(req, res, next)=>{
  const university = await University.find();
  return res.json(university)
}








module.exports = UniversityCtrl;