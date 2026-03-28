import React from "react";

function DisasterCard({ data, deploy }) {

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical": return "red";
      case "High": return "orange";
      case "Moderate": return "green";
      case "Low": return "lightgreen";
      default: return "gray";
    }
  };

  return (
    <div className="alert-card">

      {/* 🔴 COLORED INDICATOR */}
      <div
        className="severity-indicator"
        style={{ backgroundColor: getSeverityColor(data.severity) }}
      ></div>

      <p><b>{data.type}</b></p>
      <p>{data.region}</p>

      <p>
        Severity:{" "}
        <span style={{ color: getSeverityColor(data.severity), fontWeight: "bold" }}>
          {data.severity}
        </span>
      </p>

      <p>Status: {data.status}</p>

      {data.status === "Not Deployed" && (
        <button onClick={() => deploy(data._id)}>
          Deploy Resources
        </button>
      )}

    </div>
  );
}

export default DisasterCard;