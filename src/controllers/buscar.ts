import { request, response } from "express"


const buscar = (req = request, res = response) => {
    const { coleccion, termino } = req.params as any



    res.json({
        coleccion,
        termino
    })
}

export {buscar}