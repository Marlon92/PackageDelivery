const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
    customer: {
        type: String,
        required: true
    },
    description: String,
    amount: Number,
    location: String,
    destination: String,
    active: Boolean,
    step: String,
    truck_id: { type: mongoose.Schema.Types.ObjectId, ref: "truck" },
    receptionDate: { type: Date, default: Date.now }
});

const PackageModel = mongoose.model('package', PackageSchema);

module.exports = PackageModel;