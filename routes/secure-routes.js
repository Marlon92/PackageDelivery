const express = require('express');
const router = express.Router();
const pilots = require('../controllers/PilotController.js');
const trucks = require('../controllers/TruckController.js');
const logs = require('../controllers/LogController');
//Aquí vamos a declarar las rutas donde solo los usuarios autenticados pueden acceder

//mostramos la data del cliente
router.get('/profile', (req, res, next) => {
    res.json({
        message: 'Succesfully',
        user: req.user,
        token: req.query.secret_token
    })
});

router.post('/createPilot', pilots.create);
router.post('/registerTruck', trucks.create);
router.get('/getAllPilots', pilots.findAll);
router.get('/getAllTrucks', trucks.findAll);
router.get('/getLogsByUser/:userId', logs.findByUser);
router.put('/trucks/:truckId', trucks.update);

module.exports = router;