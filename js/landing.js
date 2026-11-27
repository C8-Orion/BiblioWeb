import { listarLibros } from "./api.js";

const contenedorLibros = document.getElementById("libros-inicio");

const escapar = (valor) => String(valor ?? "").replace(/[&<>"']/g, (caracter) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[caracter]));

async function cargarLibrosInicio() {
    try {
        const libros = await listarLibros();
        if (!libros.length) {
            contenedorLibros.innerHTML = '<p class="col-12 text-secondary">Aún no hay libros en el catálogo.</p>';
            return;
        }

        // La portada mantiene una cuadrícula de seis libros: los más recientes
        // según el orden de la API. Al agregar otro, sale de aquí el más antiguo.
        const librosDestacados = libros.slice(-6);
        contenedorLibros.innerHTML = librosDestacados.map((libro) => {
            const portada = (libro.portada || "img/libros/libroDefault.png").replace(/^(\.\.\/)+/, "");
            return `<div class="col">
                <article class="card card-bw h-100 p-3">
                    <div class="book-cover-wrap mb-3"><img class="book-cover" src="${escapar(portada)}" alt="Portada de ${escapar(libro.titulo)}" onerror="this.onerror=null;this.src='img/libros/sin-portada.svg'"></div>
                    <div class="card-body d-flex flex-column p-0">
                        <h3 class="card-title h5 font-serif fw-bold mb-1">${escapar(libro.titulo)}</h3>
                        <p class="card-subtitle text-secondary small fw-semibold mb-2">${escapar(libro.autor)}</p>
                        <p class="card-text small flex-grow-1">${escapar(libro.descripcion)}</p>
                    </div>
                </article>
            </div>`;
        }).join("");
    } catch (error) {
        console.error(error);
        contenedorLibros.innerHTML = '<div class="col-12 text-center text-secondary"><p>No pudimos cargar los libros.</p><button class="btn btn-terracota btn-sm" id="reintentar-libros">Reintentar</button></div>';
        document.getElementById("reintentar-libros").addEventListener("click", cargarLibrosInicio);
    }
}

cargarLibrosInicio();
