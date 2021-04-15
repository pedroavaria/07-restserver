import { request, response } from 'express'
import bcryptjs from 'bcryptjs'
import Usuario from '../models/usuario'
import { generarJWT } from '../helpers/generarJWT'

const login = async (req = request, res = response) => {
    const { correo, password } = req.body
    try {

        // Verificar si el email existe y si el usuario existe
        const usuario:any = await Usuario.findOne({ correo })
        if (!usuario || !usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        // Verificar la contraseña
        const validaPassword = bcryptjs.compareSync(password,usuario.password)
        if (!validaPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }
        // Generar JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }

}

export { login }