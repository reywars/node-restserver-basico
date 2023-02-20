const { request, response } = require("express")



const isAdminRole = ( req = request, res = response, next) => {
    
    if( !req.userAuth ){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token'
        });
    }

    const { role, name } = req.userAuth;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${ name } no es administrador - No puede hacer esto `
        });
    } 

    next();
}

const existRole = ( ...roles ) => {
    return (req = request, res = response, next ) => {

        if (!req.userAuth) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token'
            });
        }

        if( !roles.includes( req.userAuth.role )) {
            return res.status(401).json({
                msg: `EL servicio rerquiere uno de estos roles: ${roles}`
            });
        }

        next(); 
    }
}

module.exports = {
    isAdminRole,
    existRole
}