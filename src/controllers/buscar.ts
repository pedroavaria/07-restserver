import { request, response } from "express"
import { isValidObjectId } from "mongoose"
import { Categoria, Producto, Usuario } from '../models/'

const coleccionesPermitidas = [
    'usuarios',
    'productos',
    'categorias',
    'roles'
]

const buscarUsuarios = async (termino: any, res = response) => {
    const isMongoid = isValidObjectId(termino)
    if (isMongoid) {
        const usuario = await Usuario.findOne({_id:termino, estado:true})
        return res.json({
            result: (usuario) ? [usuario] : []
        })
    }
    const regex = new RegExp(termino, 'i')
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado:true }]
    })

    res.json({
        result: usuarios
    })
}

const buscarProductos = async (termino: any, res = response) => {
    const isMongoid = isValidObjectId(termino)
    if (isMongoid) {
        const producto = await Producto.findOne({_id:termino},{estado:true})
            .populate('usuario','nombre')
            .populate('categoria','nombre')
        return res.json({
            result: producto ? [producto] : []
        })
    }
    const regex = new RegExp(termino, 'i')
    const productos = await Producto.find({
        $or: [{ nombre: regex }, { descripcion: regex }],
        $and: [{estado:true}]
    })

    res.json({
        result: productos
    })

}

const buscarCategorias = async (termino: any, res = response) => {
    const isMongoid = isValidObjectId(termino)
    if (isMongoid) {
        const categoria = await Categoria.findOne({_id:termino ,estado:true})
            .populate('usuario','nombre')
        return res.json({
            result: categoria ? [categoria] : []
        })
    }
    const regex = new RegExp(termino, 'i')
    const categorias = await Categoria.find({
        $or: [{ nombre: regex }],
        $and: [{estado:true}]
    }).populate('usuario','nombre')

    res.json({
        result: categorias
    })

}

const buscar = async (req = request, res = response) => {
    const { coleccion, termino } = req.params as any

    const permitido = coleccionesPermitidas.includes(coleccion)
    if (!permitido) {
        return res.status(400).json({
            msg: 'La busqueda no esta permitida'
        })
    }

    switch (coleccion) {
        case 'usuarios':
            await buscarUsuarios(termino, res)
            break;
        case 'productos':
            await buscarProductos(termino, res)
            break;
        case 'categorias':
            await buscarCategorias(termino, res)
            break;
        default:
            res.status(500).json({
                msg: 'Esta busqueda aun no se ha implementado'
            })
            break;
    }
}

export { buscar }