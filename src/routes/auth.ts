import { Router } from 'express'
import { check } from 'express-validator'
import { login } from '../controllers/auth'
import { validarCampos } from '../middlewares/validar-campos'

const router = Router()

router.post('/login',[
    check('correo','El correo no es valido').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],login)

export {router}