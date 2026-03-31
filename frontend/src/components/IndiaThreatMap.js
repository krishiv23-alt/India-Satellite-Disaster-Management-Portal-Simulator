import React from "react";
import indiaMap from "../images/india-map.png";

function IndiaThreatMap({ alerts }) {

const cityCoordinates={
Delhi:{top:"25%",left:"34%"},
Mumbai:{top:"55%",left:"26%"},
Chennai:{top:"80%",left:"42%"},
Kolkata:{top:"44%",left:"64%"},
Hyderabad:{top:"60%",left:"48%"},
Bangalore:{top:"72%",left:"40%"},
Kerala:{top:"86%",left:"36"},
Gujarat:{top:"48%",left:"20%"},
"Odisha Coast":{top:"52%",left:"63%"}



};



//////////////////////////////////////////////////
// 🔴 SHOW ONLY ACTIVE CRITICAL DISASTERS
//////////////////////////////////////////////////

const activeCritical = alerts.filter(
  a => a.severity === "Critical" && a.status !== "Deployed"
);

return (

<div className="india-map">

<img src={indiaMap} className="india-svg" alt="India Map"/>

{activeCritical.map((a, i) => {

  const pos = cityCoordinates[a.region];
  if (!pos) return null;

  return (
    <div
      key={a._id || i}
      className="alert-dot"
      style={{ top: pos.top, left: pos.left }}
      title={a.region}
    ></div>
  );
})}

</div>

);

}

export default IndiaThreatMap;
