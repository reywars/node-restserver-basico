const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario.models');


const usuariosGET = (req = request, res = response) => {

    const {} = req.query;

    res.json({
        msg: 'get API - usuariosGET'
    });
}

const usuariosPOST = async (req = request, res = response) => {

    const {name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    // Encriptar el password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt )

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}
const usuariosPUT = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPUT',
        id
    });
}
const usuariosPATCH = (req = request, res = response) => {
    res.json({
        msg: 'patch API - usuariosPATCH'
    });
}
const usuariosDELETE = (req = request, res = response) => {
    res.json({
        msg: 'delete API - usuariosDELETE'
    });
}


module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosPATCH,
    usuariosDELETE
}