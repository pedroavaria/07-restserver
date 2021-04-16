import { Router } from 'express'
import { check } from 'express-validator'
import { categoriasGet, categoriasPost, categoriasDelete, categoriasPut } from '../controllers/categorias'
import { validarJWT, validarCampos } from '../middlewares'


const router = Router()


router.get('/', categoriasGet)

router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    validarCampos
], categoriasGet)

// SOLO TOKEN VALIDO
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoriasPost)

// SOLO TOKEN VALIDO
router.put('/:id', categoriasPut)

// SOLO TOKEN VALIDO
router.delete('/:id', categoriasDelete)


export { router }