

const usuariosCtrl = {};






usuariosCtrl.obtenerId = async(req,res) => {
 
    console.log("dsadsadsa"+req);

};





usuariosCtrl.ingresodeprueba = async(req,res) => {
    const { userEmail, userPass } = req.body;


/*
    const user = await usuarios.findOne({userEmail});
    if (!user) return res.status(401).send('The email doesnt\' exists');
    if (user.userPass !== userPass) return res.status(401).send('Wrong Password');

		const token = jwt.sign({_id: user._id}, 'secretkey');

    return res.status(200).json({token});
    */
    console.log("dsadsadsa"+userEmail+req.userPass);

};






module.exports = usuariosCtrl;