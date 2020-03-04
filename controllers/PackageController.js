const PackageModel = require('../model/Package');
const PilotModel = require('../model/Pilot');
const LogModel = require('../model/Log');
//Creamos un middleware de passport para capturar los datos de registro del usuario
exports.create = (req, res) => {
    // Validate request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Package content can not be empty"
        });
    }

    // Create a Package
    const package = new PackageModel({
        customer: req.body.customer,
        description: req.body.description,
        amount: req.body.amount,
        location: req.body.location,
        destination: req.body.destination,
        truck_id: req.body.truck_id,
        active: true,
        step: 'ON HAND',
        receptionDate: Date.now()
    });

    // Save Note in the database
    package.save()
        .then(data => {
            //Save the log
            const log = new LogModel({
                description: "Package Received",
                comment: "Package Received By " + req.user.email,
                date: Date.now(),
                user_id: req.user._id
            });

            log.save()
                .then(logData => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while receiving the Package."
                    });
                });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while receiving the Package."
            });
        });
};

exports.findAll = (req, res) => {
    PackageModel.find().populate([{ path: 'truck_id', populate: { path: 'pilot_id' }}])
        .then(package => {
            res.json(package);
        }).catch(err => {
            res.status(500).send({
                message: "Data not found" //message: err.message || "Has ocurred an error"
            });
        });
};

exports.findByTruck = (req, res) => {
    const truck_id = req.params.truckId;
    PackageModel.find({ truck_id }).populate('truck_id')
        .then(packages => {
            res.send(packages);
        }).catch(err => {
            res.status(500).send({
                //message: err.message || "Has ocurred an error"
                message: "Data not found"
            });
        });
};

/*
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
};*/