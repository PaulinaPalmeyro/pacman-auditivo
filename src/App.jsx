// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./views/Landing";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* Futuras rutas */}
      <Route path="/fonoaudiologos" element={<div>Fonoaudiólogos (próximamente)</div>} />
      <Route path="/login" element={<div>Login (próximamente)</div>} />
    </Routes>
  );
};

export default App;