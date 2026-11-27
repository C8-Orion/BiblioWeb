# Diseño y maquetación de BiblioWeb --- Google Stitch

## Proyecto de diseño

**Nombre:** BiblioWeb Frontend Portal\
**Herramienta:** Google Stitch\
**Enlace al proyecto:**
https://stitch.google.com/projects/3868128387779378376

Este documento resume el trabajo de diseño y exploración visual
realizado en Google Stitch para orientar la evolución del frontend de
BiblioWeb. Los prototipos sirven como referencia visual para la
implementación; no sustituyen el código funcional del repositorio.

## Objetivo

Definir una experiencia visual coherente para una plataforma
bibliotecaria que permita consultar el catálogo y que incluya una zona
de acceso y administración. Durante el proceso se exploraron distintas
propuestas de interfaz, paletas de color y variantes de tema hasta
establecer una dirección visual para el proyecto.

## Pantallas trabajadas

En Stitch se plantearon y exploraron las siguientes vistas:

-   **Inicio (`index.html`):** presentación de BiblioWeb, navegación y
    secciones informativas para orientar al visitante.
-   **Catálogo (`catalogo.html`):** visualización de libros mediante
    tarjetas, con elementos para consultar información y explorar el
    catálogo.
-   **Inicio de sesión (`login.html`):** formulario de acceso al área
    administrativa.
-   **Administración (`admin.html`):** interfaz de gestión de libros e
    información del inventario.

También se realizaron exploraciones de variantes visuales para el inicio
y el panel administrativo, incluyendo propuestas en modo oscuro.

## Identidad visual

Durante el diseño se compararon varias direcciones cromáticas. La línea
visual seleccionada como referencia principal es **Café, Roble y
Almendra**, por su relación con la lectura, los libros y los materiales
cálidos.

### Paleta de referencia

  -----------------------------------------------------------------------
  Color                   Código                  Uso propuesto
  ----------------------- ----------------------- -----------------------
  Almond Cream            `#EDE0D4`               Fondo claro principal

  Pale Oak                `#E6CCB2`               Superficies y tonos
                                                  secundarios

  Tan                     `#DDB892`               Acentos y detalles

  Faded Copper            `#B08968`               Bordes, superficies y
                                                  acentos

  Coffee Bean             `#7F5539`               Color institucional
                                                  principal

  Toffee Brown            `#9C6644`               Acciones secundarias y
                                                  elementos destacados

  Deep Espresso           `#382417`               Texto oscuro de alto
                                                  contraste
  -----------------------------------------------------------------------

Los colores son una guía de identidad visual. Antes de aplicarlos de
forma definitiva, el equipo debe comprobar su contraste y legibilidad en
cada componente y estado.

## Modo oscuro

También se exploró una variante oscura para mantener la identidad visual
de BiblioWeb en condiciones de baja iluminación. La propuesta evita el
negro puro y utiliza tonos cálidos:

-   Fondo general: `#1E1510`.
-   Tarjetas, navegación y modales: `#2B1E16`.
-   Bordes: `#7F5539`.
-   Texto principal: `#EDE0D4`.
-   Texto secundario: `#E6CCB2`.
-   Color principal de acciones: `#9C6644`.
-   Acentos: `#DDB892`.

La referencia de implementación contempla el atributo `data-bs-theme` de
Bootstrap 5.3 y el archivo `js/tema.js` para alternar entre los temas
claro y oscuro. La preferencia del usuario puede persistirse en
`localStorage`.

## Criterios de implementación

Al llevar los diseños al proyecto, el equipo debe procurar:

1.  Mantener una identidad visual consistente entre inicio, catálogo,
    login y administración.
2.  Utilizar HTML5 semántico y una estructura clara.
3.  Aprovechar Bootstrap 5.3 para la distribución responsive y los
    componentes que correspondan.
4.  Centralizar los tokens y variables de diseño en los archivos CSS del
    proyecto, evitando repetir valores innecesariamente.
5.  Reutilizar estilos y componentes cuando sea posible.
6.  Verificar la adaptación a dispositivos móviles, la legibilidad, el
    contraste, los estados de interacción y la navegación por teclado.
7.  Implementar la funcionalidad con el JavaScript del proyecto; los
    prototipos visuales de Stitch son una guía y deben integrarse con la
    arquitectura existente.

## Relación con el desarrollo

Google Stitch se utilizó para explorar y definir la propuesta visual. La
implementación final se realizará en los archivos existentes de
BiblioWeb:

-   `index.html`
-   `pages/catalogo.html`
-   `pages/login.html`
-   `pages/admin.html`
-   `css/base.css`
-   `css/componentes.css`
-   `css/estilos.css`
-   Los archivos JavaScript correspondientes a cada funcionalidad.

Los diseños no implican que todas las pantallas o interacciones estén ya
implementadas. Cada integrante debe contrastar su trabajo con esta
referencia y coordinar los cambios para conservar la coherencia visual.

## Acuerdos para el equipo

-   Consultar el proyecto de Stitch antes de modificar la apariencia de
    una pantalla.
-   Mantener la paleta y los criterios visuales acordados, salvo que el
    equipo apruebe un cambio.
-   No reemplazar directamente las páginas funcionales por exportaciones
    de Stitch sin revisar rutas, dependencias, accesibilidad e
    integración con la API.
-   Registrar en GitHub los cambios de implementación y utilizar Jira
    para dar seguimiento a las tareas.

## Recurso principal

[Consultar el proyecto BiblioWeb Frontend Portal en Google
Stitch](https://stitch.google.com/projects/3868128387779378376)
