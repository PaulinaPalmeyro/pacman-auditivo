// src/App.jsx
import React, { useEffect, useState } from "react";
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
import ActiveAssignment from "./views/TherapistViews/ActiveAssignment";
import AudioDetectionActivity from "./views/PatientViews/activities/AudioDetectionActivity";
import AudioDiscriminationActivity from "./views/PatientViews/activities/AudioDiscriminationActivity";
import IntegracionAuditivaActivity from "./views/PatientViews/activities/IntegracionAuditivaActivity";
import IdentificarNoPerteneceActivity from "./views/PatientViews/activities/IdentificarNoPerteneceActivity";
import CompletandoSerieActivity from "./views/PatientViews/activities/CompletandoSerieActivity";
import ResolvedActivityDetails from "./views/TherapistViews/ResolvedActivityDetails";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SessionExpiredDialog() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('sessionExpired', handler);
    return () => window.removeEventListener('sessionExpired', handler);
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: '#7B1FA2', textAlign: 'center' }}>Sesión expirada</DialogTitle>
      <DialogContent sx={{ textAlign: 'center', fontSize: '1.1rem' }}>
        Tu sesión ha expirado por seguridad.<br />Por favor, vuelve a iniciar sesión para continuar usando la plataforma.
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button onClick={handleClose} variant="contained" sx={{ borderRadius: '999px', px: 4, backgroundColor: '#7B1FA2', '&:hover': { backgroundColor: '#6a1b9a' } }}>
          Ir al Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function App() {
  return (
    <Router>
      <SessionExpiredDialog />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/fonoaudiologos" element={<Therapists />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fono-dashboard" element={<TherapistDashboard />} />
        <Route path="/register-patient" element={<RegisterPatient />} />
        <Route path="/fono-dashboard/paciente/:id" element={<PatientProfile />} />
        <Route path="/asignar-actividades/:id" element={<AssignActivities />} />
        <Route path="/actividades-resueltas/:id" element={<ResolvedActivities />} />
        <Route path="/editar-paciente/:id" element={<EditPatient />} />
        <Route path="/actividad/:asignacionId/ejercicio-asignado/:ejercicioAsignadoId" element={<ResolvedActivityDetails />} />
        <Route path="/paciente-dashboard" element={<PatientDashboard />} />
        <Route path="/actividades-asignadas" element={<AssignedActivities />} />
        <Route path="/actividad/audio/:id" element={<AudioChoiceActivity />} />
        <Route path="/actividad/imagen/:id" element={<ImageAssociationActivity />} />
        <Route path="/actividad/imitacion/:id" element={<VoiceImitationActivity />} />
        <Route path="/actividad/historia/:id" element={<AudioTextChoiceActivity />} />
        <Route path="/actividad/problema/:id" element={<ProblemSolvingActivity />} />
        <Route path="/historial-actividades" element={<ActivityHistory />} />
        <Route path="/sobre-nosotros" element={<AboutUs />} />
        <Route path="/asignacion-activa/:id" element={<ActiveAssignment />} />
        <Route path="/actividad/deteccion-auditiva/:id" element={<AudioDetectionActivity />} />
        <Route path="/actividad/discriminacion-auditiva/:id" element={<AudioDiscriminationActivity />} />
        <Route path="/historial-niveles/:id" element={<ResolvedActivities />} />
        <Route path="/actividad/integracion-auditiva/:id" element={<IntegracionAuditivaActivity />} />
        <Route path="/actividad/identificar-no-pertenece/:id" element={<IdentificarNoPerteneceActivity />} />
        <Route path="/actividad/completando-serie/:id" element={<CompletandoSerieActivity />} />
        <Route path="/actividad-historial/deteccion-auditiva/:asignacionId/:ejercicioAsignadoId" element={<AudioDetectionActivity historialMode={true} />} />
        <Route path="/actividad-historial/discriminacion-auditiva/:asignacionId/:ejercicioAsignadoId" element={<AudioDiscriminationActivity historialMode={true} />} />
        <Route path="/actividad-historial/integracion-auditiva/:asignacionId/:ejercicioAsignadoId" element={<IntegracionAuditivaActivity historialMode={true} />} />
        <Route path="/actividad-historial/identificar-no-pertenece/:asignacionId/:ejercicioAsignadoId" element={<IdentificarNoPerteneceActivity historialMode={true} />} />
        <Route path="/actividad-historial/completando-serie/:asignacionId/:ejercicioAsignadoId" element={<CompletandoSerieActivity historialMode={true} />} />
        <Route path="/actividad-historial/imagen/:asignacionId/:ejercicioAsignadoId" element={<ImageAssociationActivity historialMode={true} />} />
        <Route path="/actividad-historial/imitacion/:asignacionId/:ejercicioAsignadoId" element={<VoiceImitationActivity historialMode={true} />} />
        <Route path="/actividad-historial/historia/:asignacionId/:ejercicioAsignadoId" element={<AudioTextChoiceActivity historialMode={true} />} />
        <Route path="/actividad-historial/problema/:asignacionId/:ejercicioAsignadoId" element={<ProblemSolvingActivity historialMode={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
