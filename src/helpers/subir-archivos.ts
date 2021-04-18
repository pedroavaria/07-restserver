import path from 'path'
import { v4 as uuidv4 } from 'uuid'


const subirArchivos = (files:any,extensionesValidas = ['jpg', 'jpeg', 'gif', 'png'],carpeta:any = '') => {
    return new Promise((resolve,reject) => {
        const { archivo } = files
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]
        // console.log(extension);
    
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es valida, ${extensionesValidas}`)
        }
        const nombreTemp = `${uuidv4()}.${extension}`
        const uploadPath = path.join(__dirname, '/../../uploads/',carpeta, nombreTemp)
    
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err: any) => {
            if (err) {
                return reject(err)
            }

            return resolve(nombreTemp)
        });
    })
}

export { subirArchivos }