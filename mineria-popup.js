/* Popup "Conoce sobre minería" para emra.cl → lleva a emra.cl/datos-sobre-mineria/
   Uso (una sola vez, por ejemplo en un widget HTML del home o en el pie del sitio):
     <script src="https://portal.emra.cl/mineria-popup.js" defer></script>
   Muestra un dato al azar del libro "Minería en Números" con su imagen.
   No molesta: aparece una vez a los 12 s o al bajar la mitad de la página; si lo cierran, no vuelve en 7 días.
   Pruebas: agregar ?popup=1 a la URL lo muestra de inmediato. */
(function(){
  if(window.__emraPopup)return;window.__emraPopup=true;
  var BASE=(window.MINERIA_BASE||'https://portal.emra.cl/').replace(/\/?$/,'/');
  var DESTINO='https://www.emra.cl/datos-sobre-mineria/';
  var CLAVE='emraPopupMineria',DIAS_CERRADO=7,DIAS_VISITADO=30;
  var forzar=/[?&]popup=1/.test(location.search);
  if(!forzar&&/datos-sobre-mineria/.test(location.pathname))return;
  // No mostrar dentro del editor ni la vista previa de Elementor
  if(/[?&]elementor-preview=/.test(location.search)||document.body.classList.contains('elementor-editor-active')||(window.elementorFrontend&&elementorFrontend.isEditMode&&elementorFrontend.isEditMode()))return;
  function leer(){try{return JSON.parse(localStorage.getItem(CLAVE)||'null');}catch(e){return null;}}
  function guardar(dias){try{localStorage.setItem(CLAVE,JSON.stringify({hasta:Date.now()+dias*864e5}));}catch(e){}}
  var st=leer();if(!forzar&&st&&st.hasta>Date.now())return;

  var mostrado=false,datos=null;
  // Carga los datos compartidos sin crear variables globales en el sitio
  fetch(BASE+'mineria-datos.js').then(function(r){return r.text();}).then(function(t){
    datos=new Function(t+';return {DATA:DATA,FOTOS:FOTOS,ILUS:ILUS};')();
    if(forzar)mostrar();
  }).catch(function(){});

  function disparar(){if(!mostrado&&datos)mostrar();}
  if(!forzar){
    setTimeout(disparar,12000);
    window.addEventListener('scroll',function f(){
      var h=document.documentElement;
      if((h.scrollTop+innerHeight)/h.scrollHeight>0.5){window.removeEventListener('scroll',f);disparar();}
    },{passive:true});
  }

  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}

  function mostrar(){
    mostrado=true;
    var D=datos.DATA.filter(function(d){return d.img;});
    var d=D[Math.random()*D.length|0];
    var img=datos.FOTOS[d.img]?BASE+'mineria-img/'+d.img+'.jpg':BASE+'mineria-img/ia-'+d.img+'.jpg';
    var credito=datos.FOTOS[d.img]?'Foto: '+datos.FOTOS[d.img][1]+', '+datos.FOTOS[d.img][2]:'Ilustración generada con IA';
    var host=document.createElement('div');host.id='emra-popup-mineria';document.body.appendChild(host);
    var raiz=host.attachShadow({mode:'open'});
    if(!document.querySelector('link[data-emra-fuente]')){
      var f=document.createElement('link');f.rel='stylesheet';f.dataset.emraFuente='1';
      f.href='https://fonts.googleapis.com/css2?family=Figtree:wght@500;700;800&display=swap';document.head.appendChild(f);
    }
    raiz.innerHTML='<style>'+
      ':host{all:initial}*{box-sizing:border-box;margin:0;padding:0}'+
      '.fondo{position:fixed;inset:0;z-index:2147483600;background:rgba(10,20,32,.55);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .35s;font-family:Figtree,system-ui,sans-serif}'+
      '.fondo.ver{opacity:1}'+
      '.caja{position:relative;width:min(460px,100%);background:#fff;color:#383838;border-radius:10px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.35);transform:translateY(24px) scale(.97);transition:transform .45s cubic-bezier(.2,.8,.2,1)}'+
      '.fondo.ver .caja{transform:none}'+
      '.franja{display:flex;height:6px}.franja b{flex:1}'+
      '.fig{position:relative;aspect-ratio:16/8;background:#eee}.fig img{width:100%;height:100%;object-fit:cover;display:block}'+
      '.fig small{position:absolute;right:8px;bottom:6px;font-size:10px;color:#fff;background:rgba(0,0,0,.45);padding:2px 6px;border-radius:3px}'+
      '.cuerpo{padding:20px 24px 24px}'+
      '.kick{font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#CC824D}'+
      '.n{font-size:44px;font-weight:800;line-height:1;color:#CC824D;margin-top:8px}'+
      '.t{font-size:17px;line-height:1.45;margin-top:8px}'+
      '.src{font-size:12px;color:#7a7470;margin-top:8px}'+
      '.btns{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}'+
      '.btn{display:inline-flex;align-items:center;justify-content:center;font:800 14px/1 Figtree,system-ui,sans-serif;letter-spacing:.05em;text-transform:uppercase;text-decoration:none;padding:14px 20px;border-radius:3px;cursor:pointer;border:2px solid transparent}'+
      '.pri{background:#CC824D;color:#fff;flex:1}.pri:hover{background:#b36c3a}'+
      '.sec{background:transparent;color:#383838;border-color:#ddd}.sec:hover{border-color:#383838}'+
      '.x{position:absolute;top:14px;right:12px;width:34px;height:34px;border-radius:50%;border:0;background:rgba(0,0,0,.45);color:#fff;font:700 18px/34px system-ui;cursor:pointer}'+
      ':focus-visible{outline:2px solid #0090D4;outline-offset:2px}'+
      '@media (max-width:560px){.fondo{align-items:flex-end;padding:0}.caja{width:100%;border-radius:14px 14px 0 0}.n{font-size:38px}}'+
      '@media (prefers-reduced-motion:reduce){.fondo,.caja{transition:none}}'+
      '</style>'+
      '<div class="fondo" part="fondo"><div class="caja" role="dialog" aria-modal="true" aria-labelledby="pt">'+
        '<div class="franja" aria-hidden="true"><b style="background:#FAA900"></b><b style="background:#70AD57"></b><b style="background:#FF5812"></b><b style="background:#0090D4"></b><b style="background:#00BCB6"></b></div>'+
        '<div class="fig"><img src="'+img+'" alt=""/><small>'+esc(credito)+'</small></div>'+
        '<button class="x" aria-label="Cerrar">×</button>'+
        '<div class="cuerpo">'+
          '<div class="kick" id="pt">¿Sabías que…?</div>'+
          '<div class="n">'+esc(d.n)+'</div>'+
          '<p class="t">'+esc(d.d)+'</p>'+
          '<p class="src">Fuente: '+esc(d.s)+' · libro Minería en Números, p.'+esc(d.p)+'</p>'+
          '<div class="btns"><a class="btn pri" href="'+DESTINO+'">Conoce sobre minería →</a><button class="btn sec" id="no">Ahora no</button></div>'+
        '</div>'+
      '</div></div>';
    var fondo=raiz.querySelector('.fondo'),antes=document.activeElement;
    requestAnimationFrame(function(){requestAnimationFrame(function(){fondo.classList.add('ver');});});
    setTimeout(function(){raiz.querySelector('.pri').focus();},350);
    function cerrar(dias){
      guardar(dias);fondo.classList.remove('ver');document.removeEventListener('keydown',tecla);
      setTimeout(function(){host.remove();if(antes&&antes.focus)antes.focus();},350);
    }
    function tecla(e){
      if(e.key==='Escape')cerrar(DIAS_CERRADO);
      if(e.key==='Tab'){ // mantener el foco dentro del popup
        var el=[].slice.call(raiz.querySelectorAll('a,button')),i=el.indexOf(raiz.activeElement);
        e.preventDefault();el[(i+(e.shiftKey?-1:1)+el.length)%el.length].focus();
      }
    }
    document.addEventListener('keydown',tecla);
    raiz.querySelector('.x').onclick=function(){cerrar(DIAS_CERRADO);};
    raiz.querySelector('#no').onclick=function(){cerrar(DIAS_CERRADO);};
    fondo.addEventListener('click',function(e){if(e.target===fondo)cerrar(DIAS_CERRADO);});
    raiz.querySelector('.pri').addEventListener('click',function(){guardar(DIAS_VISITADO);});
  }
})();
