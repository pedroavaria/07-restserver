import { Schema, model } from 'mongoose'

const CategoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
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
CategoriaSchema.methods.toJSON = function () {
    const {__v, _id, estado, usuario , ...categoria} = this.toObject() as any
    const { _id:uid, ...resto } = usuario 
    categoria.id = _id
    resto.uid = uid
    categoria.usuario = resto
    return categoria
}


const Categoria = model('Categoria', CategoriaSchema)
export { Categoria }