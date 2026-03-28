import React, { useEffect, useState } from "react";
import axios from "axios";
import IndiaThreatMap from "./components/IndiaThreatMap";
import DisasterCard from "./components/DisasterCard";
import AdvancedAnalytics from "./components/AdvancedAnalytics";
import satellite from "./images/satellite.jpg";
import cyclone from "./images/cyclone.jpg";
import "./App.css";

function App() {

//////////////////////////////////////////////////
// STATE
//////////////////////////////////////////////////

const [disasters, setDisasters] = useState([]);
const [view, setView] = useState("all");
const [criticalData, setCriticalData] = useState([]);

//////////////////////////////////////////////////
// FETCH DATA
//////////////////////////////////////////////////

const fetchData = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/disasters");
    setDisasters(res.data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  fetchData();
  const interval = setInterval(fetchData, 10000);
  return () => clearInterval(interval);
}, []);

//////////////////////////////////////////////////
// DEPLOY RESOURCES
//////////////////////////////////////////////////

const deployResources = async (id) => {
  try {
    await axios.put(`http://localhost:5000/api/deploy/${id}`);
    alert("Resources deployed");
    fetchData();
  } catch (err) {
    console.error(err);
  }
};

//////////////////////////////////////////////////
// NAVIGATION
//////////////////////////////////////////////////

const goHome = () => {
  setView("all");
};

//////////////////////////////////////////////////
// DOWNLOAD DATA
//////////////////////////////////////////////////

const handleData = () => {

  setView("all");

  let content = "DISASTER REPORT\n\n";

  disasters.forEach(d => {
    content += `
Type: ${d.type}
Region: ${d.region}
Rainfall: ${d.rainfall_mm}
Wind: ${d.wind_speed_kmph}
Severity: ${d.severity}
Resources: ${d.status}
-------------------------
`;
  });

  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "disaster_report.txt";
  link.click();
};

//////////////////////////////////////////////////
// CRITICAL ALERTS
//////////////////////////////////////////////////

const handleCritical = () => {
  setView("critical");
  const critical = disasters.filter(d => d.severity === "Critical");
  setCriticalData(critical);
};

//////////////////////////////////////////////////
// LEFT PANEL DATA
//////////////////////////////////////////////////

const leftPanelData =
  view === "critical"
    ? disasters.filter(d => d.severity === "Critical")
    : disasters;

//////////////////////////////////////////////////
// CALCULATED STATS
//////////////////////////////////////////////////

const activeDisasters = disasters.length;

const criticalCount = disasters.filter(d => d.severity === "Critical").length;

const deployedCount = disasters.filter(d => d.status === "Deployed").length;

const avgIntensity =
  disasters.length > 0
    ? Math.round(
        disasters.reduce((sum, d) => sum + d.intensity, 0) /
        disasters.length
      )
    : 0;

//////////////////////////////////////////////////
// UI
//////////////////////////////////////////////////

return (
<div className="app-container">

{/* HEADER */}
<header className="topbar">

<h2 onClick={goHome} style={{ cursor: "pointer" }}>
INDIA SATELLITE DISASTER MANAGEMENT PORTAL
</h2>

<nav>
<button onClick={handleData}>Data</button>
<button onClick={handleCritical}>Critical Alerts</button>
</nav>

</header>

{/* MAIN */}
<div className="main-layout">

{/* LEFT PANEL */}
<div className="sidebar">

<h3>
{view === "critical"
  ? "Critical Alerts"
  : "All Weather Conditions"}
</h3>

{leftPanelData.slice(0, 6).map(d => (
<DisasterCard
key={d._id}
data={d}
deploy={deployResources}
/>
))}

</div>

{/* CENTER PANEL */}
<div className="center-panel">

{/* MAP */}
<div className="map-area">
<IndiaThreatMap alerts={disasters} />
</div>

{/* GRAPH BELOW */}
<div className="timeline">
<AdvancedAnalytics disasters={disasters} />
</div>

</div>

{/* RIGHT PANEL */}
<div className="right-panel">

<h3>
{view === "critical"
  ? "Critical Conditions"
  : "Satellite Data"}
</h3>

{view === "critical" ? (

criticalData.length === 0 ? (
<p>No critical alerts</p>
) : (
criticalData.map((d, i) => (
<div key={i} className="critical-box">

<p><b>{d.type}</b> - {d.region}</p>
<p>Rainfall: {d.rainfall_mm}</p>
<p>Wind: {d.wind_speed_kmph}</p>
<p>Status: {d.status}</p>

</div>
))
)

) : (

<>

{/* IMAGES */}
<img src={satellite} className="sat-image" alt="satellite"/>
<img src={cyclone} className="sat-image" alt="cyclone"/>

{/* 📊 LIVE DATA PANEL */}
<div className="data-panel">

<h4>Live Statistics</h4>

<p>Active Disasters: {activeDisasters}</p>

<p>Critical Alerts: {criticalCount}</p>

<p>Resources Deployed: {deployedCount}</p>

<p>Avg Intensity: {avgIntensity}</p>

</div>

</>

)}

</div>

</div>

</div>
);
}

export default App;