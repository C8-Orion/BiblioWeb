# BiblioWeb

Sitio web de consulta y administración de una biblioteca. El público puede explorar el catálogo y el personal puede iniciar sesión para crear, editar y eliminar libros.

## Estado del proyecto

Las funciones principales están implementadas para ejecución local:

- La página principal consulta la API y muestra como máximo seis libros. Conserva los seis más recientes según el orden recibido; cuando se agrega otro, el más antiguo deja de mostrarse en esta cuadrícula.
- El catálogo público muestra todos los libros y permite buscar por título, autor o categoría, además de filtrar por categoría.
- El panel permite consultar, crear, editar y eliminar libros mediante JSON Server.
- El formulario exige título, autor, categoría y descripción. Informa cuando una operación se completa o falla.
- El inicio de sesión de demostración protege el panel y permite cerrar la sesión.

**El sitio publicado requiere una API externa con HTTPS.** La configuración actual apunta a `http://localhost:3000`, que solo funciona en la computadora donde se ejecuta JSON Server. GitHub Pages no aloja ni ejecuta la API.

## Tecnologías

- HTML, CSS y JavaScript con módulos ES.
- Bootstrap 5.3 para componentes y diseño adaptable.
- Node.js, npm y JSON Server para simular la API REST.
- `fetch()` para comunicar el frontend con la API.

## Estructura principal

```text
BiblioWeb/
├── index.html                 # Portada y selección de seis libros
├── pages/
│   ├── catalogo.html          # Catálogo público completo
│   ├── login.html             # Acceso de demostración
│   └── admin.html             # Formulario e inventario administrativo
├── css/
│   ├── base.css
│   ├── componentes.css
│   └── estilos.css
├── js/
│   ├── config.js              # Dirección base de la API
│   ├── api.js                 # Funciones fetch para libros
│   ├── auth.js                # Inicio, cierre y protección de sesión
│   ├── admin.js               # Operaciones del panel
│   └── tema.js                # Tema claro y oscuro
└── api/
    ├── db.json                # Datos de prueba
    ├── package.json
    └── package-lock.json
```

La portada y el catálogo tienen módulos JavaScript dentro de sus páginas HTML; ambos usan las funciones centralizadas en `js/api.js`.

## Datos de los libros

La API utiliza el recurso `/libros`. Cada libro tiene esta forma:

| Campo | Tipo | Uso |
|---|---|---|
| `id` | Texto | Identificador asignado por JSON Server. |
| `titulo` | Texto | Nombre del libro; obligatorio. |
| `autor` | Texto | Autor; obligatorio. |
| `categoria` | Texto | Categoría; obligatoria. |
| `descripcion` | Texto | Sinopsis; obligatoria. |
| `portada` | Texto | Ruta o URL de la portada; opcional en el formulario. |
| `disponible` | Booleano | Estado de disponibilidad. |

Los datos locales se guardan en `api/db.json`.

## Requisitos previos

- Git.
- Node.js 20.19 o superior y npm.
- Visual Studio Code con la extensión Live Server, o un servidor estático equivalente.

## Ejecutar en local

1. Clona el repositorio y entra en la carpeta:

   ```bash
   git clone https://github.com/C8-Orion/BiblioWeb.git
   cd BiblioWeb
   ```

2. Abre una terminal en `api` e instala las dependencias:

   ```bash
   cd api
   npm ci
   ```

3. En esa misma carpeta, inicia JSON Server y deja la terminal abierta:

   ```bash
   npx json-server db.json --port 3000
   ```

   La API debe responder en <http://localhost:3000/libros>.

4. Abre `index.html` en VS Code y selecciona **Open with Live Server**. Usa la dirección local que muestre Live Server, normalmente <http://127.0.0.1:5500/>. No abras las páginas con doble clic: los módulos ES necesitan servirse mediante HTTP.

Se necesitan dos procesos activos: JSON Server y Live Server.

## Cuenta de demostración

| Campo | Valor |
|---|---|
| Correo | `admin@biblioweb.test` |
| Contraseña | `Admin123` |

Estas credenciales están escritas en el frontend y solo sirven para revisar el flujo de la actividad. No deben usarse para proteger datos reales.

## Guía de validación

