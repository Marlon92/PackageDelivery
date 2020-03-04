const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/model');
const LogModel = require('../model/Log');
//Creamos un middleware de passport para capturar los datos de registro del usuario
passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async(email, password, done) => {
    try {
        //Guardamos la información del usuario a la base de datos
        const user = await UserModel.create({ email, password });
        return done(null, user);
    } catch (error) {
        done(error);
    }
}));

//Creamos un middleware de Passport para capturar los datos de inicio de sesión del usuario
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {
    try {
        //Buscamos al usuario por su username
        const user = await UserModel.findOne({ email });
        if (!user) {
            //Si el usuario no existe devolvemos que no existe
            return done(null, false, { message: 'User not found' });
        }
        //Validamos si la contraseña de la base de datos es la misma con la ingresada por el usuario
        const validate = await user.isValidPassword(password);
        if (!validate) {
            console.log("first");
            return done(null, false, { message: 'Wrong Password' });
        }

        //Save the log

        const log = new LogModel({
            description: "LogIn",
            comment: "User " + user.email + " logged Succesfully",
            date: Date.now(),
            user_id: user._id,
        });

        //Guardo el log de inicio de sesión
        log.save()
            .then(logData => {}).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred in the log creation."
                });
            });

        return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
        return done(error);
    }
}));

const JWTstrategy = require('passport-jwt').Strategy;
//Utilizamos esto para obtener el token que el usuario envia al hacer un request.
const ExtractJWT = require('passport-jwt').ExtractJwt;

//Verificamos que el token sea valido
passport.use(new JWTstrategy({
    secretOrKey: 'top_secret',
    //El usuario envia el token a través de un parámetro llamado secret_token, de ahí lo obtenemos
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('Authorization')
}, async(token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));