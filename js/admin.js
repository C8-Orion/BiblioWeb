import { listarLibros, crearLibro, reemplazarLibro, eliminarLibro } from "./api.js";

const tabla = document.getElementById("tabla-libros");
const contador = document.getElementById("contador-libros");
const formulario = document.getElementById("form-libro");
const mensaje = document.getElementById("mensaje");
const botonGuardar = formulario.querySelector('[type="submit"]');
let idEditando = null;
let librosCargados = [];

function mostrarMensaje(texto, tipo = "success") {
    mensaje.textContent = texto;
    mensaje.className = `alert alert-${tipo} mb-3`;
    mensaje.hidden = !texto;
}

function ocultarMensaje() {
    mensaje.textContent = "";
    mensaje.className = "";
    mensaje.hidden = true;
}

function crearCelda(texto, etiqueta = "td") {
    const celda = document.createElement(etiqueta);
    celda.textContent = texto ?? "";
    return celda;
}

function mostrarLibros(libros) {
    librosCargados = libros;
    tabla.replaceChildren();
    contador.textContent = `${libros.length} Registros`;

    libros.forEach((libro) => {
        const fila = document.createElement("tr");
        const celdaPortada = document.createElement("td");
        const portada = document.createElement("img");
        portada.className = "rounded miniatura-libro";
        portada.src = libro.portada || "../img/libros/libroDefault.png";
        portada.alt = `Portada de ${libro.titulo}`;
        portada.width = 45;
        portada.height = 55;
        portada.onerror = () => { portada.src = "../img/libros/sin-portada.svg"; };
        celdaPortada.append(portada);
        fila.append(celdaPortada);
        fila.append(crearCelda(libro.titulo, "th"));
        fila.append(crearCelda(libro.autor));

        const celdaCategoria = document.createElement("td");
        const insignia = document.createElement("span");
        insignia.className = `badge rounded-pill badge-${(libro.categoria || "").toLowerCase()}`;
        insignia.textContent = libro.categoria || "";
        celdaCategoria.append(insignia);
        fila.append(celdaCategoria);

        const acciones = document.createElement("td");
        acciones.className = "text-end";
        const editar = document.createElement("button");
        editar.type = "button";
        editar.className = "btn btn-sm btn-outline-secondary me-1 btn-editar";
        editar.dataset.id = libro.id;
        editar.textContent = "✏️ Editar";
        const eliminar = document.createElement("button");
        eliminar.type = "button";
        eliminar.className = "btn btn-sm btn-outline-danger btn-eliminar";
        eliminar.dataset.id = libro.id;
        eliminar.textContent = "🗑️ Eliminar";
        acciones.append(editar, eliminar);
        fila.append(acciones);
        tabla.append(fila);
    });
}

async function cargarLibros() {
    try {
        mostrarLibros(await listarLibros());
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudo cargar el inventario. Verifica que JSON Server esté activo y vuelve a intentarlo.", "danger");
    }
}

function limpiarEdicion() {
    idEditando = null;
    botonGuardar.textContent = "Guardar";
    document.getElementById("titulo-form-libro").textContent = "Registrar o Editar Libro";
}

function editarLibro(id) {
    const libro = librosCargados.find((item) => String(item.id) === String(id));
    if (!libro) {
        mostrarMensaje("No encontramos ese libro en el inventario. Recarga la lista e inténtalo de nuevo.", "warning");
        return;
    }

    idEditando = libro.id;
    document.getElementById("titulo").value = libro.titulo || "";
    document.getElementById("autor").value = libro.autor || "";
    document.getElementById("categoria").value = libro.categoria || "";
    document.getElementById("descripcion").value = libro.descripcion || "";
    document.getElementById("portada").value = libro.portada || "";
    document.getElementById("titulo-form-libro").textContent = `Editar: ${libro.titulo}`;
    botonGuardar.textContent = "Guardar cambios";
    ocultarMensaje();
    formulario.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function guardarLibro(evento) {
    evento.preventDefault();
    const libro = {
        titulo: document.getElementById("titulo").value.trim(),
        autor: document.getElementById("autor").value.trim(),
        categoria: document.getElementById("categoria").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        portada: document.getElementById("portada").value.trim() || "../img/libros/libroDefault.png",
        disponible: true,
    };

    if (!libro.titulo || !libro.autor || !libro.categoria || !libro.descripcion) {
        mostrarMensaje("Completa título, autor, categoría y descripción antes de guardar.", "warning");
        return;
    }

    const estabaEditando = idEditando !== null;
    try {
        if (estabaEditando) await reemplazarLibro(idEditando, libro);
        else await crearLibro(libro);
        formulario.reset();
        limpiarEdicion();
        mostrarMensaje(estabaEditando ? "Los cambios del libro se guardaron." : "El libro se agregó al catálogo.");
        await cargarLibros();
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudo guardar el libro. Revisa la conexión con JSON Server e inténtalo de nuevo.", "danger");
    }
}

async function borrarLibro(id) {
    const libro = librosCargados.find((item) => String(item.id) === String(id));
    if (!libro || !window.confirm(`¿Eliminar «${libro.titulo}» del catálogo?`)) return;

    try {
        await eliminarLibro(id);
        if (String(idEditando) === String(id)) {
            formulario.reset();
            limpiarEdicion();
        }
        mostrarMensaje(`«${libro.titulo}» se eliminó del catálogo.`);
        await cargarLibros();
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudo eliminar el libro. Revisa la conexión con JSON Server e inténtalo de nuevo.", "danger");
    }
}

formulario.addEventListener("submit", guardarLibro);
formulario.addEventListener("reset", () => {
    limpiarEdicion();
    ocultarMensaje();
});
tabla.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-id]");
    if (!boton) return;
    if (boton.classList.contains("btn-editar")) editarLibro(boton.dataset.id);
    if (boton.classList.contains("btn-eliminar")) borrarLibro(boton.dataset.id);
});

ocultarMensaje();
cargarLibros();
