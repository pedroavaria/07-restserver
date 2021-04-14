import { request, response } from 'express'
import bcryptjs from 'bcryptjs'
import Usuario from '../models/usuario'
import { validationResult } from 'express-validator'

const usuariosGet = async(req = request, res = response) => {
    
    let listaUsuarios:any = await Usuario.find({})
    listaUsuarios = listaUsuarios.map((usuario:any) => {
        const {nombre,correo} = usuario
        return {
            nombre,
            correo
        }
    })
    res.json(listaUsuarios)
   
}
const usuariosPost = async (req = request, res = response) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    const {nombre,correo,password,rol} = req.body
    const usuario:any = new Usuario({nombre,correo,password,rol})
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo})
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        })
    }
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password,salt)
    // Guardar en BD

    await usuario.save()
    res.json({
        msg: 'post API - controlador',
        usuario
    })
}
const usuariosPut = (req = request, res = response) => {
    const { id } = req.params
    res.json({
        msg: 'put API - controlador',
        id
    })
}
const usuariosDelete = (req = request, res = response) => {

    res.json({
        msg: 'delete API - controlador'
    })
}
const usuariosPatch = (req = request, res = response) => {

    res.json({
        msg: 'patch API - controlador'
    })
}

export { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch }