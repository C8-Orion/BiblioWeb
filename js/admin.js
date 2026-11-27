import { listarLibros, crearLibro, reemplazarLibro, eliminarLibro } from "./api.js"

// Partes de la página que vamos a llenar
const tabla = document.getElementById("tabla-libros")
const contador = document.getElementById("contador-libros")

// Formulario y el libro que se está editando (null = libro nuevo)
const formulario = document.getElementById("form-libro")
let idEditando = null 


// Dibuja los libros en la tabla y actualiza el contador
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

// Pide los libros a la API y los muestra
async function cargarLibros() {
        try {
            mostrarLibros(await listarLibros())
        } catch (error) { console.error(error)}
}

// Al abrir la página, carga los libros
cargarLibros()

// Guarda el libro del formulario: crea uno nuevo o reemplaza el que se edita
async function guardarLibro(evento) {
    evento.preventDefault()
    // Junta los datos del formulario en un libro
    const libro = { disponible: true }
    libro.titulo = document.getElementById("titulo").value.trim()
    libro.autor = document.getElementById("autor").value.trim()
    libro.categoria = document.getElementById("categoria").value.trim()
    libro.descripcion = document.getElementById("descripcion").value.trim()
    libro.portada = document.getElementById("portada").value.trim() || "../img/libros/libroDefault.png"

    // Si falta un campo obligatorio, no guarda
    if (!libro.titulo || !libro.autor || !libro.categoria) {
        return
    }
    // Lo manda a la API, limpia el formulario y refresca la tabla
    try {
        if (idEditando) await reemplazarLibro(idEditando, libro)
        else await crearLibro(libro)
        formulario.reset()
        idEditando = null 
        cargarLibros()
    } catch (error) { console.error(error)}
}
//cuando le dan guardar, ejecuta guardalibro
formulario.addEventListener("submit", guardarLibro)