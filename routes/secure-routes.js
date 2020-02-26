const express = require('express');

const router = express.Router();

//Aquí vamos a declarar las rutas donde solo los usuarios autenticados pueden acceder

//mostramos la data del cliente
router.get('/profile', (req, res, next) => {
    res.json({
        message: 'Succesfully',
        user: req.user,
        token: req.query.secret_token
    })
});

module.exports = router;