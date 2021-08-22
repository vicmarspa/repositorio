const Asignatura = require("../models/asignatura");

const AsignaturaCtrl = {};




//insert rate

AsignaturaCtrl.addAsignatura = async(req, res, next)=>{
  
    const asignatura = new Asignatura({
        asignaturaName: req.body.asignaturaName,
        asignaturauniversityname: req.body.asignaturauniversityname,
        asignaturacarrername: req.body.asignaturacarrername,
        asignaturaSpecification: req.body.asignaturaSpecification,
      });
      await asignatura.save();
}

//get rate


AsignaturaCtrl.getAsignaturas = async(req, res, next)=>{
  const asignatura = await Asignatura.find();
  return res.json(asignatura)
}




module.exports = AsignaturaCtrl;