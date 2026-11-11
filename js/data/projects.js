/**
 * Datos estructurados de los Casos de Estudio mostrados en el modal de arquitectura.
 * Actualiza cada `repoUrl` con el slug exacto de tu repositorio en GitHub.
 */
export const CASE_STUDIES = {
  lignum: {
    tag: 'ERP & POS · Arquitectura N-Tier',
    title: 'Lignum ERP & POS',
    summary:
      'Sistema empresarial web a medida para la industria maderera y melamina. Diseñado para controlar ventas, inventario de tableros, optimización de cortes, emisión electrónica y caja en tiempo real.',
    arch:
      'Cliente (Vanilla JS + Tailwind) -> API REST FastAPI (JWT + 5 niveles RBAC) -> Neon PostgreSQL + Integración Nubefact/Migo + Spooler Impresión Térmica Dual',
    highlights: [
      '5 niveles de control de acceso basado en roles (RBAC) con trazabilidad completa.',
      'Facturación electrónica integrada con Nubefact / Migo e impresión térmica dual de comprobantes.',
      'Suite de 34 pruebas unitarias y de integración automatizadas con Pytest en producción.'
    ],
    screenshots: [
      {
        src: './assets/projects/lignum/lignum-pos.png',
        label: 'Punto de Venta',
        caption: 'POS en tiempo real con conexión Lepton, carga .DAT, optimizador 2D y vista previa de ticket térmico.'
      },
      {
        src: './assets/projects/lignum/lignum-admin.jpg',
        label: 'Panel Admin',
        caption: 'Panel financiero con ingresos, Reporte IA del Día, control de cobranzas y cupones de un solo uso.'
      },
      {
        src: './assets/projects/lignum/lignum-inventario.jpg',
        label: 'Inventario & Precios',
        caption: 'Gestión de catálogo por fabricante (Pelikano, Amazónico, Medelk, Vesto, Masisa) y módulo WebXR.'
      },
      {
        src: './assets/projects/lignum/lignum-login.png',
        label: 'Acceso RBAC',
        caption: 'Pantalla de acceso autenticada con control granular de permisos por rol.'
      }
    ],
    repoUrl: 'https://github.com/robertpid/lignum-showcase'
  },
  aml: {
    tag: 'Data Engineering · Lakehouse',
    title: 'End-to-End AML Data Pipeline',
    summary:
      'Pipeline de ingeniería de datos orientado a la detección de patrones sospechosos de lavado de activos mediante procesamiento distribuido y calidad de datos incremental.',
    arch:
      'Ingesta Cruda (Bronze) -> Limpieza, Normalización & Deduplicación PySpark (Silver) -> Reglas de Riesgo & Agregaciones (Gold) -> Azure SQL + CI/CD Docker / GitHub Actions',
    highlights: [
      'Arquitectura Medallón (Bronze, Silver, Gold) ejecutada sobre Databricks y PySpark.',
      'Contenerización con Docker y flujo automatizado de despliegue e integración con GitHub Actions.',
      'Persistencia analítica optimizada hacia Azure SQL para consumo de cumplimiento y auditoría.'
    ],
    repoUrl: 'https://github.com/robertpid/end-to-end-aml-pipeline'
  },
  kyberna: {
    tag: 'Multi-Agent AI · Hackathon IA+',
    title: 'Kyberna IA (Hackathon IA+)',
    summary:
      'Sistema multi-agente impulsado por IA para la predicción temprana de desastres naturales y coordinación logística en tiempo real ante emergencias.',
    arch:
      'APIs NASA EONET / NOAA / SENAMHI + Web Scraping -> Orquestador Multi-Agente Python -> API de Respuesta -> Dashboard Interactivo React',
    highlights: [
      'Ingesta multi-fuente en tiempo real combinando NASA EONET, NOAA y SENAMHI.',
      'Agentes especializados en análisis de riesgo geográfico, rutas logísticas y priorización de recursos.',
      'Interfaz React orientada a toma de decisiones rápidas bajo escenarios críticos.'
    ],
    screenshots: [
      {
        src: './assets/projects/kyberna/kyberna-comando.jpg',
        label: 'Centro de Mando',
        caption: 'Modelo ML predictivo (93.9% riesgo), mapa logístico OSRM en tiempo real y desvíos seguros.'
      },
      {
        src: './assets/projects/kyberna/kyberna-respuesta.jpg',
        label: 'Plan de Respuesta',
        caption: 'Verificación social anti-fake news (97.5% credibilidad) y protocolos operacionales INDECI / COEN.'
      }
    ],
    repoUrl: 'https://github.com/robertpid/kyberna-ia'
  },
  crm: {
    tag: 'B2B Platform · Automation',
    title: 'CRM B2B & Data Scraper (AIESEC)',
    summary:
      'Plataforma interna de gestión de relaciones corporativas y enriquecimiento automático de cuentas para AIESEC Perú, eliminando cuellos de botella operativos.',
    arch:
      'Workers de Web Scraping (Python) -> Limpieza & Deduplicación -> FastAPI -> Neon PostgreSQL (Consultas indexadas sin latencia)',
    highlights: [
      'Gestión centralizada y seguimiento en tiempo real de más de 800 entidades corporativas.',
      'Extracción automatizada de datos de contacto y perfiles empresariales.',
      'Consultas instantáneas sobre PostgreSQL Serverless (Neon) para equipos comerciales B2B.'
    ],
    screenshots: [
      {
        src: './assets/projects/aiesec/aiesec-pipeline.jpg',
        label: 'Pipeline ODS',
        caption: 'Pipeline comercial con más de 830 organizaciones segmentadas por estado, distrito y alertas de prospección.'
      },
      {
        src: './assets/projects/aiesec/aiesec-scraper.jpg',
        label: 'Web Scraping',
        caption: 'Rastreo inteligente en Bumeran, Computrabajo, LinkedIn, Instagram y APCI con scoring de afinidad ODS.'
      },
      {
        src: './assets/projects/aiesec/aiesec-calendario.jpg',
        label: 'Calendario B2B',
        caption: 'Agenda estratégica y trazabilidad de reuniones Google Meet o presenciales por Account Manager.'
      },
      {
        src: './assets/projects/aiesec/aiesec-login.jpg',
        label: 'Acceso B2B',
        caption: 'Portal autenticado de la plataforma B2B & Convenios para el equipo comercial de AIESEC.'
      }
    ],
    repoUrl: 'https://github.com/robertpid/CMR-AIESEC-showcase'
  },
  moss: {
    tag: 'Edge AI · Embedded IoT',
    title: 'HELIOS · Biomimetic Edge AI & Telemetry',
    summary:
      'Sistema de telemetría multi-cerebro con hardware vestible e inteligencia en el borde diseñado para capturar métricas ambientales y de campo con baja latencia sin depender de Wi-Fi tradicional.',
    arch:
      'Nodos Sensores ESP32 (C++) --[ESP-NOW]--> Gateway Maestro -> Bridge Python + Edge AI & APIs Climáticas -> Alertas Telegram Webhooks',
    highlights: [
      'Comunicación peer-to-peer directa entre microcontroladores ESP32 mediante protocolo ESP-NOW.',
      'Mapeo climático e inferencia en tiempo real cruzando sensores locales con APIs meteorológicas.',
      'Notificaciones y comandos remotos automatizados vía bots y webhooks de Telegram.'
    ],
    repoUrl: 'https://github.com/robertpid/HELIOS-Biomimetic-Edge-AI'
  },
  'pys-rendimiento': {
    tag: 'Industrial BI · Analytics',
    title: 'App de Rendimiento Industrial (PyS)',
    summary:
      'Aplicación analítica en Streamlit y Pandas para el control de rendimientos operativos, tiempos muertos y eficiencia por turno en planta de procesamiento PyS.',
    arch:
      'Registros de Turno & Producción -> Limpieza y Transformación Pandas -> Cálculo de KPIs / OEE -> Dashboard Interactivo Streamlit',
    highlights: [
      'Monitoreo de rendimientos por línea, lote y turno para detectar cuellos de botella en planta.',
      'Análisis cuantitativo de tiempos muertos, mermas y eficiencia operativa con Pandas.',
      'Visualización ejecutiva interactiva en Streamlit orientada a decisiones rápidas de producción.'
    ],
    repoUrl: 'https://github.com/robertpid/PyS_app_redimiento'
  }
};

