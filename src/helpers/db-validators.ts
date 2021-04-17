import { Categoria, Producto, Role, Usuario } from '../models'

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe`)
    }
}

const usuarioExiste = async (id = '') => {
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`El usuario con el id ${id} no existe`)
    }
}

const categoriaExiste = async(id = '') => {
    try {
        const existeCategoria = await Categoria.findById(id)
        if (!existeCategoria) {
            throw new Error(`La categoria con el id ${id} no existe`)
        }        
    } catch (error) {
        throw new Error(`La categoria con el id ${id} no existe`)
    }
}

const productoExiste = async(id = '') => {
    try {
        const existeProducto = await Producto.findById(id)
        if (!existeProducto) {
            throw new Error(`El producto con el id ${id} no existe`)
        }        
    } catch (error) {
        throw new Error(`El producto con el id ${id} no existe`)
    }
}

export { esRoleValido, emailExiste, usuarioExiste, categoriaExiste, productoExiste }