const { request, response } = require("express");
const { Product } = require("../models");

// Obtener los productos y el usuario que la creo o modificó
const getProducts = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('categorie', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({ total, products });
}

// Obtener producto por id y el usuario 
const getProductByID = async (req = request, res = response) => {

    const { id } = req.params;

    const product = await Product
                            .findById(id, { status: false })
                            .populate('user', 'name')
                            .populate('categorie', 'name');
                            
    res.json({ product });
}

// Crear un producto
const createProduct = async (req = request, res = response) => {

    const { status, user, ...body } = req.body;

    const productDB = await Product.findOne({ name: body.name });

    if (productDB) {
        return res.status(400).json({
            msg: `El producto ${productDB.name}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.userAuth._id
    }
    const product = new Product(data);

    // Guardar en BD
    await product.save();

    res.status(201).json(product);
}

// Actualizar un producto
const updateProduct = async (req = request, res = response) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;

    if ( data.name ) {
        data.name = data.name.toUpperCase();   
    }
    data.user = req.userAuth.uid;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.json(product);

}

// Eliminar una producto
const deleteProduct = async (req = request, res = response) => {

    const { id } = req.params;
    const productDelete = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json({ productDelete });
}

module.exports = {
    createProduct,
    deleteProduct,
    getProducts,
    getProductByID,
    updateProduct
}