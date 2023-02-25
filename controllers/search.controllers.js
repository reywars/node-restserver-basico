const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Product, Categorie } = require("../models");

const collectionsAllowed = [
    'categories',
    'products',
    'role',
    'users'
];
/**
 * Buscar usuarios por nombre, email o ID de mongo
 */
const searchUsers = async ( term = '', res = response) =>{
    const isMongoID = ObjectId.isValid(term);

    if ( isMongoID ) {
        const user = await User.findById(term);
        return res.json({
            results: ( user ) ? [ user ] : []
        });
    }

    const regex = new RegExp( term, 'i' );
    const user = await User.find({ 
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
     });

    res.json({
        results: user
    });

}
/**
 * Buscar categoria por nombre o ID de mongo
 */
const searchCategories = async (term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term);

    if (isMongoID) {
        const categorie = await Categorie.findById(term)
                                    .populate('user', 'name');
        return res.json({
            results: (categorie) ? [categorie] : []
        });
    }

    const regex = new RegExp(term, 'i');
    const categorie = await Categorie.find({ name: regex, status: true })
                                .populate('user', 'name');

    res.json({
        results: categorie
    });

}
/**
 * Buscar productos por nombre o ID de mongo
 */
const searchProducts = async (term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term);

    if (isMongoID) {
        const product = await Product.findById(term)
                                .populate('categorie','name')
                                .populate('user', 'name');
        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(term, 'i');
    const products = await Product.find({ name: regex, status: true })
                                .populate('categorie','name')
                                .populate('user', 'name');

    res.json({
        results: products
    });

}
/**
 * Buscar una colección
 */
const search = (req = request, res = response) => {

    const { collection, term } = req.params;

    if ( !collectionsAllowed.includes(collection) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ collectionsAllowed }`
        })
    }

    switch (collection) {
        case 'categories':
            searchCategories(term, res)
            break;
        case 'products':
            searchProducts(term, res)
            break;
        case 'users':
            searchUsers(term, res)
            break;
    
        default:
            res.status(500).json({
                msg: 'Se me olvidó hacer esta busqueda'
            });
    }
}


module.exports = {
    search
};