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
import EditPatient from "./views/TherapistViews/EditPatient";
import ActivityDetails from "./views/TherapistViews/ActivityDetails";
import PatientDashboard from "./views/PatientViews/PatientDashboard";
import AssignedActivities from "./views/PatientViews/AssignedActivities";
import AudioChoiceActivity from "./views/PatientViews/activities/AudioChoiceActivity";
import ImageAssociationActivity from "./views/PatientViews/activities/ImageAssociationActivity";
import VoiceImitationActivity from "./views/PatientViews/activities/VoiceImitationActivity";
import AudioTextChoiceActivity from "./views/PatientViews/activities/AudioTextChoiceActivity";
import ProblemSolvingActivity from "./views/PatientViews/activities/ProblemSolvingActivity";
import ActivityHistory from "./views/PatientViews/ActivityHistory";
import AboutUs from "./views/AboutUs";


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
        <Route path="/editar-paciente/:id" element={<EditPatient />} />
        <Route path="/actividad/:id" element={<ActivityDetails />} />
        <Route path="/paciente-dashboard" element={<PatientDashboard />} />
        <Route path="/actividades-asignadas" element={<AssignedActivities />} />
        <Route path="/actividad/audio" element={<AudioChoiceActivity />} />
        <Route path="/actividad/imagen" element={<ImageAssociationActivity />} />
        <Route path="/actividad/imitacion" element={<VoiceImitationActivity />} />
        <Route path="/actividad/historia" element={<AudioTextChoiceActivity />} />
        <Route path="/actividad/problema" element={<ProblemSolvingActivity />} />
        <Route path="/historial-actividades" element={<ActivityHistory />} />
        <Route path="/sobre-nosotros" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
