import Role from '../models/role'
import Usuario from '../models/usuario'

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste =  async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo})
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe`)
    }
}

const usuarioExiste =  async(id = '') => {
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`El usuario con el id ${id} no existe`)
    }
}

export { esRoleValido ,emailExiste, usuarioExiste}