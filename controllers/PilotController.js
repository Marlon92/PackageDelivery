const PilotModel = require('../model/Pilot');
const LogModel = require('../model/Log');
//Creamos un middleware de passport para capturar los datos de registro del usuario
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
    if (!req.body.name) {
        return res.status(400).send({
            message: "Pilot content can not be empty"
        });
    }

    // Create a Note
    const pilot = new PilotModel({
        name: req.body.name,
        address: req.body.address,
        age: req.body.age
    });

    // Save Note in the database
    pilot.save()
        .then(data => {
            //Save the log
            const log = new LogModel({
                description: "Pilot Created",
                comment: "Process for pilot creation",
                date: Date.now(),
                user_id: req.user._id
            });

            log.save()
                .then(logData => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Pilot."
                    });
                });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Pilot."
            });
        });
};

//Traemos todos los pilotos registrados

exports.findAll = (req, res) => {
    PilotModel.find()
        .then(pilots => {
            res.send(pilots);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Has ocurred an error"
            });
        });
};