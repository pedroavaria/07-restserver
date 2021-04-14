import { Router } from 'express'
import { check } from 'express-validator'
import {
    usuariosDelete,
    usuariosGet,
    usuariosPatch,
    usuariosPost,
    usuariosPut
} from '../controllers/usuarios'
const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post('/',[
    check('correo','El correo no es valido').isEmail()
], usuariosPost)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)



export { router }