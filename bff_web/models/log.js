const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    method: { type: String, required: true },
    url: { type: String, required: true },
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;