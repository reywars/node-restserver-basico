
const auth = require('../controllers/auth.controllers');
const categories = require('../controllers/categories.controllers');
const products = require('../controllers/products.controllers');
const search = require('../controllers/search.controllers');
const uploads = require('../controllers/uploads.controllers');
const users = require('../controllers/users.controllers');


module.exports = {
    ...auth,
    ...categories,
    ...products,
    ...search,
    ...uploads,
    ...users
}