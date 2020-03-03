const express = require('express');
const router = express.Router();
const pilots = require('../controllers/PilotController.js');
const trucks = require('../controllers/TruckController.js');
const logs = require('../controllers/LogController');
const package = require('../controllers/PackageController.js');
//Aquí vamos a declarar las rutas donde solo los usuarios autenticados pueden acceder

//mostramos la data del cliente
router.get('/packageAll', (req, res, next) => {
    console.log("Jjjjj");
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
router.post('/package', package.create);
<<<<<<< HEAD
//router.get('/packageAll', package.findAll);
=======
router.get('/package', package.findAll);
router.get('/package/:truckId', package.findByTruck);
>>>>>>> 72ee8a0fc2399fc039ed0d261ef9ec8abbe285f2

module.exports = router;