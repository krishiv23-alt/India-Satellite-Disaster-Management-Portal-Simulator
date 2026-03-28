import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

function Analytics({ disasters }) {

  const severityCount = {
    Low: 0,
    Moderate: 0,
    High: 0,
    Critical: 0
  };

  disasters.forEach(d => {
    severityCount[d.severity]++;
  });

  const barData = {
    labels: Object.keys(severityCount),
    datasets: [
      {
        label: "Severity Distribution",
        data: Object.values(severityCount),
        backgroundColor: ["#4CAF50", "#FFC107", "#FF5722", "#D32F2F"]
      }
    ]
  };

  const typeCount = {};
  disasters.forEach(d => {
    typeCount[d.type] = (typeCount[d.type] || 0) + 1;
  });

  const pieData = {
    labels: Object.keys(typeCount),
    datasets: [
      {
        data: Object.values(typeCount),
        backgroundColor: ["#2196F3", "#FF9800", "#9C27B0", "#E91E63"]
      }
    ]
  };

  return (
    <div style={{ display: "flex", gap: "40px", marginTop: "30px" }}>
      <div style={{ width: "400px" }}>
        <h3>Severity Analysis</h3>
        <Bar data={barData} />
      </div>
      <div style={{ width: "400px" }}>
        <h3>Disaster Type Distribution</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default Analytics;