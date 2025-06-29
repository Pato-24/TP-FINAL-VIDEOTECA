import axios from "axios";

// URL base para la entidad clientes en el servidor JSON
const API = "http://localhost:3001/clientes";

// Trae todos los clientes (GET)
export const getClientes = () => axios.get(API);

// Agrega un nuevo cliente (POST)
export const addCliente = (data) => axios.post(API, data);

// Edita un cliente existente por ID (PUT)
export const editCliente = (id, data) => axios.put(`${API}/${id}`, data);

// Elimina un cliente por ID (DELETE)
export const deleteCliente = (id) => axios.delete(`${API}/${id}`);
