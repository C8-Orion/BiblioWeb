import { API_URL } from "./config.js";

// Obtiene todos los libros
export async function listarLibros() {
    const res = await fetch(`${API_URL}/libros`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}

// Crea un libro nuevo
export async function crearLibro(libro) {
    const res = await fetch(`${API_URL}/libros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(libro),
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}

// Actualiza solo algunos campos de un libro por su ID
export async function actualizarParcialLibro(id, cambios) {
    const res = await fetch(`${API_URL}/libros/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cambios),
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}

// Reemplaza por completo un libro por su ID
export async function reemplazarLibro(id, libro) {
    const res = await fetch(`${API_URL}/libros/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(libro),
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}

// Elimina un libro por su ID
export async function eliminarLibro(id) {
    const res = await fetch(`${API_URL}/libros/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}