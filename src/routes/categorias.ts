import { Router } from 'express'
import { check } from 'express-validator'
import { categoriasGet, categoriasPost, categoriasDelete, categoriasPut } from '../controllers/categorias'
import { validarJWT, validarCampos } from '../middlewares'


const router = Router()


router.get('/', categoriasGet)

router.get('/:id', categoriasGet)

// SOLO TOKEN VALIDO
router.post('/', [
    validarJWT,
    validarCampos
], categoriasPost)

// SOLO TOKEN VALIDO
router.put('/:id', categoriasPut)

// SOLO TOKEN VALIDO
router.delete('/:id', categoriasDelete)


export { router }