
const validFields  = require('../middlewares/validate-fields');
const validJWT  = require('../middlewares/validate-jwt');
const validRoles  = require('../middlewares/validate-roles');
const validFile  = require('../middlewares/validate-file');


module.exports = {
    ...validFields,
    ...validJWT,
    ...validRoles,
    ...validFile
}