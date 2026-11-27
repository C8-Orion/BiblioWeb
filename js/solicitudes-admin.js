import { listarSolicitudes, actualizarSolicitud } from "./api.js";

const tabla = document.getElementById("tabla-solicitudes");
const campoBusqueda = document.getElementById("buscar-solicitud");
const filtroEstado = document.getElementById("filtro-estado");
const mensaje = document.getElementById("mensaje-solicitudes");
const elementosPorPagina = 5;
const estados = ["Pendiente", "Aprobada", "Rechazada", "Prestado", "Devuelto"];
let solicitudes = [];
let paginaActual = 1;

function normalizar(valor) {
    return String(valor || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function crearCelda(texto, etiqueta = "td") {
    const celda = document.createElement(etiqueta);
    celda.textContent = texto ?? "—";
    return celda;
}

function mostrarMensaje(texto, tipo = "success") {
    mensaje.textContent = texto;
    mensaje.className = `alert alert-${tipo} mb-3`;
    mensaje.hidden = !texto;
}

function solicitudesFiltradas() {
    const busqueda = normalizar(campoBusqueda.value.trim());
    const estadoFiltro = filtroEstado.value;
    return solicitudes.filter((solicitud) => {
        const coincideEstado = estadoFiltro === "Todos" || (solicitud.estado || "Pendiente") === estadoFiltro;
        const texto = normalizar(`${solicitud.libroTitulo} ${solicitud.libroAutor} ${solicitud.nombre} ${solicitud.correo}`);
        return coincideEstado && texto.includes(busqueda);
    });
}

function crearFila(solicitud) {
    const fila = document.createElement("tr");
    fila.append(crearCelda(`SOL-${solicitud.id}`, "th"));

    const libro = document.createElement("td");
    libro.append(crearCelda(solicitud.libroTitulo, "strong"));
    const autor = document.createElement("small");
    autor.className = "d-block text-secondary";
    autor.textContent = solicitud.libroAutor || "";
    libro.append(autor);
    fila.append(libro);

    fila.append(crearCelda(solicitud.nombre));

    const correo = document.createElement("td");
    if (solicitud.correo) {
        const enlace = document.createElement("a");
        enlace.href = `mailto:${solicitud.correo}`;
        enlace.textContent = solicitud.correo;
        correo.append(enlace);
    } else {
        correo.textContent = "—";
    }
    fila.append(correo);
    fila.append(crearCelda(solicitud.comentario || "—"));

    const celdaEstado = document.createElement("td");
    const controles = document.createElement("div");
    controles.className = "d-flex flex-column gap-2";
    const selector = document.createElement("select");
    selector.className = "form-select form-select-sm";
    selector.setAttribute("aria-label", `Cambiar estado de SOL-${solicitud.id}`);
    estados.forEach((estado) => {
        const opcion = document.createElement("option");
        opcion.value = estado;
        opcion.textContent = estado;
        opcion.selected = (solicitud.estado || "Pendiente") === estado;
        selector.append(opcion);
    });
    const guardar = document.createElement("button");
    guardar.type = "button";
    guardar.className = "btn btn-sm btn-outline-primary btn-guardar-estado";
    guardar.dataset.id = solicitud.id;
    guardar.textContent = "Guardar estado";
    controles.append(selector, guardar);
    celdaEstado.append(controles);
    fila.append(celdaEstado);
    return fila;
}

function renderizar() {
    const pendientes = solicitudes.filter((solicitud) => (solicitud.estado || "Pendiente") === "Pendiente").length;
    document.getElementById("contador-solicitudes").textContent = `${solicitudes.length} ${solicitudes.length === 1 ? "solicitud" : "solicitudes"}`;
    document.getElementById("contador-pendientes").textContent = `${pendientes} ${pendientes === 1 ? "pendiente" : "pendientes"}`;

    const filtradas = solicitudesFiltradas();
    const totalPaginas = Math.max(1, Math.ceil(filtradas.length / elementosPorPagina));
    paginaActual = Math.min(paginaActual, totalPaginas);
    const inicio = (paginaActual - 1) * elementosPorPagina;
    const visibles = filtradas.slice(inicio, inicio + elementosPorPagina);
    tabla.replaceChildren();

    if (!visibles.length) {
        const fila = document.createElement("tr");
        const celda = crearCelda(solicitudes.length ? "No hay solicitudes que coincidan con la búsqueda." : "Aún no hay solicitudes de préstamo.");
        celda.colSpan = 6;
        celda.className = "text-center text-secondary py-4";
        fila.append(celda);
        tabla.append(fila);
    } else {
        visibles.forEach((solicitud) => tabla.append(crearFila(solicitud)));
    }

    const primero = filtradas.length ? inicio + 1 : 0;
    const ultimo = Math.min(inicio + elementosPorPagina, filtradas.length);
    document.getElementById("resumen-paginacion").textContent = `Mostrando ${primero}–${ultimo} de ${filtradas.length}`;
    document.getElementById("pagina-anterior").disabled = paginaActual <= 1;
    document.getElementById("pagina-siguiente").disabled = paginaActual >= totalPaginas;
}

async function cargarSolicitudes() {
    try {
        solicitudes = (await listarSolicitudes()).sort((a, b) =>
            new Date(b.fechaCreacion || 0) - new Date(a.fechaCreacion || 0)
        );
        renderizar();
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudieron cargar las solicitudes. Revisa la conexión con la API.", "danger");
        const fila = document.createElement("tr");
        const celda = crearCelda("Error al cargar las solicitudes.");
        celda.colSpan = 6;
        celda.className = "text-center text-danger py-4";
        fila.append(celda);
        tabla.replaceChildren(fila);
    }
}

async function guardarEstado(boton) {
    const solicitud = solicitudes.find((item) => String(item.id) === String(boton.dataset.id));
    const selector = boton.parentElement.querySelector("select");
    if (!solicitud || !selector) return;

    const nuevoEstado = selector.value;
    if (nuevoEstado === (solicitud.estado || "Pendiente")) {
        mostrarMensaje("Selecciona un estado diferente antes de guardar.", "warning");
        return;
    }

    boton.disabled = true;
    boton.textContent = "Guardando…";
    try {
        const actualizado = await actualizarSolicitud(solicitud.id, { estado: nuevoEstado });
        Object.assign(solicitud, actualizado);
        mostrarMensaje(`El estado de SOL-${solicitud.id} se actualizó a «${nuevoEstado}».`);
        renderizar();
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudo actualizar el estado. Inténtalo de nuevo.", "danger");
        boton.disabled = false;
        boton.textContent = "Guardar estado";
    }
}

campoBusqueda.addEventListener("input", () => { paginaActual = 1; renderizar(); });
filtroEstado.addEventListener("change", () => { paginaActual = 1; renderizar(); });
document.getElementById("pagina-anterior").addEventListener("click", () => { paginaActual -= 1; renderizar(); });
document.getElementById("pagina-siguiente").addEventListener("click", () => { paginaActual += 1; renderizar(); });
tabla.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".btn-guardar-estado");
    if (boton) guardarEstado(boton);
});

cargarSolicitudes();
