const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

//Recibimos los datos de registro del usuario y los enviamos al middleware creado en auth.js para su 
//creación
router.post('/signup', passport.authenticate('signup', { session: false }), async(req, res, next) => {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
});

//Recibmos los datos de inicio de sesión del cliente y lo enviamos al middleware creado en auth.js
//para validar las credenciales
router.post('/login', async(req, res, next) => {
    passport.authenticate('login', async(err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error(info.message)
                const jsonError = { Status: 0, Error: error.message };
                return res.json(jsonError);
            }
            req.login(user, { session: false }, async(error) => {
                if (error) return next(error)
                const body = { _id: user._id, email: user.email };
                const userEmail = user.email;
                const token = jwt.sign({ user: body }, 'top_secret');
                //retornamos el token de inicio de sesión al usuario
                return res.json({ token, userEmail, Status: 1 });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;