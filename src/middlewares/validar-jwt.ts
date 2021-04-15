import { request, response } from 'express';
import jwt from 'jsonwebtoken'

const validarJWT = (req = request, res = response, next: any) => {
    const token = req.header('x-token')

    console.log(token);

    next()

}

export { validarJWT }