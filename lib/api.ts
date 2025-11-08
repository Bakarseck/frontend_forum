import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "mon_api_key_secrete";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.headers) {
    config.headers["x-api-key"] = API_KEY;
  }
  return config;
});

// Intercepteur d'erreurs
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("⛔ Non autorisé");
    }
    return Promise.reject(err);
  }
);

// 🔐 Authentification
export const authAPI = {
  register: (data: { email: string; username: string; password: string;}) => api.post("/register", data),
  login: (data: { identifier: string; password: string }) => api.post("/login", data),
  getProfile: () => api.get("/profile"),
  changePassword: (data: { ancienMotDePasse: string; nouveauMotDePasse: string }) => api.put("/change-password", data),
};

// Gestion des instituteurs et classes
export const dataAPI = {
  getInstituteurs: () => api.get("/instituteurs"),
  getClasses: () => api.get("/classes"),
  getParents: () => api.get("/parents"),
  updateParent: (id: number, data: any) => api.put(`/parents/${id}`, data),
  deleteParent: (id: number) => api.delete(`/parents/${id}`),
  createClasse: (data: { nom: string; niveau: string }) => api.post("/classes", data),
  updateClasse: (id: number, data: { nom: string; niveau: string }) => api.put(`/classes/${id}`, data),
  deleteClasse: (id: number) => api.delete(`/classes/${id}`),
  updateInstituteur: (id: number, data: any) => api.put(`/instituteurs/${id}`, data),
  deleteInstituteur: (id: number) => api.delete(`/instituteurs/${id}`),
  getEleves: (classeId: string) => api.get(`/eleves?classeId=${classeId}`),
  updateEleve: (id: number, data: any) => api.put(`/eleves/${id}`, data),
  deleteEleve: (id: number) => api.delete(`/eleves/${id}`),
  getQuizz: (classeId: string) => api.get(`/quizzes?classeId=${classeId}`),
  createEleve: (data: any) => api.post("/eleves", data),
  createQuizz: (data: any) => api.post("/quizzes", data),
  deleteQuizz: (id: number) => api.delete(`/quizzes/${id}`),
  updateQuizz: (id: number, data: any) => api.put(`/quizzes/${id}`, data),

  getCours: (classeId: string | number) => api.get(`/cours?classe_id=${classeId}`),
  createCours: (data: any) => api.post('/cours', data),
  deleteCours: (id: number) => api.delete(`/cours/${id}`),
  updateCours: (id: number, data: any) => api.put(`/cours/${id}`, data),
  // Gestion des notes
  addNote: (eleveId: number, data: any) => api.post(`/eleves/${eleveId}/notes`, data),
  getNotes: (eleveId: number, all: boolean = false) => api.get(`/eleves/${eleveId}/notes${all ? '?all=true' : ''}`),
  getParentsOfEleve: (eleveId: string | number) => api.get(`/eleves/${eleveId}/parents`),
  removeParentFromEleve: (eleveId: string | number, parentId: string | number) => api.delete(`/eleves/${eleveId}/parents/${parentId}`),
  getNoteOfEleveByDate: (eleveId: string | number, date: string) => api.get(`/eleves/${eleveId}/notes/${date}`),
  updateNote: (eleveId: string | number, noteId: string | number, data: any) => api.patch(`/eleves/${eleveId}/notes/${noteId}`, data),
  updateNoteByDate: (eleveId: string | number, date: string, data: any) => api.patch(`/eleves/${eleveId}/notes/${date}`, data),
  deleteNoteByDate: (eleveId: string | number, date: string) => api.delete(`/eleves/${eleveId}/notes/${date}`),
  uploadPhoto: (eleveId: string | number, file: File) => {
    const formData = new FormData();
    formData.append('file', file); // Le champ DOIT s'appeler "file"
    const token = localStorage.getItem("token");
    return axios.post(`${API_URL}/eleves/${eleveId}/photo`, formData, {
      headers: {
        // Ne PAS mettre Content-Type, FormData le gère automatiquement
        'Authorization': token ? `Bearer ${token}` : '',
        'x-api-key': API_KEY,
      },
      withCredentials: true,
    });
  },
  
  // Gestion des sessions Tajwid
  getTajwidSessions: () => api.get("/tajwid-sessions"),
  getTajwidSession: (id: number) => api.get(`/tajwid-sessions/${id}`),
  createTajwidSession: (data: any) => api.post("/tajwid-sessions", data),
  updateTajwidSession: (id: number, data: any) => api.put(`/tajwid-sessions/${id}`, data),
  deleteTajwidSession: (id: number) => api.delete(`/tajwid-sessions/${id}`),
  getTajwidSessionsByEleve: (eleveId: number) => api.get(`/tajwid-sessions/eleve/${eleveId}`),
  
  // Gestion des présences
  createPresence: (eleveId: number, data: { type: string; commentaire?: string }) => api.post(`/eleves/${eleveId}/presence`, data),
  getPresence: (eleveId: number, date?: string) => api.get(`/eleves/${eleveId}/presence${date ? `?date=${date}` : ''}`),
  getPresencesByClasse: (classeId: number, date?: string) => api.get(`/classes/${classeId}/presences${date ? `?date=${date}` : ''}`),
  getPresencesByEleve: (eleveId: number) => api.get(`/eleves/${eleveId}/presences`),
  deletePresence: (eleveId: number, date: string) => api.delete(`/eleves/${eleveId}/presence/${date}`),
  
  // Gestion du calendrier
  getCalendarEvents: (createdById?: number) => api.get(`/calendar/events${createdById ? `?createdById=${createdById}` : ''}`),
  getCalendarEvent: (id: number) => api.get(`/calendar/events/${id}`),
  createCalendarEvent: (data: { title: string; description?: string; startAt: string; endAt?: string }) => api.post("/calendar/events", data),
  updateCalendarEvent: (id: number, data: { title: string; description?: string; startAt: string; endAt?: string }) => api.put(`/calendar/events/${id}`, data),
  deleteCalendarEvent: (id: number) => api.delete(`/calendar/events/${id}`),
  
  // Gestion des tâches
  getTasks: (eleveId?: number, status?: string) => api.get(`/tasks${eleveId || status ? `?${eleveId ? `eleveId=${eleveId}` : ''}${eleveId && status ? '&' : ''}${status ? `status=${status}` : ''}` : ''}`),
  getTask: (id: number) => api.get(`/tasks/${id}`),
  createTask: (data: { title: string; description?: string; dueDate: string; eleveID: number }) => api.post("/tasks", data),
  updateTask: (id: number, data: { title?: string; description?: string; dueDate?: string; status?: string }) => api.put(`/tasks/${id}`, data),
  completeTask: (id: number) => api.patch(`/tasks/${id}/complete`),
  deleteTask: (id: number) => api.delete(`/tasks/${id}`),
}
