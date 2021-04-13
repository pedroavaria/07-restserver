import express from 'express'
import cors from 'cors'
import { router } from '../routes/usuarios';
import { dbConnection } from '../database/config';
class Server {
    app: any;
    port:any
    usuariosPath: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'
        // Conexión a base de datos
        this.conectarDB()
        // Middlewares
        this.middleware()
        // Rutas de mi aplicacion
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }

    middleware() {
        // CORS
        this.app.use(cors())
        // Parseo y lectura de body
        this.app.use(express.json())
        // Directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usuariosPath,router)
    }

    listen() {
        this.app.listen(this.port,() => {
        console.log(`Escuchando en el puerto http://localhost:${this.port}`);
        })
    }
}

export {Server}