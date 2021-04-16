import { request, response } from 'express'
import { Categoria } from '../models'

const obtenerCategorias = async (req: any = request, res = response) => {
    const { id } = req.params
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }
    try {
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            await Categoria.find(query)
                .populate('usuario', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.json({
            total,
            categorias
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Favor comunicarse con el administrador'
        })
    }
}

const obtenerCategoria = async (req: any = request, res = response) => {
    const { id } = req.params
    try {
        const categoria = await Categoria.findById(id)
            .populate('usuario', 'nombre')
        res.json({
            categoria
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contactar con un administrador'
        })
    }
}


const categoriasPost = async (req: any = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB: any = await Categoria.findOne({ nombre })

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)
    const nuevaCategoria = await categoria.save()

    res.status(201).json({
        nuevaCategoria
    })
}

const actualizarCategoria = async (req: any = request, res = response) => {
    const { id } = req.params
    const nombre = req.body.nombre.toUpperCase()
    const usuario = req.usuario._id
    try {
        const categoria = await Categoria.findByIdAndUpdate(id, { nombre,usuario }, { new: true })
            .populate('usuario', 'nombre')
        res.json({
            categoria
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comunicarse con el administrador'
        })

    }
}

const categoriasDelete = async (req: any = request, res = response) => {
    const { id } = req.params
    try {
        const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })
            .populate('usuario', 'nombre')
        res.json({
            categoria
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contactar con el administrador'
        })
    }
}

export { obtenerCategorias, categoriasPost, actualizarCategoria, categoriasDelete, obtenerCategoria }