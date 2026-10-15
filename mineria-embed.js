/* Minería en Números · embebido para emra.cl
   Sección completa (página de datos):
     <div id="emra-mineria"></div>
     <script src="https://portal.emra.cl/mineria-embed.js" defer></script>
   Widget "Conoce sobre minería" (home):
     <div id="emra-mineria-home"></div>
     <script src="https://portal.emra.cl/mineria-embed.js" defer></script>
   Slider "EMRA en videos" (home):
     <div id="emra-videos-home"></div>
     <script src="https://portal.emra.cl/mineria-embed.js" defer></script>
   Cada iframe crece al alto de su contenido (sin doble scroll).
   Opcional: window.MINERIA_BASE para apuntar a otro servidor. */
(function(){
  if(window.__emraMineria)return;window.__emraMineria=true;
  var BASE=(window.MINERIA_BASE||'https://portal.emra.cl/').replace(/\/?$/,'/');
  var ORIGEN=new URL(BASE,location.href).origin;
  var TIPOS={
    'emra-mineria':{src:'mineria.html?embed=1',title:'Minería en Números: aprende minería jugando',h:1600,bg:'#0B1929',radius:'16px'},
    'emra-mineria-home':{src:'mineria-home.html',title:'Conoce sobre minería',h:640,bg:'transparent',radius:'0'},
    'emra-videos-home':{src:'videos-home.html',title:'EMRA en videos',h:620,bg:'transparent',radius:'0'}
  };
  var frames=[];
  Object.keys(TIPOS).forEach(function(id){
    var cont=document.getElementById(id);if(!cont)return;
    var t=TIPOS[id],f=document.createElement('iframe');
    f.src=BASE+t.src;f.title=t.title;f.loading='lazy';
    // autoplay + fullscreen: sin esto YouTube pide un segundo clic y el botón de pantalla completa no funciona
    f.setAttribute('allow','autoplay; fullscreen; encrypted-media; picture-in-picture; clipboard-write; web-share');f.allowFullscreen=true;
    f.style.cssText='width:100%;border:0;display:block;height:'+t.h+'px;background:'+t.bg+';border-radius:'+t.radius;
    cont.appendChild(f);frames.push(f);
  });
  window.addEventListener('message',function(e){
    if(e.origin!==ORIGEN||!e.data)return;
    var f=null;for(var i=0;i<frames.length;i++)if(frames[i].contentWindow===e.source)f=frames[i];
    if(!f)return;
    if(e.data.type==='emra-mineria-height'&&e.data.h>0){f.style.height=e.data.h+'px';}
    if(e.data.type==='emra-mineria-scroll'){
      var y=f.getBoundingClientRect().top+window.pageYOffset+(+e.data.y||0)-90;
      window.scrollTo({top:y,behavior:'smooth'});
    }
  });
})();
