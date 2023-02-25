
const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSingIn } = require('../controllers');
const { validateFields } = require('../middlewares');


const router = Router();

/**
 * {{url}}/api/auth/login
 */
router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
], login);

router.post('/google',[
    check('id_token', 'El id_token de google es necesario').not().isEmpty(),
    validateFields
], googleSingIn);

module.exports = router;