const mongoose = require('mongoose');
const PilotModel = require('../model/Pilot');
const Schema = mongoose.Schema;

const TruckSchema = new Schema({
    truckRegistration: {
        type: String,
        required: true
    },
    brand: String,
    model: Number,
    color: String,
    chasis: String,
    pilot_id: { type: mongoose.Schema.Types.ObjectId, ref: "pilot" }
});

const TruckModel = mongoose.model('truck', TruckSchema);

module.exports = TruckModel;