const LogModel = require('../model/Log');

//obtenemos los logs por usuario
exports.findByUser = (req, res) => {
    const user_id = req.params.userId;
    LogModel.find({ user_id }).populate('user_id', 'email')
        .then(logs => {
            res.send(logs);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Has ocurred an error"
            });
        });
};