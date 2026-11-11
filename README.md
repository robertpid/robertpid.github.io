# Portafolio Profesional — Robert Alejandro Pérez Soto (Trebor)

Sitio web modular desarrollado con **HTML5 semántico**, **CSS modular**, **Tailwind CSS (CDN)**, **iconografía SVG propia** (sin emojis ni librerías externas de iconos) y **JavaScript nativo (ES Modules)**, sin *build step* para desplegarse directamente en **GitHub Pages**.

## Estructura Modular del Proyecto

```text
portafolio/
├── index.html                  # Documento principal, SVG custom y landmarks semánticos
├── README.md                   # Documentación del sistema y despliegue
├── assets/
│   └── robert-perez.jpg        # Fotografía profesional integrada en la Hero Section
├── styles/
│   ├── tokens.css              # Variables CSS, color-scheme, scrollbars y scroll suave
│   └── components.css          # Glassmorphism, spotlight, scroll-progress, scrollspy y a11y
└── js/
    ├── main.js                 # Orquestador ES Module de entrada
    ├── data/
    │   └── projects.js         # Datos de los 6 casos de estudio (CASE_STUDIES)
    └── modules/
        ├── navigation.js       # Menú móvil accesible + Scrollspy (nativo + fallback)
        ├── animations.js       # IntersectionObserver fade-up + fallback scroll-progress
        ├── stackFilter.js      # Filtrado interactivo por categoría del Stack Tecnológico
        ├── projectModal.js     # Modal nativo <dialog> para Arquitectura y README
        ├── spotlight.js        # Efecto radial spotlight en tarjetas .glass-card
        ├── particles.js        # Constelación interactiva tricolor debajo de los banners
        ├── hudProfile.js       # Toggle Foto / Pixel ID estilo Cajathón HUD en el Hero
        ├── roleRotator.js      # Consola rotativa de especialidades en el Hero
        └── contact.js          # Año dinámico, fallback de foto Hero y copia de correo
```

## Vista Previa Local

Al usar ES Modules (`<script type="module">`), los navegadores requieren servir los archivos mediante HTTP (no `file://`):

```bash
npx serve -l 8000
```

Luego abre `http://localhost:8000` en tu navegador.

## Personalización Rápida

1. **Redes sociales**: Busca los comentarios `TODO` en `index.html` para actualizar las URLs exactas de **LinkedIn** e **Instagram**.
2. **Repositorios de proyectos**: Edita `repoUrl` para cada entrada dentro de `js/data/projects.js`.

## Despliegue en GitHub Pages

1. Sube la carpeta completa a la rama `main` de tu repositorio (`robertpid.github.io` o repositorio de proyecto).
2. En GitHub, ve a **Settings -> Pages**, selecciona **Deploy from a branch** (`main` / `root`) y guarda.
