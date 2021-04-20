import { Router } from 'express'
import { check } from 'express-validator'
import { obtenerProductos, crearProducto, obtenerProducto, actualizarProducto, borrarProducto } from '../controllers/productos'
import { categoriaExiste, productoExiste } from '../helpers/db-validators'
import { validarJWT, validarCampos, esAdminRole } from '../middlewares'

const router = Router()

router.get('/', obtenerProductos)
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    validarCampos,
    check('id').custom(productoExiste),
    validarCampos
], obtenerProducto)
router.post('/', [
    validarJWT,
    check('precio', 'El precio no es valido').optional().isNumeric(),
    check('nombre', 'El nombre es obligatiorio').notEmpty(),
    check('nombre', 'El nombre debe tener al menos 3 caracteres').isLength({ min: 3 }),
    check('categoria', 'La categoria es obligatoria').notEmpty(),
    check('categoria', 'no es un id de mongo valido').isMongoId(),
    check('categoria').custom(categoriaExiste),
    validarCampos
], crearProducto)

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('categoria', 'No es un id valido').optional().isMongoId(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre', 'El nombre debe tener al menos 3 caracteres').isLength({ min: 3 }),
    check('precio', 'El precio no es valido').optional().isNumeric(),
    check('id').custom(productoExiste),
    check('categoria').custom(categoriaExiste),
    validarCampos
], actualizarProducto)

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(productoExiste),
    validarCampos
],borrarProducto)

export default router