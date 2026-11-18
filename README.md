# 📚 BiblioWeb

### Plataforma web para la consulta y administración de una biblioteca

BiblioWeb es un proyecto web colaborativo orientado a la consulta de libros y la administración de un catálogo bibliográfico. Actualmente estamos evolucionando una aplicación existente hacia una arquitectura dinámica, incorporando una API REST con JSON Server para gestionar los datos y mejorar la interacción entre el frontend y el backend.

---

## 1. 🎯 Objetivo del proyecto

Desarrollar una plataforma web que permita:

- Consultar el catálogo de libros públicamente.
- Visualizar información detallada de cada libro.
- Buscar y filtrar libros por diferentes criterios.
- Iniciar sesión como administrador.
- Gestionar los registros del catálogo mediante operaciones CRUD.
- Mantener una interfaz responsive y una experiencia de usuario consistente.

## 2. 🛠️ Tecnologías utilizadas

| Tecnología | Aplicación |
|---|---|
| HTML5 | Estructura y contenido. |
| CSS3 | Estilos y diseño personalizado. |
| Bootstrap 5.3 | Diseño responsive y componentes. |
| JavaScript | Interactividad y lógica del frontend. |
| JSON Server | Simulación de una API REST. |
| Node.js / npm | Entorno y gestión de dependencias. |
| Git | Control de versiones. |
| GitHub | Repositorio y colaboración. |
| GitHub Pages | Publicación del frontend. |

## 3. 🏗️ Arquitectura del proyecto

El proyecto utiliza una arquitectura separada en dos partes:

**Frontend:** aplicación estática desarrollada con HTML, CSS y JavaScript, publicada mediante GitHub Pages.

**Backend:** API REST desarrollada con JSON Server, encargada de proporcionar los datos del catálogo.

La comunicación entre ambas partes se realiza mediante peticiones HTTP utilizando `fetch()` desde un módulo centralizado.

```text
Navegador
    |
    v
GitHub Pages
    |
    v
HTML + CSS + JavaScript
    |
    v
api.js
    |
    v
fetch() / HTTPS
    |
    v
JSON Server
    |
    v
db.json
```

La API tendrá operaciones GET, POST, PUT/PATCH y DELETE para consultar y administrar los libros.

## 4. 📁 Estructura del proyecto

```text
BiblioWeb/
│
├── index.html
│
├── pages/
│   ├── catalogo.html
│   ├── login.html
│   └── admin.html
│
├── css/
│   ├── base.css
│   ├── componentes.css
│   └── estilos.css
│
├── js/
│   ├── auth.js
│   ├── guard.js
│   ├── tema.js
│   ├── config.js
│   ├── api.js
│   ├── landing.js
│   └── admin.js
│
├── img/
│   └── libros/
│
├── api/
│   ├── db.json
│   ├── package.json
│   └── package-lock.json
│
├── documentacion/
│
├── .gitignore
└── README.md
```

### Responsabilidad de los archivos JavaScript

| Archivo | Responsabilidad |
|---|---|
| `config.js` | Configuración de la URL de la API. |
| `api.js` | Centralización de las peticiones HTTP. |
| `auth.js` | Inicio y cierre de sesión. |
| `guard.js` | Protección del panel administrativo. |
| `tema.js` | Administración del tema claro y oscuro. |
| `landing.js` | Consulta y visualización de libros en el inicio. |
| `admin.js` | Gestión administrativa y operaciones CRUD. |

**Principio de organización:** cada archivo debe tener una responsabilidad específica. Los módulos de visualización no deben realizar peticiones `fetch()` directamente; deben utilizar las funciones centralizadas en `api.js`.

## 5. 📖 Estructura de datos

El recurso principal de nuestra API será `libros`.

Cada registro tendrá inicialmente los siguientes atributos:

| Campo | Tipo | Descripción |
|---|---|---|
| id | String | Identificador único. |
| titulo | String | Título del libro. |
| autor | String | Autor de la obra. |
| categoria | String | Categoría bibliográfica. |
| descripcion | String | Descripción del libro. |
| imagen | String | Ruta de la portada. |
| disponible | Boolean | Disponibilidad del libro. |

Ejemplo de `api/db.json`:

```json
{
  "libros": [
    {
      "id": "1",
      "titulo": "Cosmos",
      "autor": "Carl Sagan",
      "categoria": "Ciencia",
      "descripcion": "Un viaje por el universo.",
      "imagen": "img/libros/libro1.jpeg",
      "disponible": true
    }
  ]
}
```

Esta estructura será el contrato de datos compartido entre los integrantes para garantizar que todos los módulos trabajen con los mismos atributos.

## 6. 🔄 Funcionalidades del sistema

### Funcionalidades existentes

- Página de inicio.
- Catálogo visual de libros.
- Inicio de sesión demostrativo para administrador.
- Panel administrativo visual.
- Tema claro y oscuro.
- Diseño adaptable a diferentes dispositivos.

