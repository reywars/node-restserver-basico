const { Categorie, Role, User, Product } = require('../models');

/**
 * Validar rol permitidos
 */
const isRoleValidate = async (role = '') => {
    const hasRol = await Role.findOne({ role });
    if (!hasRol) {
        throw new Error(`El rol ${role} no está registrado en la Base de Datos `);
    }
}
/**
 * Comprobar que el email con el id dado exista
 */
const existEmail = async (email = '') => {
    const exEmail = await User.findOne({ email });
    if (exEmail) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
}
/**
 * Comprobar que el usuario con el id dado exista
 */
const existUserByID = async (id) => {
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`El usuario con id: ${id} no existe`);
    }
}
/**
 * Comprobar que la categoría con el id dado exista
 */
const existCategorieByID = async (id) => {
    const existCateg = await Categorie.findById(id);
    if (!existCateg) {
        throw new Error(`La categoría con id: ${id} no existe`);
    }
}
/**
 * Comprobar que el producto con el id dado exista
 */
const existProductByID = async (id) => {
    const existProduct = await Product.findById(id);
    if (!existProduct) {
        throw new Error(`La categoría con id: ${id} no existe`);
    }
}
/**
 * Validar colecciones permitidas
 */
const collectionsAllowed = async ( collection = '', collections = []) => {

    const incl = collections.includes( collection );
    if ( !incl ) {
        throw new Error(`La colección ${ collection } no es permitida, ${ collections }`);
    }
    return true;

}

module.exports = {
    collectionsAllowed,
    existEmail,
    existUserByID,
    existCategorieByID,
    existProductByID,
    isRoleValidate
}