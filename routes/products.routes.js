const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const { existProductByID, existCategorieByID } = require('../helpers/db-validator');

const {
    createProduct,
    getProducts,
    getProductByID,
    deleteProduct,
    updateProduct
} = require('../controllers/products.controllers');


const router = Router();

/**
 * {{url}}/api/products
 */

// Obtener todos los productos - público
router.get('/', getProducts);

// Obtener una producto por id - público
router.get('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existProductByID),
    validateFields
], getProductByID);

// Crear una producto - privado - cualquier persona con un token válido
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('categorie', 'No es un ID válido').isMongoId(),
    check('categorie').custom(existCategorieByID),
    validateFields
], createProduct);

// Actualizar una producto - privado - cualquier persona con un token válido
router.put('/:id', [
    validateJWT,
    //check('categorie', 'No es un ID válido').isMongoId(),
    check('id',).custom(existProductByID),
    validateFields
], updateProduct);

// Borrar una producto - Admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id',).custom(existProductByID),
    validateFields
], deleteProduct);


module.exports = router;