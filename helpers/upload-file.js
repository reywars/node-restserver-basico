const path = require('path');
const { v4: uuidv4 } = require('uuid');


const upFile = (files, extensionValidate = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise( (resolve, reject) => {

        const { file } = files;
        const nameCut = file.name.split('.');
        const extension = nameCut[nameCut.length - 1];
    
        // Validar la extensión
        if (!extensionValidate.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida - ${extensionValidate}`);
        }
    
        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);
    
        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve( nameTemp );
        });
    });

}


module.exports = {
    upFile
}