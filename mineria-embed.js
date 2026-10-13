/* Minería en Números · embebido para emra.cl
   Uso (bloque HTML de Elementor):
     <div id="emra-mineria"></div>
     <script src="https://portal.emra.cl/mineria-embed.js" defer></script>
   El iframe crece al alto de su contenido (sin doble scroll).
   Opcional: window.MINERIA_URL para apuntar a otra URL. */
(function(){
  var cont=document.getElementById('emra-mineria');
  if(!cont){cont=document.createElement('div');cont.id='emra-mineria';(document.currentScript&&document.currentScript.parentNode||document.body).appendChild(cont);}
  var src=(window.MINERIA_URL||'https://portal.emra.cl/mineria.html')+'?embed=1';
  var ORIGEN=new URL(src,location.href).origin;
  var f=document.createElement('iframe');
  f.src=src;f.title='Minería en Números: aprende minería jugando';f.loading='lazy';
  f.setAttribute('allow','clipboard-write; web-share');
  f.style.cssText='width:100%;border:0;display:block;min-height:900px;height:1600px;background:#0B1929;border-radius:16px';
  cont.appendChild(f);
  window.addEventListener('message',function(e){
    if(e.origin!==ORIGEN||e.source!==f.contentWindow||!e.data)return;
    if(e.data.type==='emra-mineria-height'&&e.data.h>0){f.style.height=e.data.h+'px';}
    if(e.data.type==='emra-mineria-scroll'){
      var y=f.getBoundingClientRect().top+window.pageYOffset+(+e.data.y||0)-90;
      window.scrollTo({top:y,behavior:'smooth'});
    }
  });
})();
