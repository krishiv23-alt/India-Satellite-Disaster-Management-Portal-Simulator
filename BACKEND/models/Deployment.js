const mongoose = require("mongoose");

const deploymentSchema = new mongoose.Schema({

 disasterId: String,
 type: String,
 region: String,
 severity: String,
 status: String,
 deployed_at: String

});

module.exports = mongoose.model("Deployment", deploymentSchema);