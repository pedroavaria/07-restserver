import { Router } from 'express';
import { cargarArchivo, mostrarImagenes, actualizarImagenCloudinary } from '../controllers/upload';
import { check } from 'express-validator';
import { validarArchivo, validarCampos } from '../middlewares';
import { coleccionesPermitidas } from '../helpers';

const router = Router()

router.post('/',[validarArchivo],cargarArchivo)
router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','El id no es valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagenCloudinary)

router.get('/:coleccion/:id', [
    check('id','EL id no es valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagenes)

export default router