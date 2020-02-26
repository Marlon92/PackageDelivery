const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PilotSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const PilotModel = mongoose.model('pilot', PilotSchema);

module.exports = PilotModel;