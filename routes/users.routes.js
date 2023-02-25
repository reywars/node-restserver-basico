
const { Router } = require('express');
const { check } = require('express-validator');

const { isRoleValidate, existEmail, existUserByID } = require('../helpers');

const { validateFields, validateJWT, existRole } = require('../middlewares');

const { 
    usersGET, 
    usersPUT, 
    usersPOST, 
    usersPATCH, 
    usersDELETE 
} = require('../controllers');


const router = Router();

/**
 * {{url}}/api/categories
 */

// Obtener todos los usuarios - público
router.get('/', usersGET);

// Actualizar un usuario - privado - cualquier persona con un token válido
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id',).custom( existUserByID ),
    check('role').custom(isRoleValidate),
    validateFields
], usersPUT);

// Crear un usuario - publico
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( existEmail ),
    check('role').custom( isRoleValidate ),
    validateFields
], usersPOST);

router.patch('/', usersPATCH);

// Borrar un usuario - privado - cualquier persona con un token válido
router.delete('/:id', [
    validateJWT,
    existRole('ADMIN_ROLE', 'VENTAS_ROLE', 'OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id',).custom(existUserByID),
    validateFields
], usersDELETE);

module.exports = router;