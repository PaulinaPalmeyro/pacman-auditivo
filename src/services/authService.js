import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Configurar axios para incluir el token en todas las peticiones
axios.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Emitir un evento global para sesión expirada
      window.dispatchEvent(new Event('sessionExpired'));
    }
    return Promise.reject(error);
  }
);

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al iniciar sesión' };
    }
  },

  register: async (email, name, password, role, dni, fechaNacimiento, observaciones) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        name,
        password,
        role,
        dni,
        fechaNacimiento,
        observaciones
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al registrar usuario' };
    }
  },

  createPatient: async (email, name, password, dni, fechaNacimiento, observaciones) => {
    try {
      const response = await axios.post(`${API_URL}/crear-paciente`, {
        email,
        name,
        password,
        dni,
        fechaNacimiento,
        observaciones
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al crear paciente' };
    }
  },

  getMyPatients: async () => {
    try {
      const response = await axios.get(`${API_URL}/mis-pacientes`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener pacientes' };
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/logout`);
      localStorage.removeItem('user');
    } catch (error) {
      // Aún si hay error, removemos el usuario del localStorage
      localStorage.removeItem('user');
      throw error.response?.data || { message: 'Error al cerrar sesión' };
    }
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  getPatientById: async (patientId) => {
    try {
      const response = await axios.get(`${API_URL}/paciente/${patientId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener datos del paciente' };
    }
  },

  updatePatient: async (patientId, patientData) => {
    try {
      const response = await axios.put(`${API_URL}/paciente/${patientId}`, patientData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al actualizar paciente' };
    }
  },

  asignarNivel: async (pacienteId, nivelId) => {
    try {
      const response = await axios.post(`${API_URL}/asignar-nivel`, {
        pacienteId,
        nivelId
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al asignar nivel' };
    }
  },

  getNiveles: async () => {
    try {
      const response = await axios.get(`${API_URL}/niveles`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener niveles' };
    }
  },

  getAsignacionActiva: async (pacienteId) => {
    try {
      const response = await axios.get(`${API_URL}/asignacion-activa/${pacienteId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener la asignación activa' };
    }
  },

  getMisActividades: async () => {
    try {
      const response = await axios.get(`${API_URL}/mis-actividades`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener mis actividades' };
    }
  },

  deletePatient: async (patientId) => {
    try {
      const response = await axios.delete(`${API_URL}/paciente/${patientId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al eliminar paciente' };
    }
  },

  eliminarAsignacion: async (asignacionId) => {
    try {
      const response = await axios.delete(`${API_URL}/asignacion/${asignacionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al eliminar asignación' };
    }
  },

  validarProgreso: async (asignacionId) => {
    try {
      const response = await axios.put(`${API_URL}/asignacion/${asignacionId}/validar`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al validar progreso' };
    }
  },

  editarAsignacion: async (asignacionId, ejercicios) => {
    try {
      const response = await axios.put(`${API_URL}/asignacion/${asignacionId}`, { ejercicios });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al editar asignación' };
    }
  },

  getAsignaciones: async (pacienteId) => {
    try {
      const response = await axios.get(`${API_URL}/asignaciones/${pacienteId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener asignaciones' };
    }
  },

  async getEjercicioById(ejercicioId) {
    try {
      const response = await axios.get(`${API_URL}/ejercicio/${ejercicioId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener el ejercicio' };
    }
  },

  async registrarIntento(ejercicioId, intento) {
    try {
      const response = await axios.post(`${API_URL}/ejercicio/${ejercicioId}/intento`, intento);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al registrar el intento' };
    }
  },

  async getEjercicioAsignadoDetalle(asignacionId, ejercicioAsignadoId) {
    try {
      const response = await axios.get(`${API_URL}/asignacion/${asignacionId}/ejercicio-asignado/${ejercicioAsignadoId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener el detalle del ejercicio asignado' };
    }
  },

  async reasignarNivel(asignacionId) {
    try {
      const response = await axios.put(`${API_URL}/asignacion/${asignacionId}/reasignar`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al reasignar el nivel' };
    }
  },

  async getHistorialNiveles(pacienteId) {
    try {
      const response = await axios.get(`${API_URL}/historial-niveles/${pacienteId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener el historial de niveles' };
    }
  },

  async getNotificacionesFono() {
    try {
      const response = await axios.get(`${API_URL}/notificaciones-fono`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener notificaciones' };
    }
  },

  async marcarNotificacionLeida(asignacionId) {
    try {
      const response = await axios.put(`${API_URL}/notificaciones-fono/${asignacionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al marcar notificación como leída' };
    }
  },

  getHistorialActividadesPaciente: async () => {
    try {
      const response = await axios.get(`${API_URL}/historial-actividades-paciente`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener el historial de actividades del paciente' };
    }
  }
};

export default authService; 