1. Confirma que `http://localhost:3000/libros` devuelve los libros en JSON.
2. Abre la portada y verifica que haya como máximo seis tarjetas.
3. Abre el catálogo y prueba la búsqueda y los filtros de categoría.
4. Sin sesión, intenta abrir `pages/admin.html`; debe llevarte al login.
5. Inicia sesión con la cuenta de demostración y confirma que abre el panel. Cierra la sesión y verifica que vuelves a la portada.
6. Intenta guardar un libro sin un campo obligatorio; el formulario debe impedirlo.
7. Crea un libro. Debe aparecer en el inventario y en el catálogo al recargar.
8. Edita el título o la descripción. El cambio debe verse después de recargar el catálogo.
9. Elimina un libro y confirma la acción. Debe desaparecer del inventario y del catálogo.
10. Agrega un séptimo libro y recarga la portada: debe seguir mostrando seis tarjetas y entrar el nuevo libro en lugar del más antiguo. El catálogo completo debe mostrar los siete.
11. Para revisar los mensajes de fallo, detén JSON Server, recarga las páginas o intenta guardar; deben informar que no se pudo cargar o guardar. Reinicia el servidor al terminar.

## API disponible

El módulo `js/api.js` expone estas operaciones:

| Acción | Método y ruta |
|---|---|
| Consultar libros | `GET /libros` |
| Crear libro | `POST /libros` |
| Actualizar libro | `PUT /libros/:id` |
| Actualizar parcialmente | `PATCH /libros/:id` |
| Eliminar libro | `DELETE /libros/:id` |

## Publicación en GitHub Pages y Railway

GitHub Pages publica los archivos estáticos del frontend. JSON Server debe ejecutarse como un servicio independiente con una URL pública HTTPS. El repositorio incluye `api/start.sh`: inicializa `db.json` en el volumen persistente de Railway y escucha en el puerto que proporciona la plataforma.

### Publicar la API en Railway

1. Inicia sesión en Railway y crea un proyecto desde el repositorio `C8-Orion/BiblioWeb`.
2. En la configuración del servicio, define **Root Directory** como `api`.
3. Define el comando de instalación como `npm ci` y el comando de inicio como `npm start`.
4. Añade un volumen persistente al servicio con punto de montaje `/data`.
5. En **Settings → Networking**, genera un dominio público. Railway proporciona HTTPS para el dominio asignado.
6. Abre `https://TU-DOMINIO-API/libros`. Debe devolver el catálogo en JSON.

El volumen es necesario porque conserva los cambios de `db.json` cuando el servicio reinicia o se despliega de nuevo. Guarda una copia de seguridad de los datos si son importantes.

### Conectar GitHub Pages con la API

Cuando Railway muestre la URL asignada, cambia `API_URL` en `js/config.js` por el dominio base, por ejemplo:

```js
export const API_URL = "https://TU-DOMINIO-API";
```

No añadas `/libros`: `js/api.js` añade esa ruta a cada petición. Guarda el cambio y súbelo a GitHub para que Pages publique la nueva configuración.

### Validar la publicación

1. Abre el endpoint `https://TU-DOMINIO-API/libros` y confirma que responde con JSON.
2. Abre <https://c8-orion.github.io/BiblioWeb/> y confirma que aparecen seis libros.
3. Inicia sesión en el panel, crea, edita y elimina un libro.
4. Recarga la portada y el catálogo para confirmar que reflejan los cambios.
5. Reinicia o vuelve a desplegar la API y confirma que los datos siguen ahí.

La URL HTTPS real de la API todavía debe generarse desde la cuenta del equipo. Hasta entonces, la configuración del frontend sigue apuntando a `localhost` y el CRUD solo funciona en local.

## Diseño y seguimiento

- Diseño en Google Stitch: [BiblioWeb Frontend Portal](https://stitch.google.com/projects/3868128387779378376). La documentación visual está en `documentacion/stitch.md`.
- El tablero de Jira del equipo se gestiona en la organización del proyecto. El enlace al tablero no está guardado en este repositorio.

## Seguridad y alcance

`sessionStorage` y las credenciales del frontend permiten demostrar navegación con sesión, pero cualquier persona puede inspeccionar o modificar ese código desde el navegador. JSON Server tampoco implementa autenticación ni autorización. Para una aplicación real se necesita un backend con autenticación, autorización y almacenamiento adecuados.

---

Proyecto colaborativo de BiblioWeb, desarrollado por David, Emanuel, Arley y Yerson.
