const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios : '/api/usuarios'
        }
        // this.usuariosPath = '/api/usuarios'
        // this.authPath = '/api/auth';

        //Concetar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));
    }

    routes(){
        // this.app.use( this.usuariosPath, require('../routes/usuarios'));
        // this.app.use( this.authpath, require('../routes/auth')); 
        this.app.use('/api/usuarios',require('../routes/usuarios'));
        this.app.use('/api/categorias',require('../routes/categorias'));
        this.app.use('/api/productos',require('../routes/productos'));
        this.app.use('/api/auth',require('../routes/auth'));
        this.app.use('/api/buscar',require('../routes/buscar'));
        // this.app.use('/api/usuarios',require('../routes/usuarios'));

        // this.app.use(this.paths.auth,require('../routes/usuarios'));
        // this.app.use(this.paths.usuarios,require('../routes/auth'));
    }

    listen(){
        
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports = Server;