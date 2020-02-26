const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const UserModel = require('./model/model');

require('./auth/auth');

//conexión a Mongo DB
mongoose.connect('mongodb://127.0.0.1:27017/packagedelivery', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');

app.use('/', routes);
//Middleware donde solo los usuarios autenticados pueden registrarse
app.use('/api', passport.authenticate('jwt', { session: false }), secureRoute);

//capturamos errores
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

//levantamos nuestro server en el puerto 4000
app.listen(4000, () => {
    console.log('Server started')
});