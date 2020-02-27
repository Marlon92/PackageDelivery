const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageRouteSchema = new Schema({
    package_id: { type: mongoose.Schema.Types.ObjectId, ref: "package" },
    truck_id: { type: mongoose.Schema.Types.ObjectId, ref: "truck" },
    routingDate: Date.now()
});

const PackageRouteModel = mongoose.model('packageRoute', PackageRouteSchema);

module.exports = PackageRouteModel;