const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PilotSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    age: Number
});

const PilotModel = mongoose.model('pilot', PilotSchema);

module.exports = PilotModel;