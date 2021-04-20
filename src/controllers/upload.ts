import path from 'path'
import fs from 'fs'
import { request, response } from 'express';
import { subirArchivos } from '../helpers';
import { Usuario, Producto } from '../models'
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(<string>process.env.CLOUDINARY_URL);
export const cargarArchivo = async (req: any = request, res = response) => {

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
    try {
        const nombre = await subirArchivos(req.files, undefined, 'imgs')
        res.json({
            nombre
        });
    } catch (msg) {
        res.status(400).json({ msg })
    }

}

export const actualizarImagenCloudinary = async (req: any, res: any) => {
    const { coleccion, id } = req.params
    let modelo: any

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({
                msg: 'Validación no controlada'
            })
            break;
    }


    // Limpiar imagenes previas
    if (modelo.img) {
        const nombreArr:string[] = modelo.img.split('/')
        const nombre = nombreArr[nombreArr.length - 1]
        const [ public_id ] = nombre.split('.')
        await cloudinary.uploader.destroy(public_id)
    }

    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)


    // const nombre = await subirArchivos(req.files, undefined, coleccion)
    modelo.img = secure_url
    modelo.save()

    res.json(modelo)
}

const actualizarImagen = async (req: any, res: any) => {
    const { coleccion, id } = req.params
    let modelo: any

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({
                msg: 'Validación no controlada'
            })
            break;
    }


    // Limpiar imagenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '/../../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen)
        }
    }



    const nombre = await subirArchivos(req.files, undefined, coleccion)
    modelo.img = nombre
    modelo.save()

    res.json({
        modelo
    })
}

export const mostrarImagenes = async (req: any, res: any) => {
    const { coleccion, id } = req.params
    let modelo: any
    const noImage = path.join(__dirname, '/../../assets/no-image.jpg')
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.sendFile(noImage)
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.sendFile(noImage)
            }
            break;
        default:
            return res.status(500).json({
                msg: 'Validación no controlada'
            })
            break;
    }
    // Limpiar imagenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '/../../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }

    return res.sendFile(noImage)
}