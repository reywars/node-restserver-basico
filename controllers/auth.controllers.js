const { response, request, json } = require('express');
const bcryptjs  = require('bcryptjs');

const User = require('../models/user.models');

const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar si el email existe
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            });
        }

        // Verificar si el usuario está activo
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - status: false'
            });
        }

        // Verificar password
        const validatePass = bcryptjs.compareSync( password, user.password );
        if ( !validatePass ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generateJWT( user.id );


        res.json({
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const googleSingIn = async (req = request, res = response) => {

    const { id_token } = req.body;

    try {
        const { name, email, img } = await googleVerify( id_token );

        let user = await User.findOne({ email });

        if( !user ){
            // Lo creamos
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true,
                role: 'USER_ROLE'

            };
            user = new User( data );
            await user.save();
        }

        // Si el usuario en BD está activo
        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        }); 

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }
}


module.exports = {
    login,
    googleSingIn
}