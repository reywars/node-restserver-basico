const { request, response } = require("express");
const { Categorie } = require("../models");

// Obtener las categorías y el usuario que la creo o modificó
const getCategorie = async ( req = request, res = response ) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [total, categories] = await Promise.all([
        Categorie.countDocuments(query),
        Categorie.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .populate('user', 'name')
    ]);

    res.json({ total, categories });
}

// Obtener categoría por id el usuario 
const getCategorieByID = async (req = request, res = response) => {

    const { id } = req.params;

    const categorie = await Categorie.findById(id, { status: false }).populate('user', 'name');

    res.json({ categorie });
}

// Crear una categoría
const createCategorie = async ( req = request, res = response ) => {

    const name = req.body.name.toUpperCase();

    const categorieDB = await Categorie.findOne({ name });

    if ( categorieDB ) {
        return res.status(400).json({
            msg: `La categoría ${ categorieDB.name }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        name,
        user: req.userAuth._id
    }
    const categorie = new Categorie( data );
    
    // Guardar en BD
    await categorie.save();

    res.status(201).json(categorie);
}

// Actualizar un categoría
const updateCategorie = async ( req = request, res = response ) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.userAuth.uid;

    const categorie = await Categorie.findByIdAndUpdate(id, data, { new: true});

    res.json(categorie);

}

// Eliminar una categoría
const deleteCategorie = async ( req = request, res = response ) => {

    const { id } = req.params;
    const categorieDelete = await Categorie.findByIdAndUpdate(id, { status: false }, {new: true});

    res.json({ categorieDelete });
}

module.exports = {
    createCategorie,
    deleteCategorie,
    getCategorie,
    getCategorieByID,
    updateCategorie
}