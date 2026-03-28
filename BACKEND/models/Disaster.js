const mongoose = require("mongoose");

const disasterSchema = new mongoose.Schema({

 type: String,
 region: String,
 intensity: Number,
 rainfall_mm: Number,
 wind_speed_kmph: Number,
 population_at_risk: Number,
 severity: String,
 status: { type: String, default: "Not Deployed" },
 detected_at: String

});

module.exports = mongoose.model("Disaster", disasterSchema);