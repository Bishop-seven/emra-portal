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
//  ilu = ilustración de la tarjeta, mineria-img/<ilu>.jpg (800×450, hechas con Draw Things);
//        no debe delatar la respuesta
//  img = imagen opcional (clave de FOTOS o ILUS en mineria-datos.js), se ve al responder
//  rev = PENDIENTE DE REVISIÓN: por qué hay que confirmarlo antes de dejarlo publicado
// ══════════════════════════════════════════════════════════════════════

// false = las tarjetas con `rev` no aparecen en el juego hasta que se revisen.
const DM_MOSTRAR_EN_REVISION=true;
// Cuántas tarjetas muestra cada juego, sacadas al azar de la lista. Se pueden agregar todas las
// tarjetas que se quiera: el juego elige primero las que esa persona todavía no ha visto.
const DM_POR_JUEGO=7;
// El link que se comparte al terminar: la página independiente del juego (la de la campaña).
const DM_URL='https://portal.emra.cl/dato-o-mito';

const DATO_O_MITO=[
  {tag:'Chile en el mundo',f:'Chile produce la mitad de todo el cobre del mundo.',ilu:'dm-cobre-mundo',r:'mito',
    n:'24%',d:'Chile es el mayor productor de cobre del mundo, pero produce cerca de 1 de cada 4 toneladas: el 24% del total mundial.',
    s:'Cochilco, Sernageomin, USGS',p:'9',img:'cobre-mundo'},
  {tag:'Región de Antofagasta',f:'Más de la mitad del cobre de Chile sale de la Región de Antofagasta.',ilu:'dm-antofagasta',r:'dato',
    n:'≈53%',d:'La Región de Antofagasta produce alrededor del 53% del cobre de Chile. Aquí está Escondida, la mina de cobre más grande del planeta.',
    s:'Documento oficial EMRA 2023–2050',p:''},
  {tag:'Litio',f:'Chile es el mayor productor de litio del mundo.',ilu:'dm-litio',r:'mito',
    n:'2° lugar',d:'Chile es el segundo productor mundial de litio, con el 20% del total. También es tercero en molibdeno, con el 15%.',
    s:'Cochilco, Sernageomin, USGS',p:'9',img:'litio'},
  {tag:'Producción',f:'Codelco produce la mayor parte del cobre de Chile.',ilu:'dm-codelco',r:'mito',
    n:'24% / 76%',d:'Codelco produce el 24% del cobre de Chile. El 76% restante lo producen empresas privadas.',
    s:'Cochilco',p:'10',img:'codelco-privadas'},
  {tag:'La roca',f:'De cada tonelada de roca que se procesa se obtienen menos de 10 kilos de cobre.',ilu:'dm-roca',r:'dato',
    n:'5,8 kg',d:'En 2004 una tonelada de roca daba 10 kg de cobre; en 2023, solo 5,8 kg. Por eso hoy hay que mover más roca para obtener el mismo cobre.',
    s:'Cochilco',p:'11',img:'ley-mineral'},
  {tag:'Gigantes',f:'Un camión minero puede cargar hasta 400 toneladas en un solo viaje.',ilu:'dm-camion',r:'dato',
    n:'400 t',d:'Camiones como el Liebherr T 284 miden 7 metros de alto y cargan hasta 400 toneladas: el peso de unos 300 autos.',
    s:'Liebherr',p:'58',img:'camion',
    rev:'La equivalencia "el peso de unos 300 autos" no viene del libro (p.58 solo da 7 m de alto y 300 a 400 t de carga).'},
  {tag:'El cobre en tu vida',f:'La Estatua de la Libertad tiene una piel de cobre.',ilu:'dm-estatua',r:'dato',
    n:'31 t',d:'Su color verde es cobre oxidado. Su piel tiene 31 toneladas de cobre.',
    s:'Statue Statistics, National Park Service',p:'44',img:'estatua'},
  {tag:'Economía',f:'La minería es más de la mitad de toda la economía de Chile.',ilu:'dm-pib-chile',r:'mito',
    n:'12%',d:'La minería representa el 12% del PIB de Chile, y más del 20% si se suma su efecto en otros sectores.',
    s:'Banco Central, Cochilco',p:'16',img:'pib'},
  {tag:'Región de Antofagasta',f:'En la Región de Antofagasta, la minería es menos de la mitad de la economía.',ilu:'dm-pib-region',r:'mito',
    n:'72%',d:'En la región la minería aporta el 72% del PIB regional y el 28,3% del empleo (2023).',
    s:'Documento oficial EMRA 2023–2050',p:'',img:'chuqui3',
    rev:'El libro (p.17, Banco Central) dice 52% del PIB regional, y la misma página lo muestra así en "Datos por tema" y en el quiz. Confirmar cuál cifra usar.'},
  {tag:'Exportación',f:'La mayor parte del cobre que exporta Chile sale como cátodos refinados.',ilu:'dm-exporta',r:'mito',
    n:'57%',d:'El 57% se exporta como concentrado (con cerca de 30% de cobre) y el 43% como refinado, sobre todo cátodos de 99,99% de pureza.',
    s:'Cochilco',p:'28-29',img:'catodo'},
  {tag:'Proveedores',f:'Más de 8.000 empresas chilenas son proveedoras de la minería.',ilu:'dm-proveedores',r:'dato',
    n:'+8.400',d:'Más de 8.400 empresas chilenas venden bienes y servicios a la minería: desde ingeniería y tecnología hasta transporte y alimentación.',
    s:'Subrei',p:'69',img:'proveedores'},
  {tag:'Agua y energía',f:'El desierto de Atacama tiene una de las radiaciones solares más altas del mundo.',ilu:'dm-solar',r:'dato',
    n:'3.500 kWh/m²',d:'Atacama registra una de las mayores incidencias solares del planeta. Por eso la región tiene uno de los mayores potenciales de energía renovable.',
    s:'Documento oficial EMRA 2023–2050',p:'',img:'solar'},
  {tag:'Agua',f:'Antofagasta tiene una planta desaladora para agua potable desde hace más de 20 años.',ilu:'dm-desal',r:'dato',
    n:'2004',d:'En 2004 entró en operación en Antofagasta la primera planta desaladora para consumo humano. Hoy la región avanza hacia ciudades abastecidas con agua de mar.',
    s:'EMRA 2023–2050 · presentación de la Secretaría Ejecutiva (2026)',p:'',img:'desal',
    rev:'Viene de una presentación de la EMRA, no del libro Minería en Números.'},
  // ── Tarjetas agregadas el 4 de noviembre de 2026, todas del libro ──
  {tag:'Agua',f:'La minería es el sector que más agua usa en Chile.',ilu:'dm-agua',r:'mito',
    n:'4%',d:'La minería usa el 4% del agua de Chile. El sector agropecuario usa el 72%, el agua potable el 12%, la industria el 7% y la generación eléctrica el 5%.',
    s:'DGA',p:'79'},
  {tag:'Seguridad',f:'La minería es una de las actividades con más accidentes laborales en Chile.',ilu:'dm-seguridad',r:'mito',
    n:'0,9%',d:'Es al revés: la minería tiene la tasa de accidentes más baja por actividad económica, 0,9%, frente a 2,6% del promedio del país.',
    s:'Min. del Trabajo, SUSESO',p:'49'},
  {tag:'Trabajo',f:'Los sueldos de la minería son parecidos al promedio del país.',ilu:'dm-sueldos',r:'mito',
    n:'×2',d:'Los sueldos de la minería son más del doble que el promedio de Chile.',
    s:'Superintendencia de Pensiones',p:'43'},
  {tag:'Trabajo',f:'La mayoría de quienes trabajan en minería viajan desde otras regiones.',ilu:'dm-local',r:'mito',
    n:'7 de 10',d:'7 de cada 10 personas que trabajan en minería viven en la misma región donde trabajan.',
    s:'CCM-Eleva',p:'54'},
  {tag:'Producción',f:'La mayor parte del cobre de Chile sale de minas subterráneas.',ilu:'dm-rajo',r:'mito',
    n:'88%',d:'El 88% del cobre se extrae de minas a rajo abierto, es decir, a cielo abierto.',
    s:'Cochilco',p:'35'},
  {tag:'Producción',f:'Una mina grande de cobre funciona unos 5 años.',ilu:'dm-duracion',r:'mito',
    n:'25 años',d:'Un proyecto de la gran minería del cobre dura en promedio 25 años y produce 125.000 toneladas al año.',
    s:'CEPAL',p:'40'},
  {tag:'Mujeres en minería',f:'Las mujeres son menos del 5% de quienes trabajan en las empresas mineras.',ilu:'dm-mujeres',r:'mito',
    n:'23,1%',d:'Las mujeres ya son el 23,1% de quienes trabajan en las empresas mineras, y el sector se comprometió a duplicar su participación antes de 2030.',
    s:'Alianza CCM-Eleva',p:'50'},
  {tag:'El cobre en tu vida',f:'Un celular se fabrica con solo 3 o 4 minerales.',ilu:'dm-celular',r:'mito',
    n:'40',d:'Un teléfono necesita 40 minerales distintos.',
    s:'Minerals Council of Australia',p:'87'},
  {tag:'Región de Antofagasta',f:'La mina que más cobre produce en el mundo está en la Región de Antofagasta.',ilu:'dm-escondida',r:'dato',
    n:'+1 Mt',d:'Es Escondida: produce más de 1 millón de toneladas de cobre al año.',
    s:'BHP',p:'64'},
  {tag:'Gigantes',f:'La mina subterránea más grande del mundo está en Chile.',ilu:'dm-teniente',r:'dato',
    n:'3.000 km',d:'Es El Teniente, con 3.000 km de túneles: en línea recta, más o menos la distancia entre Santiago y Lima.',
    s:'Codelco',p:'61'},
  {tag:'Gigantes',f:'Chuquicamata llegó a ser el rajo abierto más grande del mundo.',ilu:'dm-chuqui',r:'dato',
    n:'800 m',d:'Chuquicamata mide 4,3 km de largo, 3 km de ancho y 800 metros de profundidad.',
    s:'Codelco',p:'60'},
  {tag:'El cobre en tu vida',f:'Un auto eléctrico lleva casi 4 veces más cobre que uno a bencina.',ilu:'dm-auto',r:'dato',
    n:'83 kg',d:'Un auto convencional lleva 23 kg de cobre; uno híbrido, 40 kg; uno eléctrico, 83 kg; y un bus eléctrico, 369 kg.',
    s:'ICA',p:'91',
    rev:'"Casi 4 veces" es un cálculo nuestro (83 ÷ 23 = 3,6); el libro solo da los kilos.'},
  {tag:'El cobre en tu vida',f:'En una casa hay unos 200 kilos de cobre.',ilu:'dm-casa',r:'dato',
    n:'200 kg',d:'En nuestras casas hay unos 200 kg de cobre, en cables y cañerías: el doble que hace 40 años.',
    s:'Codelco',p:'86'},
  {tag:'El cobre en tu vida',f:'El cobre se puede reciclar por completo.',ilu:'dm-reciclaje',r:'dato',
    n:'100%',d:'El cobre es 100% reciclable.',
    s:'Copper Alliance',p:'78'},
  {tag:'Exportación',f:'Más de la mitad de lo que Chile exporta son productos mineros.',ilu:'dm-exportaciones',r:'dato',
    n:'56%',d:'El 56% de las exportaciones de Chile son productos mineros, y el 88% de esas exportaciones mineras son de cobre.',
    s:'Banco Central',p:'30'},
  {tag:'Chile en el mundo',f:'China usa más de la mitad del cobre del mundo.',ilu:'dm-china',r:'dato',
    n:'60%',d:'China es el mayor consumidor: usa el 60% del cobre y el 29% del oro del mundo.',
    s:'Cochilco, World Gold Council',p:'23'},
  {tag:'El cobre en tu vida',f:'El cobre en los hospitales ayuda a reducir las infecciones.',ilu:'dm-hospital',r:'dato',
    n:'−58%',d:'El cobre antimicrobiano reduce hasta 58% las infecciones hospitalarias. En Chile, al menos 3 centros hospitalarios ya lo usan.',
    s:'Antimicrobial Copper 2017, Cochilco',p:'89-90'},
  {tag:'El cobre en tu vida',f:'Nuestro cuerpo necesita cobre.',ilu:'dm-cuerpo',r:'dato',
    n:'🦑 🍫 🍑',d:'El cuerpo humano necesita cobre. Se encuentra en calamares, chocolate, pasas, ostras, duraznos y papas.',
    s:'Codelco',p:'88'}
];
