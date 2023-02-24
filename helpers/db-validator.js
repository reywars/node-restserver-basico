const { Categorie, Role, User, Product } = require('../models');


const isRoleValidate = async (role = '') => {
    const hasRol = await Role.findOne({ role });
    if (!hasRol) {
        throw new Error(`El rol ${role} no está registrado en la Base de Datos `);
    }
}

const existEmail = async (email = '') => {
    const exEmail = await User.findOne({ email });
    if (exEmail) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
}

const existUserByID = async (id) => {
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`El usuario con id: ${id} no existe`);
    }
}

const existCategorieByID = async (id) => {
    const existCateg = await Categorie.findById(id);
    if (!existCateg) {
        throw new Error(`La categoría con id: ${id} no existe`);
    }
}

const existProductByID = async (id) => {
    const existProduct = await Product.findById(id);
    if (!existProduct) {
        throw new Error(`La categoría con id: ${id} no existe`);
    }
}

module.exports = {
    existEmail,
    existUserByID,
    existCategorieByID,
    existProductByID,
    isRoleValidate
}