const TruckModel = require('../model/Truck');
const LogModel = require('../model/Log');
//Creamos un middleware de passport para capturar los datos de registro del usuario
require('../model/Pilot');
exports.create = (req, res) => {
    // Validate request
    if (!req.body.truckRegistration) {
        return res.status(400).send({
            message: "Truck content can not be empty"
        });
    }

    // Create a Note
    const truck = new TruckModel({
        truckRegistration: req.body.truckRegistration,
        brand: req.body.brand,
        model: req.body.model,
        color: req.body.color,
        chasis: req.body.chasis,
        pilot_id: req.body.pilot_id,
    });

    // Save Note in the database
    truck.save()
        .then(data => {
            //Save the log
            const log = new LogModel({
                description: "Truck Created",
                comment: "Process for truck register",
                date: Date.now(),
                user_id: req.user._id
            });

            log.save()
                .then(logData => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Truck."
                    });
                });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Truck."
            });
        });
};

exports.findAll = (req, res) => {
    TruckModel.find().populate("pilot_id")
        .then(trucks => {
            res.json(trucks);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Has ocurred an error"
            });
        });
};

exports.update = (req, res) => {
    if (!req.body.truckRegistration) {
        return res.status(400).send({
            message: "Truck Registration can not be empty"
        });
    }
    // Find note and update it with the request body
    TruckModel.findByIdAndUpdate(req.params.truckId, {
            truckRegistration: req.body.truckRegistration,
            brand: req.body.brand,
            model: req.body.model,
            color: req.body.color,
            chasis: req.body.chasis,
            pilot_id: req.body.pilot_id,
        }, { new: true })
        .then(truck => {
            if (!truck) {
                return res.status(404).send({
                    message: "Truck not found with id " + req.params.truckId
                });
            }
            res.send(truck);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Truck not found with id " + req.params.truckId
                });
            }
            return res.status(500).send({
                message: "Error updating Truck with id " + req.params.truckId
            });
        });
};