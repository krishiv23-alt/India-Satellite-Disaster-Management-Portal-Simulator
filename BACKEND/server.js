const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config(); // ✅ IMPORTANT

const Disaster = require("./models/Disaster");
const Deployment = require("./models/Deployment");

const app = express();
app.use(cors());
app.use(express.json());

//////////////////////////////////////////////////
// ✅ MONGODB CONNECTION (FIXED)
//////////////////////////////////////////////////

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Mongo Error ❌", err));

//////////////////////////////////////////////////
// DATA SETUP
//////////////////////////////////////////////////

const regions = [
  "Delhi","Mumbai","Chennai","Kolkata","Hyderabad","Gujarat","Kerala","Odisha Coast"
];

const disasterTypes = [
  "Flood","Cyclone","Wildfire","Earthquake","Landslide"
];

function random(min,max){
 return Math.floor(Math.random()*(max-min+1))+min;
}

function classifySeverity(intensity){
 if(intensity>85) return "Critical";
 if(intensity>65) return "High";
 if(intensity>40) return "Moderate";
 return "Low";
}

//////////////////////////////////////////////////
// GENERATE DISASTER
//////////////////////////////////////////////////

async function generateDisaster(){
 try{

  const intensity=random(30,100);
  const rainfall=random(50,300);
  const wind=random(20,150);
  const population=random(10000,200000);

  const disaster = new Disaster({
   type: disasterTypes[random(0,disasterTypes.length-1)],
   region: regions[random(0,regions.length-1)],
   intensity,
   rainfall_mm: rainfall,
   wind_speed_kmph: wind,
   population_at_risk: population,
   severity: classifySeverity(intensity),
   detected_at: new Date().toLocaleTimeString()
  });

  await disaster.save();
  console.log("Saved disaster");

 }catch(err){
  console.log("Generate Error ❌", err);
 }
}

setInterval(generateDisaster,15000);

//////////////////////////////////////////////////
// ROOT ROUTE (FIXED)
//////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

//////////////////////////////////////////////////
// GET DISASTERS (DEBUG IMPROVED)
//////////////////////////////////////////////////

app.get("/api/disasters", async (req,res)=>{
 try{
  const data = await Disaster.find().sort({ _id: -1 });
  res.json(data);
 }catch(err){
  console.log("Fetch Error ❌", err);
  res.status(500).json({error: err.message});
 }
});

//////////////////////////////////////////////////
// DEPLOY RESOURCES
//////////////////////////////////////////////////

app.put("/api/deploy/:id", async (req,res)=>{
 try{

  const id = req.params.id;

  const disaster = await Disaster.findByIdAndUpdate(
    id,
    { status: "Deployed" },
    { new: true }
  );

  if(!disaster){
    return res.status(404).json({error:"Not found"});
  }

  const deployment = new Deployment({
   disasterId: disaster._id,
   type: disaster.type,
   region: disaster.region,
   severity: disaster.severity,
   status: disaster.status,
   deployed_at: new Date().toISOString()
  });

  await deployment.save();

  if (!fs.existsSync("deployments.csv")) {
    fs.writeFileSync(
      "deployments.csv",
      "ID,Type,Region,Intensity,Rainfall,Wind,Population,Severity,Status,Timestamp\n"
    );
  }

  const row = `${disaster._id},${disaster.type},${disaster.region},${disaster.intensity},${disaster.rainfall_mm},${disaster.wind_speed_kmph},${disaster.population_at_risk},${disaster.severity},${disaster.status},${new Date().toISOString()}\n`;

  fs.appendFileSync("deployments.csv", row);

  res.json({message:"Deployed"});

 }catch(err){
  console.log("Deploy Error ❌", err);
  res.status(500).json({error: err.message});
 }
});

//////////////////////////////////////////////////
// START SERVER (FIXED FOR RAILWAY)
//////////////////////////////////////////////////

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
 console.log(`Server running on port ${PORT}`);
});
