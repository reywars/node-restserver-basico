
const { Router } = require('express');
const { check } = require('express-validator');

const { 
    isRoleValidate, 
    existEmail, 
    existUserByID 
} = require('../helpers/db-validator');

const {
    validateFields,
    validateJWT,
    isAdminRole, 
    existRole
} = require('../middlewares');

const { 
    usersGET, 
    usersPUT, 
    usersPOST, 
    usersPATCH, 
    usersDELETE 
} = require('../controllers/users.controllers');


const router = Router();

router.get('/', usersGET);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id',).custom( existUserByID ),
    check('role').custom(isRoleValidate),
    validateFields
], usersPUT);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( existEmail ),
    check('role').custom( isRoleValidate ),
    validateFields
], usersPOST);

router.patch('/', usersPATCH);

router.delete('/:id', [
    validateJWT,
    //isAdminRole,
    existRole('ADMIN_ROLE', 'VENTAS_ROLE', 'OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id',).custom(existUserByID),
    validateFields
], usersDELETE);

module.exports = router;