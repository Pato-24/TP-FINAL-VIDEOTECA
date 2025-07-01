import axios from "axios";

// URL base para la entidad alquileres en el servidor JSON
const API_URL = "http://localhost:3001/alquileres";

// Trae todos los alquileres (GET)
export const getAlquileres = () => axios.get(API);

// Agrega un nuevo alquiler (POST)
export const addAlquiler = (alquiler) => axios.post(API_URL, alquiler);

// Edita un alquiler existente por ID (PUT)
export const editAlquiler = (id, data) => axios.put(`${API}/${id}`, data);

// Elimina un alquiler por ID (DELETE)
export const deleteAlquiler = (id) => axios.delete(`${API}/${id}`);