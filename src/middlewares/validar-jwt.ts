import { request, response } from 'express';
import jwt from 'jsonwebtoken'
import Usuario from '../models/usuario';

const validarJWT = async(req: any = request, res = response, next: any) => {
    const token = req.header('x-token')
    const secret: any = process.env.SECRETPRIVATEKEY
    if (!token) {
        return res.status(401).json({
            msg: "no hay token en la peticion"
        })
    }
    // console.log(token);
    try {
        const { uid } = jwt.verify(token, secret) as any
        // leer usuario que corresponde al uid 
        const usuario:any = await Usuario.findById(uid)
        if (!usuario) {
            return respuesta(res,'Token no valido - usuario borrado')
        }
        if (!usuario.estado) {
            return respuesta(res,'Token no valido - usuario false') 
        } 
        req.usuario = usuario
        next()
    } catch (error) {
        console.log(error);
        respuesta(res)
    }

}

const respuesta = (res = response,msg = 'Toke no valido') => {
    res.status(401).json({
        msg
    })
}

export { validarJWT }