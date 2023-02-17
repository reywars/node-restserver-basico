const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/user.models');


const usersGET = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

const usersPOST = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Encriptar el password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    res.json({
        user
    });
}
const usersPUT = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
        // Encriptar el password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest)

    res.json(user);
}
const usersPATCH = (req = request, res = response) => {
    res.json({
        msg: 'patch API - usersPATCH'
    });
}
const usersDELETE = async (req = request, res = response) => {

    const { id } = req.params;
    const user = await User.findByIdAndUpdate( id, { status: false });


    res.json({
        id,
        user
    });
}


module.exports = {
    usersGET,
    usersPOST,
    usersPUT,
    usersPATCH,
    usersDELETE
}