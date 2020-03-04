const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const cors = require('cors');

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

var originsWhitelist = [
    'http://localhost:4200', //this is my front-end url for development
    //'http://www.myproductionurl.com'
];
var corsOptions = {
        origin: function(origin, callback) {
            var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
            callback(null, isWhitelisted);
        },
        credentials: true
    }
    //here is the magic
app.use(cors(corsOptions));

/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});*/

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