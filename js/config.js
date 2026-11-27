// Usa la API local durante el desarrollo y Railway en el sitio publicado.
const esDesarrolloLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
export const API_URL = esDesarrolloLocal
    ? "http://localhost:3000"
    : "https://biblioweb-production.up.railway.app";
