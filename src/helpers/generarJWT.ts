import jwt from "jsonwebtoken"


const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload: any = { uid }
        const secret: any = process.env.SECRETPRIVATEKEY
        jwt.sign(payload, secret, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }
        })
    })
}

export { generarJWT }