const { Router } = require('express');
const { check } = require('express-validator');

const { 
    createCategorie, 
    getCategorie, 
    getCategorieByID, 
    deleteCategorie, 
    updateCategorie 
} = require('../controllers');

const { existCategorieByID } = require('../helpers');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');



const router = Router();

/**
 * {{url}}/api/categories
 */

// Obtener todas las categorías - público
router.get('/', getCategorie);

// Obtener una categoría por id - público
router.get('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existCategorieByID),
    validateFields
], getCategorieByID);

// Crear una categoría - privado - cualquier persona con un token válido
router.post('/', [ 
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
 ], createCategorie);

// Actualizar una categoría - privado - cualquier persona con un token válido
router.put('/:id',[
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id',).custom(existCategorieByID),
    validateFields
], updateCategorie);

// Borrar una categoría - Admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id',).custom(existCategorieByID),
    validateFields
], deleteCategorie);


module.exports = router;