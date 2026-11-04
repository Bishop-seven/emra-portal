/* Minería en Números · tarjetas del juego "¿Dato o mito?", de la página independiente
   dato-o-mito.html (portal.emra.cl/dato-o-mito, para la campaña de Instagram).
   Se editan aquí, sin tocar la página. Cada tarjeta lleva su fuente y, si sale del libro,
   la página del PDF ("Minería en Números", 8ª ed., Consejo Minero, mayo 2025). */
// ══════════════════════════════════════════════════════════════════════
//  f   = la frase que se muestra (el jugador decide si es dato o mito)
//  r   = respuesta correcta: 'dato' (verdadero) o 'mito' (falso)
//  tag = tema, en la etiqueta de la tarjeta
//  n   = cifra destacada de la respuesta
//  d   = explicación que aparece al responder
//  s   = fuente original
//  p   = página del libro Minería en Números; '' si el dato no viene del libro
//  img = imagen opcional (clave de FOTOS o ILUS en mineria-datos.js), se ve al responder
//  rev = PENDIENTE DE REVISIÓN: por qué hay que confirmarlo antes de dejarlo publicado
// ══════════════════════════════════════════════════════════════════════

// false = las tarjetas con `rev` no aparecen en el juego hasta que se revisen.
const DM_MOSTRAR_EN_REVISION=true;
// El link que se comparte al terminar: la página independiente del juego (la de la campaña).
const DM_URL='https://portal.emra.cl/dato-o-mito';

const DATO_O_MITO=[
  {tag:'Chile en el mundo',f:'Chile produce la mitad de todo el cobre del mundo.',r:'mito',
    n:'24%',d:'Chile es el mayor productor de cobre del mundo, pero produce cerca de 1 de cada 4 toneladas: el 24% del total mundial.',
    s:'Cochilco, Sernageomin, USGS',p:'9',img:'cobre-mundo'},
  {tag:'Región de Antofagasta',f:'Más de la mitad del cobre de Chile sale de la Región de Antofagasta.',r:'dato',
    n:'≈53%',d:'La Región de Antofagasta produce alrededor del 53% del cobre de Chile. Aquí está Escondida, la mina de cobre más grande del planeta.',
    s:'Documento oficial EMRA 2023–2050',p:''},
  {tag:'Litio',f:'Chile es el mayor productor de litio del mundo.',r:'mito',
    n:'2° lugar',d:'Chile es el segundo productor mundial de litio, con el 20% del total. También es tercero en molibdeno, con el 15%.',
    s:'Cochilco, Sernageomin, USGS',p:'9',img:'litio'},
  {tag:'Producción',f:'Codelco produce la mayor parte del cobre de Chile.',r:'mito',
    n:'24% / 76%',d:'Codelco produce el 24% del cobre de Chile. El 76% restante lo producen empresas privadas.',
    s:'Cochilco',p:'10',img:'codelco-privadas'},
  {tag:'La roca',f:'De cada tonelada de roca que se procesa se obtienen menos de 10 kilos de cobre.',r:'dato',
    n:'5,8 kg',d:'En 2004 una tonelada de roca daba 10 kg de cobre; en 2023, solo 5,8 kg. Por eso hoy hay que mover más roca para obtener el mismo cobre.',
    s:'Cochilco',p:'11',img:'ley-mineral'},
  {tag:'Gigantes',f:'Un camión minero puede cargar hasta 400 toneladas en un solo viaje.',r:'dato',
    n:'400 t',d:'Camiones como el Liebherr T 284 miden 7 metros de alto y cargan hasta 400 toneladas: el peso de unos 300 autos.',
    s:'Liebherr',p:'58',img:'camion',
    rev:'La equivalencia "el peso de unos 300 autos" no viene del libro (p.58 solo da 7 m de alto y 300 a 400 t de carga).'},
  {tag:'El cobre en tu vida',f:'La Estatua de la Libertad tiene una piel de cobre.',r:'dato',
    n:'31 t',d:'Su color verde es cobre oxidado. Su piel tiene 31 toneladas de cobre.',
    s:'Statue Statistics, National Park Service',p:'44',img:'estatua'},
  {tag:'Economía',f:'La minería es más de la mitad de toda la economía de Chile.',r:'mito',
    n:'12%',d:'La minería representa el 12% del PIB de Chile, y más del 20% si se suma su efecto en otros sectores.',
    s:'Banco Central, Cochilco',p:'16',img:'pib'},
  {tag:'Región de Antofagasta',f:'En la Región de Antofagasta, la minería es menos de la mitad de la economía.',r:'mito',
    n:'72%',d:'En la región la minería aporta el 72% del PIB regional y el 28,3% del empleo (2023).',
    s:'Documento oficial EMRA 2023–2050',p:'',img:'chuqui3',
    rev:'El libro (p.17, Banco Central) dice 52% del PIB regional, y la misma página lo muestra así en "Datos por tema" y en el quiz. Confirmar cuál cifra usar.'},
  {tag:'Exportación',f:'La mayor parte del cobre que exporta Chile sale como cátodos refinados.',r:'mito',
    n:'57%',d:'El 57% se exporta como concentrado (con cerca de 30% de cobre) y el 43% como refinado, sobre todo cátodos de 99,99% de pureza.',
    s:'Cochilco',p:'28-29',img:'catodo'},
  {tag:'Proveedores',f:'Más de 8.000 empresas chilenas son proveedoras de la minería.',r:'dato',
    n:'+8.400',d:'Más de 8.400 empresas chilenas venden bienes y servicios a la minería: desde ingeniería y tecnología hasta transporte y alimentación.',
    s:'Subrei',p:'69',img:'proveedores'},
  {tag:'Agua y energía',f:'El desierto de Atacama tiene una de las radiaciones solares más altas del mundo.',r:'dato',
    n:'3.500 kWh/m²',d:'Atacama registra una de las mayores incidencias solares del planeta. Por eso la región tiene uno de los mayores potenciales de energía renovable.',
    s:'Documento oficial EMRA 2023–2050',p:'',img:'solar'},
  {tag:'Agua',f:'Antofagasta tiene una planta desaladora para agua potable desde hace más de 20 años.',r:'dato',
    n:'2004',d:'En 2004 entró en operación en Antofagasta la primera planta desaladora para consumo humano. Hoy la región avanza hacia ciudades abastecidas con agua de mar.',
    s:'EMRA 2023–2050 · presentación de la Secretaría Ejecutiva (2026)',p:'',img:'desal',
    rev:'Viene de una presentación de la EMRA, no del libro Minería en Números.'}
];
