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
    repoUrl: 'https://github.com/robertpid'
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
    repoUrl: 'https://github.com/robertpid'
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
    repoUrl: 'https://github.com/robertpid'
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
    repoUrl: 'https://github.com/robertpid'
  },
  moss: {
    tag: 'IoT · Embedded Systems',
    title: 'M.O.S.S. / Helio (Wearable IoT Telemetry)',
    summary:
      'Sistema de telemetría multi-cerebro con hardware vestible diseñado para capturar métricas ambientales y de campo con comunicación de baja latencia sin depender de Wi-Fi tradicional.',
    arch:
      'Nodos Sensores ESP32 (C++) --[ESP-NOW]--> Gateway Maestro -> Bridge Python + APIs Climáticas -> Alertas Telegram Webhooks',
    highlights: [
      'Comunicación peer-to-peer directa entre microcontroladores ESP32 mediante protocolo ESP-NOW.',
      'Mapeo climático en tiempo real cruzando sensores locales con APIs meteorológicas.',
      'Notificaciones y comandos remotos automatizados vía bots y webhooks de Telegram.'
    ],
    repoUrl: 'https://github.com/robertpid'
  },
  'industrial-asherah': {
    tag: 'Industrial BI & 3D Game Dev',
    title: 'Dashboard de Optimización Industrial & ASHERAH',
    summary:
      'Dos frentes complementarios de ingeniería aplicada: analítica operativa para planta pesquera en Streamlit/Pandas y desarrollo integral del videojuego 3D ASHERAH en Godot Engine.',
    arch:
      'Planta: Registros de Turno -> Pandas ETL -> Streamlit KPIs | Juego: Godot Engine (GDScript) -> Shaders CRT 3D + Audio Psicológico',
    highlights: [
      'Control de rendimientos, detección de cuellos de botella y reducción de tiempos muertos en planta.',
      'ASHERAH: videojuego de terror psicológico retro 3D estilo PS1 con shaders CRT personalizados.',
      'Composición musical, diseño sonoro e ingeniería gráfica implementados de forma integral.'
    ],
    repoUrl: 'https://github.com/robertpid'
  }
};

