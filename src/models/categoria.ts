import { Schema, model } from 'mongoose'

const CategoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})
const Categoria = model('Categoria', CategoriaSchema)
export { Categoria }