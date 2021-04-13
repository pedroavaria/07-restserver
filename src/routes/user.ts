import { Router } from 'express'
const router = Router()

router.get('/', (req: any, res: any) => {
    res.json({
        ok: true,
        msg: 'get API'
    })
})
router.put('/', (req: any, res: any) => {
    res.json({
        ok: true,
        msg: 'put API'
    })
})
router.post('/', (req: any, res: any) => {
    res.status(201).json({
        ok: true,
        msg: 'post API'
    })
})
router.delete('/', (req: any, res: any) => {
    res.json({
        ok: true,
        msg: 'delete API'
    })
})

export {router}