

const validarArchivo = async (req: any, res: any, next: any) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: 'No hay archivos en la petición' });
    }

    next()
}

export { validarArchivo }
