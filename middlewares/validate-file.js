const { request, response } = require("express")


const validateFileUp = (req = request, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
             msg: 'No hay archivos para subir - validateFileUp' 
        });   
    }
    next();
}

module.exports = {
    validateFileUp
}