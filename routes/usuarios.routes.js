
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { isRoleValidate, existEmail } = require('../helpers/db-validator');

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

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( existEmail ),
    check('role').custom( isRoleValidate ),
    validarCampos
], usuariosPOST);

router.patch('/', usuariosPATCH);

router.delete('/', usuariosDELETE);

module.exports = router;