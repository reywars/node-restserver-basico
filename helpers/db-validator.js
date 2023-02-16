const Role = require('../models/role.models');
const Usuario = require('../models/usuario.models');



const isRoleValidate = async (role = '') => {
    const hasRol = await Role.findOne({ role });
    if (!hasRol) {
        throw new Error(`El rol ${role} no está registrado en la Base de Datos `);
    }
}

const existEmail = async (email = '') => {
    const exEmail = await Usuario.findOne({email});
    if (exEmail) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
}

module.exports = {
    isRoleValidate,
    existEmail
}