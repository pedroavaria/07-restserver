import { Router } from 'express'
import { check } from 'express-validator'
import { obtenerCategoria,obtenerCategorias, categoriasPost, categoriasDelete, actualizarCategoria } from '../controllers/categorias'
import { categoriaExiste } from '../helpers/db-validators'
import { validarJWT, validarCampos, esAdminRole } from '../middlewares'


const router = Router()


router.get('/', obtenerCategorias)

router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(categoriaExiste),
    validarCampos
], obtenerCategoria)

// SOLO TOKEN VALIDO
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoriasPost)

// SOLO TOKEN VALIDO
router.put('/:id', [
    validarJWT,
    check('id',"No es un id valido").isMongoId(),
    check('id').custom(categoriaExiste),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria)

// SOLO TOKEN VALIDO
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(categoriaExiste),
    validarCampos
], categoriasDelete)


export default router