### Funcionalidades en desarrollo

- Conexión con JSON Server.
- Consulta dinámica de libros.
- Buscador y filtros.
- Registro de nuevos libros.
- Edición de registros.
- Eliminación de libros.
- Validación de formularios.
- Mensajes de confirmación y error.
- Integración completa entre frontend y API.

## 7. 👥 Equipo de desarrollo

El proyecto se desarrolla colaborativamente mediante la distribución de responsabilidades por módulos.

| Integrante | Responsabilidad | Rama |
|---|---|---|
| David | API e integración de datos. | `feat/api-integration` |
| Emanuel | Catálogo dinámico, búsqueda y filtros. | `feat/catalog-improvements` |
| Arley | Panel administrativo y CRUD. | `feat/admin-crud` |
| Yerson | Integración Full Stack, pruebas y revisión general. | `feat/fullstack-integration` |

Cada integrante tiene autonomía sobre su módulo, pero todos deben respetar la arquitectura y el contrato de datos establecidos por el equipo.

## 8. 🌿 Flujo de trabajo con Git

Utilizamos Git y GitHub para organizar el desarrollo y mantener un historial de cambios.

### Ramas principales

- `main`: rama principal y versión integrada del proyecto.
- `feat/api-integration`: desarrollo de la API.
- `feat/catalog-improvements`: mejoras del catálogo.
- `feat/admin-crud`: administración de libros.
- `feat/fullstack-integration`: integración y pruebas.

### Convenciones de commits

Utilizamos mensajes descriptivos siguiendo una convención sencilla:

| Prefijo | Uso |
|---|---|
| `feat:` | Nueva funcionalidad. |
| `fix:` | Corrección de errores. |
| `style:` | Cambios visuales. |
| `refactor:` | Mejoras en la organización del código. |
| `docs:` | Actualización de documentación. |
| `chore:` | Configuración y mantenimiento. |

Ejemplos:

```bash
git add .
git commit -m "feat: implementa consulta de libros"
git push
```

### Integración de cambios

1. Cada integrante trabaja en su rama.
2. Realiza commits pequeños y descriptivos.
3. Publica sus avances en GitHub.
4. Crea un Pull Request hacia `main`.
5. El equipo revisa los cambios.
6. Se integran las funcionalidades después de su validación.

**Regla:** no realizar cambios directamente sobre `main`.

## 9. 💻 Instalación y ejecución local

### Requisitos

- Git.
- Node.js.
- npm.
- Visual Studio Code.
- Navegador web.

### 1. Clonar el repositorio

```bash
git clone https://github.com/C8-Orion/BiblioWeb.git
```

Ingresar al proyecto:

```bash
cd BiblioWeb
```

### 2. Instalar las dependencias de la API

```bash
cd api
npm install
```

### 3. Iniciar JSON Server

Desde la carpeta `api`, ejecutar:

```bash
npx json-server db.json --port 3000
```

La API estará disponible localmente en:

```text
http://localhost:3000/libros
```

### 4. Iniciar el frontend

Abrir otra terminal en VS Code, ubicarse en la carpeta principal y ejecutar el proyecto mediante Live Server.

La aplicación podrá consultarse desde la dirección local proporcionada por Live Server.

**Importante:** para el desarrollo local necesitamos dos procesos activos: JSON Server y Live Server.

## 10. 🚀 Despliegue

El despliegue contempla dos servicios independientes:

| Componente | Servicio |
|---|---|
| Frontend | GitHub Pages |
| Backend | Servicio de alojamiento compatible con Node.js. |

La API deberá desplegarse en un servicio externo que proporcione una dirección HTTPS pública.

El archivo `js/config.js` permitirá configurar la dirección local durante el desarrollo y la dirección pública durante la producción.

**Nota:** GitHub Pages publica el frontend, pero no ejecuta JSON Server. Por eso necesitamos alojar la API por separado.

## 11. 📋 Documentación y seguimiento

La carpeta `documentacion/` almacenará:

- Diseños y referencias de Stitch.
- Capturas de pantalla.
- Evidencias de funcionamiento.
- Documentación técnica.
- Material de apoyo para las pruebas.

El equipo utilizará el tablero de Jira para organizar las tareas, asignar responsables y hacer seguimiento al desarrollo.

## 12. 🔐 Consideraciones de seguridad

El inicio de sesión actual es de carácter demostrativo.

El uso de `sessionStorage` y credenciales almacenadas en JavaScript no constituye un mecanismo de autenticación seguro para producción.

JSON Server está orientado a simular una API REST y no proporciona por sí mismo autenticación, autorización ni controles de seguridad para una aplicación real.

Una versión productiva requeriría un backend con autenticación y autorización adecuadas.

---

**BiblioWeb — Proyecto colaborativo de desarrollo de software.**

Desarrollado por David, Emanuel, Arley y Yerson.