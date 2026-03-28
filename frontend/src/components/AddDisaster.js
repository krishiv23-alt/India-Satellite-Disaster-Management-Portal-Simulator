import React, { useState } from "react";
import axios from "axios";

function AddDisaster({ refresh }) {
  const [form, setForm] = useState({
    type: "",
    region: "",
    intensity: "",
    coordinates: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/disasters", form);
    refresh();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input placeholder="Type" onChange={e => setForm({...form, type: e.target.value})} required />
      <input placeholder="Region" onChange={e => setForm({...form, region: e.target.value})} required />
      <input type="number" placeholder="Intensity (0-100)" onChange={e => setForm({...form, intensity: e.target.value})} required />
      <input placeholder="Coordinates" onChange={e => setForm({...form, coordinates: e.target.value})} required />
      <button type="submit">Add Alert</button>
    </form>
  );
}

export default AddDisaster;