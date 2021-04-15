import { request, response } from 'express'

const categoriasGet = (req: any = request, res = response) => {
    res.json({
        msg: "Todo bien - Get"
    })
}

const categoriasPost = (req: any = request, res = response) => {
    res.json({
        msg: "Todo bien - Post"
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