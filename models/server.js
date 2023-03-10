const express = require('express');
var cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../db/config.db');

class Server {

    constructor() {
        this.app   = express();
        this.port  = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
            uploads:    '/api/uploads',
            user:       '/api/user'
        }
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';

        // Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use( express.static('public') );

        // Fileuploads - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.categories, require('../routes/categories.routes'));
        this.app.use(this.paths.products, require('../routes/products.routes'));
        this.app.use(this.paths.search, require('../routes/search.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
        this.app.use(this.paths.user, require('../routes/users.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    }

}

module.exports = Server;
