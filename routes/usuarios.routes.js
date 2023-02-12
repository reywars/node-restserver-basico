
const { Router } = require('express');
const { 
    usuariosGET, 
    usuariosPUT, 
    usuariosPOST, 
    usuariosPATCH, 
    usuariosDELETE 
} = require('../controllers/usuarios.controllers');

const router = Router();

router.get('/', usuariosGET);

router.put('/:id', usuariosPUT);

router.post('/', usuariosPOST);

router.patch('/', usuariosPATCH);

router.delete('/', usuariosDELETE);

module.exports = router;