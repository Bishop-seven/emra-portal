/* Proyectos estratégicos · contenido curado para la página «Proyectos Estratégicos» (subpágina de Actualidad en emra.cl).
   Se combina con emra-estrategicas.js (nombre, institución, OE, zona y actualizaciones salen de ahí, por ID).
   Aquí va solo lo que no está en el repositorio: descripción revisada, fotos y video de la presentación al Directorio.

   Campos por proyecto:
     ids     → ID(s) del REPOSITORIO EMRA. Si son varios, se muestran en una sola ficha (ej. 1 + 2).
     nom     → nombre a mostrar (opcional; si falta se usa el del repositorio).
     desc    → párrafos de descripción (desde «Detalle iniciativa» del REPOSITORIO, sin nombres de empresas privadas).
     puntos  → lista opcional bajo la descripción.
     fotos   → [{src, alt}] la primera es la portada.
     video   → {yt:'ID de YouTube'} o {mp4:'https://…'}; vacío = solo fotos.
     videoTxt→ texto bajo el video (opcional).
   El orden de esta lista es el orden de la página. Un proyecto que no está aquí no se muestra. */
window.EMRA_PROYECTOS_EST = [
  {
    ids: ['1', '2'],
    nom: 'Plan de Reconversión de Patios Ferroviarios',
    desc: [
      'El Plan de Reconversión de Patios Ferroviarios busca transformar un sitio industrial en un nuevo espacio urbano sostenible, inclusivo y catalizador de futuro para Antofagasta, que apunta a habilitar sus 48 hectáreas ubicadas en el centro de la ciudad.',
      'Esto es clave tanto para el desarrollo futuro y la continuidad operacional de la empresa como para la propia ciudad, ya que traerá grandes oportunidades para un sector neurálgico de Antofagasta al mejorar su conectividad, habilitar espacios residenciales y comerciales, potenciar su patrimonio y generar más espacios públicos seguros para la comunidad.',
      'Para llevar a cabo este inédito proyecto, los diálogos abiertos con la comunidad son claves: es fundamental crear confianza con las comunidades y vecinos a través de la participación activa. La iniciativa busca constituirse en un referente en la reconversión de espacios industriales, participación de la comunidad y planificación del desarrollo urbano en Chile e incluso a nivel internacional.'
    ],
    puntos: [
      'ID 1 · Habilitación de suelos: remediación de las 48 hectáreas de patios ferroviarios (RCA aprobada 0237/2021).',
      'ID 2 · Obras de urbanización del Patio Antofagasta.'
    ],
    fotos: [
      { src: 'proyectos/patios-ferroviarios-1.jpg', alt: 'Imagen objetivo: explanada y edificio patrimonial de la estación, con el cerro de fondo' },
      { src: 'proyectos/patios-ferroviarios-2.jpg', alt: 'Vista aérea de los patios ferroviarios junto a la costa de Antofagasta' },
      { src: 'proyectos/patios-ferroviarios-3.jpg', alt: 'Imagen objetivo: paseo peatonal junto a las bodegas ferroviarias restauradas' },
      { src: 'proyectos/patios-ferroviarios-4.jpg', alt: 'Imagen objetivo nocturna de la estación con la nueva plaza' },
      { src: 'proyectos/patios-ferroviarios-5.jpg', alt: 'Imagen objetivo: andenes cubiertos convertidos en paseo con jardines' }
    ],
    // Video presentado al Directorio (archivo «FCAB LANDSCAPE 1920X1080.mp4», 4:19), en YouTube desde el 23-nov-2026.
    video: { yt: 'https://youtu.be/AfXoAPInEmI' },
    videoTxt: 'Video presentado en la sesión de Directorio EMRA.'
  },
  {
    ids: ['6'],
    desc: [
      'El proyecto busca mejorar la calidad de vida de la ciudad al no descargar aguas servidas pretratadas a la bahía de Antofagasta. Además, permite incorporar una fuente nueva de agua para uso industrial de gran caudal y generar desarrollo productivo en la región.',
      'Consiste en captar las aguas a la salida del sistema de pretratamiento, antes de su descarga al mar por el emisario submarino existente, e impulsarlas al Salar del Carmen, ubicado a 17 km y a 520 msnm, donde se construirá una planta de tratamiento de aguas servidas (PTAS) que permita disponer de agua de calidad industrial para procesos productivos de empresas locales.',
      'Desde la nueva planta se construirán dos conducciones de unos 25 km cada una: hacia el norte, hasta el sector de la plaza de peaje de la Ruta 5 hacia Calama, y hacia el sur, hasta el sector industrial de La Negra.'
    ],
    fotos: [],
    video: {}
  },
  {
    ids: ['74'],
    desc: [
      'Convenio de programación «Ampliación de la oferta portuaria para el cumplimiento de tratados internacionales con Paraguay y Bolivia, y captura de demanda de carga por el Corredor Bioceánico Capricornio».',
      'Es un conjunto de iniciativas que mejorará las condiciones operativas en el sector de La Negra y Portezuelo. Contempla macrourbanización, extensiones de la red eléctrica y de la infraestructura vial. Es un convenio de programación a 5 años entre la Empresa Portuaria Antofagasta y el Gobierno Regional, que considera 17 proyectos, entre ellos:'
    ],
    puntos: [
      'Construcción de zona de parqueo y servicios básicos; descanso de camiones en La Negra.',
      'Construcción de caletera de tránsito de la Zona de Desarrollo Logístico La Negra y conexión a la Ruta 5; urbanización de la zona, sector pyme y primaria. Parqueo de camiones en el Antepuerto Portezuelo.',
      'Ampliación del molo de abrigo del puerto; estudios para un centro educativo, cultural y/o turístico, y para el desarrollo de infraestructura portuaria en Tocopilla.'
    ],
    fotos: [],
    video: {}
  },
  {
    ids: ['275'],
    nom: 'Proyecto Mejoras Plantas ENAMI · «Planta Procesamiento ENAMI»',
    desc: [
      'Aumentar la capacidad de las plantas de procesamiento de ENAMI mediante la instalación de nuevos chancadores, que permitirán recibir colpas de mayor tamaño que las actuales.',
      'Incluye un diagnóstico de los actuales procesos de gestión de las plantas de procesamiento de mineral de la región y propuestas de mejora para incrementar el procesamiento, cumpliendo con la normativa ambiental vigente.'
    ],
    fotos: [],
    video: {}
  },
  {
    ids: ['548'],
    desc: [
      'Conjunto de obras públicas emblemáticas que tienen por propósito mejorar la calidad de vida de los habitantes de la Villa San Pedro de Coloso. Las obras incluyen jardín infantil, gimnasio multiuso, centro médico, muros y taludes y una nueva caleta pesquera, entre otras acciones.',
      'Fueron comprometidas por la empresa a través de Compromisos Voluntarios Ambientales establecidos en la RCA de la Planta Desaladora de Coloso y en el Plan 6+1, iniciativa complementaria que contempla la ejecución de 7 proyectos enfocados en mejorar la calidad de vida del sector.'
    ],
    fotos: [],
    video: {}
  }
];
