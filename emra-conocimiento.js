/* EMRA · conocimiento compartido (portal.emra.cl/emra-conocimiento.js)
   Una sola fuente para:
     - Gorito en emra.cl (gorito.html) y Gorito del portal (index.html): se agrega a su system prompt.
     - El slider «EMRA en videos» (videos-home.html): tabla de la cartera de corto plazo.
   Las 37 iniciativas de mediano plazo NO van aquí: viven en Supabase (tabla `iniciativas`),
   se editan en el Panel Admin y Gorito las lee en vivo.
   Para actualizar la cartera de corto plazo: editar EMRA_CARTERA_CP y publicar (push). */
(function(){
var SPA='San Pedro de Atacama';
// [n°, ID EMRA, sector, tipología/proyecto, localidad, comuna, encargado del diseño] · 'DISPONIBLE' = sin encargado aún · 'PRIVADOS' = empresa privada (nombre oculto a pedido del cliente, 17-nov-2026)
// Fuente: doc «Texto explicativa Corto Plazo (071126)», hoja pág. Web 071126 (verificada 9-nov-2026).
var FILAS=[
  [1,'471','Salud','Posta','Socaire',SPA,'PRIVADOS'],
  [2,'472','Salud','Posta','Camar',SPA,'PRIVADOS'],
  [3,'470','Salud','Posta','Talabre',SPA,'PRIVADOS'],
  [4,'473','Salud','Posta','Río Grande',SPA,'PRIVADOS'],
  [5,'465','Salud','Posta','Caspana','Calama','GORE'],
  [6,'466','Salud','Posta','Ayquina','Calama','GORE'],
  [7,'555','Salud','Posta','Baquedano','Sierra Gorda','PRIVADOS'],
  [8,'467','Salud','Posta','Chiu-Chiu','Calama','PRIVADOS'],
  [9,'468','Salud','Posta','Ollagüe','Ollagüe','PRIVADOS'],
  [10,'469','Salud','Posta','Quillagua','María Elena','PRIVADOS'],
  [11,'474','Salud','CESFAM','Antofagasta','Antofagasta','GORE'],
  [12,'475','Salud','CESFAM','Antofagasta','Antofagasta','GORE'],
  [13,'723','Salud','CESFAM','Antofagasta','Antofagasta','GORE'],
  [14,'724','Salud','CESFAM','Antofagasta','Antofagasta','GORE'],
  [15,'725','Salud','CESFAM','Antofagasta','Antofagasta','GORE'],
  [16,'726','Salud','CESFAM','María Elena','María Elena','GORE'],
  [17,'478','Salud','CESFAM','Sierra Gorda','Sierra Gorda','PRIVADOS'],
  [18,'479','Salud','Hospital (prefactibilidad)',SPA,SPA,'PRIVADOS'],
  [19,'487/524','Agua','Normalización red de alcantarillado y APR','Toconao',SPA,'GORE-UCN'],
  [20,'488/493','Agua','Normalización red de alcantarillado y APR','Socaire',SPA,'GORE-UCN'],
  [21,'492','Agua','Construcción red de alcantarillado y PTAS','Paposo','Taltal','DISPONIBLE'],
  [22,'491','Agua','Mejoramiento sistema de APR','Quillagua','María Elena','PRIVADOS'],
  [23,'712','Agua','Mejoramiento de redes de agua potable, Ayllú de Solor','Ayllú de Solor',SPA,'DISPONIBLE'],
  [24,'713','Agua','Mejoramiento de planta de tratamiento de aguas servidas','Toconao',SPA,'GORE-UCN'],
  [25,'714','Agua','Mejoramiento de planta de tratamiento de aguas servidas','Socaire',SPA,'GORE'],
  [26,'715','Agua','Normalización PTAS (planta de tratamiento de aguas servidas) San Pedro de Atacama',SPA,SPA,'PRIVADOS'],
  [27,'497/527','Agua','Normalización sistema de APR y alcantarillado','Ayquina y Turi','Calama','PRIVADOS'],
  [28,'457','Agua','Normalización PTAS, Peine','Peine',SPA,'PRIVADOS'],
  [29,'496','Agua','Factibilidad y diseño APR y alcantarillado','Lasana','Calama','PRIVADOS'],
  [30,'499','Agua','Factibilidad y diseño alcantarillado','Chiu-Chiu','Calama','PRIVADOS'],
  [31,'495','Agua','Factibilidad y diseño APR y alcantarillado','Caspana','Calama','PRIVADOS'],
  [32,'716','Educación','Jardín Infantil Prat · diseño y ejecución, operador JUNJI','Antofagasta','Antofagasta','PRIVADOS'],
  [33,'717','Educación','Jardín Infantil Azufre · diseño y ejecución, operador JUNJI','Antofagasta','Antofagasta','PRIVADOS'],
  [34,'718','Educación','Jardín Infantil 03 · diseño y ejecución, operador JUNJI','Antofagasta','Antofagasta','PRIVADOS'],
  [35,'719','Educación','Jardín Infantil 04 · diseño y ejecución, operador JUNJI','Antofagasta','Antofagasta','PRIVADOS'],
  [36,'482','Educación','Jardín Río Loa · diseño y ejecución, operador JUNJI','Calama','Calama','PRIVADOS'],
  [37,'486','Educación','Jardín Infantil Pauna · diseño y ejecución, operador INTEGRA',SPA,SPA,'PRIVADOS'],
  [38,'720','Educación','Jardín Infantil 02 · diseño y ejecución, operador INTEGRA','María Elena','María Elena','PRIVADOS / GORE'],
  [39,'721','Educación','Jardín Infantil Pequeño Navegante · diseño y ejecución, operador INTEGRA','Antofagasta','Antofagasta','GORE'],
  [40,'625','Educación','Jardín Infantil 04 · diseño y ejecución, operador INTEGRA','Taltal','Taltal','DISPONIBLE'],
  [41,'553','Educación','Jardín Infantil 05 · diseño y ejecución, operador INTEGRA','Calama','Calama','DISPONIBLE'],
  [42,'727','Educación','Jardín Infantil Capullito · ejecución, operador JUNJI','Antofagasta','Antofagasta','GORE'],
  [43,'728','Educación','Jardín Infantil La Chimba · ejecución, operador JUNJI','Antofagasta','Antofagasta','GORE'],
  [44,'626','Educación','Escuela multigrado · a definir','Talabre',SPA,'DISPONIBLE'],
  [45,'627','Educación','Escuela multigrado · a definir','Socaire',SPA,'DISPONIBLE'],
  [46,'628','Educación','Escuela multigrado · a definir','Toconce',SPA,'DISPONIBLE']
];
var CARTERA=FILAS.map(function(r){return {n:r[0],id:r[1],s:r[2],p:r[3],loc:r[4],com:r[5],enc:r[6]};});
window.EMRA_CARTERA_CP=CARTERA;

var SECT={'Salud':'Salud','Agua':'Agua potable y alcantarillado','Educación':'Educación'};
var lineas=CARTERA.map(function(x){
  return '- ID '+x.id+' | '+SECT[x.s]+' | '+x.p+' | '+x.loc+' ('+x.com+') | encargado del diseño: '+(x.enc==='DISPONIBLE'?'DISPONIBLE (aún sin institución a cargo)':x.enc);
}).join('\n');

window.EMRA_CONOCIMIENTO=[
'INICIATIVAS DE MEDIANO PLAZO (diseño al 2035):',
'- Son 37 iniciativas, todas de mediano plazo. Son las que aparecen en el mapa del Portal EMRA y en la lista "Iniciativas" de este mensaje.',
'- La EMRA busca dar un salto en el desarrollo urbano de las capitales provinciales. 30 son iniciativas en que la región se puso de acuerdo y quiere construir en conjunto, y 7 son iniciativas estratégicas de responsabilidad del Gobierno, donde la región asume el compromiso de apoyar iniciativas regionales estratégicas que dependen del nivel central.',
'- Ejemplos: tren interurbano Mejillones–Antofagasta, tren urbano de Antofagasta, aeropuertos renovados, buses eléctricos, redes de aguas grises, Borde Río Loa, Parque Los Yacimientos, Marina Pública La Chimba, 17.400 soluciones habitacionales, centro oncológico, 100% de cobertura en jardines infantiles y una nueva fundición.',
'- No asignes a estas iniciativas años o etapas distintos de "mediano plazo, al 2035".',
'',
'ALIANZA ESTRATÉGICA DE CORTO PLAZO OE1 (Calidad de vida):',
'- Es la respuesta de la EMRA a necesidades urgentes de la región en salud, educación y agua, con una alianza público-privada que acorta los tiempos: proyectos que antes tardaban más de una década en diseñarse ahora pueden diseñarse entre 7 y 18 meses según tipología.',
'- Proyecto piloto: cuatro postas rurales impulsadas junto a SQM Litio. Las necesidades las levantan las propias comunidades (por ejemplo Toconao: salud, jardín infantil y agua potable). Las empresas mineras aportan más que recursos: ayudan a diseñar e implementar los proyectos.',
'- Cartera actual: '+CARTERA.length+' proyectos (Salud '+CARTERA.filter(function(x){return x.s==='Salud';}).length+': postas, CESFAM y un hospital en prefactibilidad; Agua potable y alcantarillado '+CARTERA.filter(function(x){return x.s==='Agua';}).length+'; Educación '+CARTERA.filter(function(x){return x.s==='Educación';}).length+': jardines infantiles JUNJI/INTEGRA y escuelas multigrado). Los proyectos marcados DISPONIBLE aún no tienen una institución a cargo del diseño.',
'- Para consultar el AVANCE de un proyecto, la persona debe buscar su ID EMRA en la Plataforma de gestión – EMRA 2023-2050: https://www.emra.cl/plataforma_gestion/ . Tú no tienes el avance ni los montos: no los inventes; entrega el ID y deriva a la plataforma.',
'- Estos proyectos de corto plazo NO están en el mapa de iniciativas del portal; en emra.cl se ven en el video "Corto plazo", botón "Alianza estratégica de corto plazo OE1".',
'Cartera de corto plazo (ID | sector | proyecto | localidad (comuna) | encargado del diseño):',
lineas
].join('\n');
})();
