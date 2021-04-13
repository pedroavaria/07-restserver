import { request, response } from 'express'


const usuariosGet = (req = request, res = response) => {
    const {q,nombre = 'No name',apikey,page = 1,limit} = req.query
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}
const usuariosPost = (req = request, res = response) => {
    const { nombre, edad } = req.body
    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
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