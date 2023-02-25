const path = require('path');
const fs   = require('fs');

const { request, response } = require("express");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { upFile } = require("../helpers");
const { User, Product } = require("../models");

/**
 * Subir archivos  al servidor
 */
const uploadsFiles = async ( req = request, res = response ) => {

    try {
        //const nameFile = await upFile(req.files, ['txt', 'rtf', 'md'], 'texts');
        const nameFile = await upFile(req.files, undefined, 'img');
        res.json({ nameFile });  

    } catch (msg) {
        res.status(400).json({ msg })
    }
}
/**
 * Actualizar imagen de usuario y productos en el  servidor y en la BD
 */
const updateImage = async ( req = request, res = response ) => {

    const {id, collection } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({ 
                    msg: `No existe un usuario con el id: ${ id }`
                });
            }
        break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id: ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
    }

    // Eliminar imágenes previas
    if ( model.img ) {
        // Borrar la imagen del servidor
        const pathImage = path.join(__dirname, '../uploads', collection, model.img );
        if (fs.existsSync( pathImage )) {
            fs.unlinkSync( pathImage );
        }
    }

    // Subimos la imagen al servidor
    const nameFile = await upFile(req.files, undefined, collection);
    model.img = nameFile;

    // Guardamos en la BD
    await model.save();

    res.json( model );
}
/**
 * Mostrar las imagenes del servidor
 */
const showImage = async ( req = request, res = response ) => {

    const { id, collection } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id: ${id}`
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id: ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    if (model.img) {
        // Mostrar la imagen del servidor
        const pathImage = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        } 
    }

    const pathImage = path.join(__dirname, '../asset/no-image.jpg');
    res.sendFile(pathImage);

}

/**
 * Actualizar imagen de usuario y productos en el  servidor y en la BD usando Cloudinary
 */
const updateImageCloudinary = async (req = request, res = response) => {

    const { id, collection } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id: ${id}`
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id: ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    // Eliminar imágenes previas de cloudinary
    if (model.img) {
        const nameArr = model.img.split('/');
        const name = nameArr[ nameArr.length - 1];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy( public_id );

    }

     // Subimos la imagen al servidor cloudinary
    const { tempFilePath } = req.files.file
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    
    // Guardamos en la BD
    model.img = secure_url;
    await model.save();

    res.json(model);
}



module.exports = {
    updateImageCloudinary,
    showImage,
    uploadsFiles,
    updateImage
}