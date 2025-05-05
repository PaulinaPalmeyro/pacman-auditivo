// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./views/Landing";
import Therapists from "./views/Therapists";
import Login from "./views/Login";
import TherapistDashboard from "./views/TherapistViews/TherapistDashboard";
import RegisterPatient from "./views/TherapistViews/RegisterPatient";
import PatientProfile from "./views/TherapistViews/PatientProfile";
import AssignActivities from "./views/TherapistViews/AssignActivities";
import ResolvedActivities from "./views/TherapistViews/ResolvedActivities";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/fonoaudiologos" element={<Therapists />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fono-dashboard" element={<TherapistDashboard />} />
        <Route path="/register-patient" element={<RegisterPatient />} />
        <Route path="/paciente/1" element={<PatientProfile />} />
        <Route path="/asignar-actividades/:id" element={<AssignActivities />} />
        <Route path="/actividades-resueltas/:id" element={<ResolvedActivities />} />
      </Routes>
    </Router>
  );
}

export default App;
