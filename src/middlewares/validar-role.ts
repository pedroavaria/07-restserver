import { request, response } from "express"


const esAdminRole = (req: any = request, res = response, next: any) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere validar el role sin validar el token primero'
        })
    }

    const { rol, nombre } = req.usuario
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        })
    }

    next()
}

const tieneRole = (...roles: Array<any>) => {
    return (req: any = request, res = response, next: any) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere validar el role sin validar el token primero'
            })
        }

        if (!roles.includes(req.usuario.rol)) {
            res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next()
    }
}

export { esAdminRole, tieneRole }