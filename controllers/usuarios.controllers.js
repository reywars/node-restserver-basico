const { response, request } = require('express');


const usuariosGET = (req = request, res = response) => {

    const { q, nombre, apikey, page = 1, limit} = req.query;

    res.json({
        msg: 'get API - usuariosGET',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPOST = (req = request, res = response) => {
    const { nombre, edad } = req.body;


    res.json({
        msg: 'post API - usuariosPOST',
        nombre,
        edad
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