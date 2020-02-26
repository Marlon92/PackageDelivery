const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
    cliente: {
        type: String,
        required: true
    },
    description: String,
    amount: Number,
    location: String,
    destination: String,
    active: Boolean,
    step: String,
    receptionDate: { type: Date, default: Date.now },
});

const PackageModel = mongoose.model('package', PackageSchema);

module.exports = PackageModel;