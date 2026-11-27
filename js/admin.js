import { listarLibros, crearLibro, reemplazarLibro, eliminarLibro } from "./api.js"

const tabla = document.getElementById("tabla-libros")
const contador = document.getElementById("contador-libros")


function mostrarLibros(libros) {
    tabla.innerHTML = ""
    contador.textContent = `${libros.length} Registros`
    libros.forEach((libro) => {
        const fila = document.createElement("tr")
        fila.innerHTML += `<td><img class="rounded miniatura-libro" src="${libro.portada}" alt="portada de ${libro.titulo}" width="45" height ="55" /></td>`
        fila.innerHTML += `<th class="fw-bold" scope="row">${libro.titulo}</th>`
        fila.innerHTML += `<td>${libro.autor}</td>`
        fila.innerHTML += `<td><span class="badge rounded-pill badge-${libro.categoria.toLowerCase()}">${libro.categoria}</span></td>`
        fila.innerHTML += `<td class="text-end"><button type="button" class="btn btn-sm btn-outline-secondary me-1 btn-editar" data-id="${libro.id}">✏️ Editar</button> <button type="button" class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${libro.id}">🗑️ Eliminar</button></td>`
        tabla.append(fila)
    });
}
async function cargarLibros() {
        try {
            mostrarLibros(await listarLibros())
        } catch (error) { console.error(error)}
}
cargarLibros()