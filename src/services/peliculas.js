import axios from "axios";

const API = "http://localhost:3001/peliculas";

// Trae todas las películas (GET)
export const getPeliculas = () => axios.get(API);

// Agrega una nueva película (POST)
export const addPelicula = (data) => axios.post(API, data);

// Edita una película existente por ID (PUT)
export const editPelicula = (id, data) => axios.put(`${API}/${id}`, data);

// Elimina una película por ID (DELETE)
export const deletePelicula = (id) => axios.delete(`${API}/${id}`);