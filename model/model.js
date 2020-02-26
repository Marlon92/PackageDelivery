const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

//Con esta función obtenemos el password y lo hasheamos para luego guardarlo
UserSchema.pre('save', async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

//Validamos que las credenciales del cliente sean correctas
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    //Comparamos la contraseña de la base de datos, con la contraseña hasheada del usuario
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;