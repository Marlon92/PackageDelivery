const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageRouteSchema = new Schema({
    package_id,
    truck_id,
    routingDate,
});

const PackageRouteModel = mongoose.model('packageRoute', PackageRouteSchema);

module.exports = PackageRouteModel;