import { request, response } from 'express'
import bcryptjs from 'bcryptjs'
import Usuario from '../models/usuario'
import { AnyAaaaRecord } from 'node:dns'

const usuariosGet = async(req = request, res = response) => {
    let  { limite = 5 , desde = 0} = req.query
    limite = isNaN(Number(limite)) ? 5 : Number(limite)
    desde = isNaN(Number(desde)) ? 0 : Number(desde)
    const query = {estado: true}
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(desde)
        .limit(limite)
    ])
    res.json({
        total,
        usuarios
    })
   
}
const usuariosPost = async (req = request, res = response) => {

    const {nombre,correo,password,rol} = req.body
    const usuario:any = new Usuario({nombre,correo,password,rol})
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password,salt)
    // Guardar en BD

    await usuario.save()
    res.json({
        usuario
    })
}
const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params
    const { _id, password, google,correo, ...resto } = req.body
    // TODO validar contra la base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password,salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto)
    res.json({
        usuario
    })
}
const usuariosDelete = async (req:any = request, res = response) => {
    const {id} = req.params
    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false})
    res.json({
        usuario
    })
}
const usuariosPatch = (req = request, res = response) => {

    res.json({
        msg: 'patch API - controlador'
    })
}

export { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch }