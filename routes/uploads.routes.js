
const { Router } = require('express');
const { check } = require('express-validator');

const { uploadsFiles, updateImage, showImage, updateImageCloudinary } = require('../controllers');
const { collectionsAllowed } = require('../helpers');
const { validateFields, validateFileUp } = require('../middlewares');


const router = Router();


router.post('/', validateFileUp, uploadsFiles);

router.put('/:collection/:id', [
    validateFileUp,
    check('id', 'El id debe ser válido').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['users', 'products'])),
    validateFields
], updateImageCloudinary);
//], updateImage);

router.get('/:collection/:id', [
    check('id', 'El id debe ser válido').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['users', 'products'])),
    validateFields
], showImage);




module.exports = router;