import { request, response } from 'express'
import { Categoria } from '../models'

const categoriasGet = async (req: any = request, res = response) => {
    const { id } = req.params
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }
    // const query = (id) ? {_id:id} : {}
    try {
        const total = await Categoria.estimatedDocumentCount()
        if (id) {
            // buscar por id
            const categoria = await Categoria.findById(id)
                .populate('usuario','nombre')

            return res.json({
                total,
                categoria
            })
        }
        const categorias = await Categoria.find(query)
            .populate('usuario')
            .skip(Number(desde))
            .limit(Number(limite))

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

const categoriasPut = (req: any = request, res = response) => {
    res.json({
        msg: "Todo bien - Put"
    })
}

const categoriasDelete = (req: any = request, res = response) => {
    res.json({
        msg: "Todo bien - Delete"
    })
}

export { categoriasGet, categoriasPost, categoriasPut, categoriasDelete }