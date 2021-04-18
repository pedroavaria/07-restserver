import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload';
import { router as UsuarioRoute } from '../routes/usuarios';
import { router as AuthRouter } from '../routes/auth';
import { router as CategoriaRouter } from '../routes/categorias'
import { router as ProductoRouter } from '../routes/productos'
import { router as BuscarRouter } from '../routes/buscar'
import { router as UploadsRouter } from '../routes/uploads'
import { dbConnection } from '../database/config';
class Server {
    app: any;
    port: any
    paths: any;
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
        }
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

        // Note that this option available for versions 1.0.0 and newer. 
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.usuarios, UsuarioRoute)
        this.app.use(this.paths.categorias, CategoriaRouter)
        this.app.use(this.paths.auth, AuthRouter)
        this.app.use(this.paths.productos, ProductoRouter)
        this.app.use(this.paths.buscar, BuscarRouter)
        this.app.use(this.paths.uploads, UploadsRouter)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto http://localhost:${this.port}`);
        })
    }
}

export { Server }