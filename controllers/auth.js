const bcryptjs = require('bcryptjs');
// const bcrypt = require('bcryptjs/dist/bcrypt');
const {response} = require('express');
const Usuario =  require('../models/usuario');
const {generarJWT} = require('../helpers/generar-jwt');

const login = async(req, res = response) => {

    const {correo,password} = req.body;

    try {
        
        //Verificar si el email existe
        const usuario  = await Usuario.findOne({correo});
        if (!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son  correctos- correo'
            });
        }

        //Si el usuario esta activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son  correctos- estado:false'
            });
        }


        //Verifar la contraseña
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son  correctos- password'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
            // correo,password
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador',
        })
    }
    
}

module.exports = {
    login
}