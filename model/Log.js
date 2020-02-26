const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    description: String,
    comment: String,
    date: { type: Date, default: Date.now },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
});

const LogModel = mongoose.model('log', LogSchema);

module.exports = LogModel;