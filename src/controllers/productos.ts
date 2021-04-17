import { request, response } from "express";
import { Producto } from "../models";


const obtenerProductos = async (req: any = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('categoria', 'nombre')
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        productos
    })
}
const obtenerProducto = async (req: any = request, res = response) => {
    const { id } = req.params
    try {
        const producto: any = await Producto.findById(id)
            .populate('categoria', 'nombre')
            .populate('usuario', 'nombre')
        if (!producto.estado) {
            return res.status(400).json({
                msg: 'El producto no existe'
            })
        }
        res.json({
            producto
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comunicarse con el Administrador'
        })
    }
}

const crearProducto = async (req: any = request, res = response) => {
    const { categoria, precio = 0, descripcion } = req.body
    const nombre = req.body.nombre.toUpperCase()
    const usuario = req.usuario._id
    try {
        const existeProducto = await Producto.findOne({ nombre })
        if (existeProducto) {
            return res.status(400).json({
                msg: `El producto con el nombre ${nombre} ya existe`
            })
        }
        const producto = new Producto({
            nombre,
            categoria,
            precio,
            usuario,
            descripcion
        })
        const newProducto = await producto.save()
        res.status(201).json({
            newProducto
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Contactar con el Administrador'
        })
    }
}

const actualizarProducto = async (req: any = request, res = response) => {
    const { id } = req.params
    const { usuario, estado, __v, _id, ...producto } = req.body
    const nombre = req.body.nombre.toUpperCase()
    producto.nombre = nombre
    producto.usuario = req.usuario._id
    try {
        const existeNombre = await Producto.findOne({ nombre })
        if (existeNombre && existeNombre._id != id) {
            return res.status(400).json({
                msg: `El producto con el nombre ${nombre} ya existe`
            })
        }
        const productoUpdated = await Producto.findByIdAndUpdate(id, producto, { new: true })
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
        res.json({
            productoUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Favor comunicarse con el Administrador'
        })
    }
}

const borrarProducto = async (req = request, res = response) => {
    const { id } = req.params as any
    try {
        const producto = await Producto.findByIdAndUpdate(id, { estado: false })
        res.json({
            producto
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Favor contactar con el Administrador'
        })
    }

}

export { obtenerProductos, crearProducto, obtenerProducto, actualizarProducto, borrarProducto }