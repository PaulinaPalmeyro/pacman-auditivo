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

  logout: () => {
    localStorage.removeItem('user');
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

  deletePatient: async (patientId) => {
    try {
      const response = await axios.delete(`${API_URL}/paciente/${patientId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al eliminar paciente' };
    }
  }
};

export default authService; 