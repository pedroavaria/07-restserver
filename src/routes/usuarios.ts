import { Router } from 'express'
import { check } from 'express-validator'

//  import { validarCampos } from '../middlewares/validar-campos'
//  import { validarJWT } from '../middlewares/validar-jwt'
//  import { esAdminRole, tieneRole } from '../middlewares/validar-role'
 import { tieneRole, validarCampos, validarJWT } from '../middlewares'

import {
    usuariosDelete,
    usuariosGet,
    usuariosPatch,
    usuariosPost,
    usuariosPut
} from '../controllers/usuarios'
import { emailExiste, esRoleValido, usuarioExiste } from '../helpers/db-validators'
const router = Router()

router.get('/', usuariosGet)

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(usuarioExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol','No es un rol valido').isIn(['USER_ROLE','ADMIN_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost)

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(usuarioExiste),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)



export { router }