/* Hero animado del home de emra.cl (solo el hero; el resto del home no se toca).
   Uso en Elementor (widget HTML, en lugar de la sección del hero actual):
     <div id="emra-hero"></div>
     <script src="https://portal.emra.cl/emra-hero.js" defer></script>
   Se monta aislado en Shadow DOM (los estilos de WordPress no lo afectan ni al revés).
   Hecho con la skill "animaciones-web". Textos oficiales de emra.cl y de los videos EMRA (literales). */
(function(){
  var host=document.getElementById('emra-hero');
  if(!host||host.shadowRoot)return;
  var VIDEO='AG-B1-hu3gc';                       // video de fondo actual del hero de emra.cl
  var raiz=host.attachShadow({mode:'open'});

  var CSS=`
  :host{display:block;position:relative;--e:#FAA900;--m:#70AD57;--r:#FF5812;--a:#0090D4;--t:#00BCB6;--cu:#CC824D}
  *{box-sizing:border-box;margin:0;padding:0}
  .hero{position:relative;height:clamp(560px,82vh,780px);overflow:hidden;background:#0B1929;color:#fff;font-family:'Figtree',system-ui,sans-serif}
  .fondo{position:absolute;inset:0;overflow:hidden;container-type:size}
  .fondo img{position:absolute;inset:0;height:100%;width:100%;object-fit:cover}
  .fondo .yt{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border:0;pointer-events:none;width:max(100cqw,177.78cqh);height:max(56.25cqw,100cqh);opacity:0;transition:opacity 1.2s}
  .fondo .yt.lista{opacity:1}
  .velo{position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,18,32,.82) 0%,rgba(8,18,32,.55) 45%,rgba(8,18,32,.15) 100%),linear-gradient(0deg,rgba(8,18,32,.6) 0%,rgba(8,18,32,0) 40%)}
  .cont{position:relative;z-index:2;height:100%;max-width:1180px;margin:0 auto;padding:0 32px;display:flex;flex-direction:column;justify-content:center}
  h1{font-size:clamp(36px,4.6vw,64px);font-weight:800;line-height:1.08;letter-spacing:-.015em;max-width:760px;text-shadow:0 2px 24px rgba(0,0,0,.3)}
  h1 .ini{color:var(--c)}
  .pal{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.06em}
  .pal>span{display:inline-block}
  .bajada{font-size:clamp(17px,1.45vw,21px);line-height:1.5;font-weight:500;max-width:620px;margin-top:22px;color:rgba(255,255,255,.92)}
  .espiritu{display:flex;align-items:center;gap:14px;margin-top:26px;min-height:30px}
  .espiritu i{width:4px;align-self:stretch;border-radius:2px;background:linear-gradient(var(--e),var(--m),var(--r),var(--a),var(--t))}
  .frase{font-size:clamp(17px,1.4vw,20px);font-weight:700;font-style:italic;color:#fff;transition:opacity .6s,transform .6s}
  .frase.out{opacity:0;transform:translateY(8px)}
  .btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
  .btn{display:inline-flex;align-items:center;gap:10px;font:800 15px/1 'Figtree',system-ui,sans-serif;letter-spacing:.05em;text-transform:uppercase;text-decoration:none;padding:16px 26px;border-radius:3px;cursor:pointer;border:2px solid transparent;transition:background-color .2s,color .2s,border-color .2s}
  .btn.pri{background:var(--cu);color:#fff}
  .btn.pri:hover{background:#b36c3a}
  .btn.sec{background:rgba(255,255,255,.08);color:#fff;border-color:rgba(255,255,255,.8);backdrop-filter:blur(6px)}
  .btn.sec:hover{background:#fff;color:#0B1929}
  .btn img{height:26px;width:auto;margin:-6px 0}
  .desliza{position:absolute;left:50%;bottom:30px;transform:translateX(-50%);z-index:2;font:600 12px 'Figtree',sans-serif;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.7);text-align:center}
  .desliza:after{content:"";display:block;width:1px;height:34px;margin:8px auto 0;background:rgba(255,255,255,.65);animation:baja 1.8s ease-in-out infinite;transform-origin:top}
  @keyframes baja{0%{transform:scaleY(0)}50%{transform:scaleY(1)}100%{transform:scaleY(0);transform-origin:bottom}}
  .franja{position:absolute;left:0;right:0;bottom:0;height:8px;z-index:3;display:flex}
  .franja b{flex:1;transform-origin:left}
  @media (max-width:767px){
    .hero{height:clamp(560px,88svh,760px)}
    .cont{padding:0 20px;justify-content:flex-end;padding-bottom:96px}
    .velo{background:linear-gradient(0deg,rgba(8,18,32,.9) 0%,rgba(8,18,32,.55) 60%,rgba(8,18,32,.3) 100%)}
    .btn{padding:14px 18px;font-size:13px}
    .desliza{display:none}
  }
  @media (prefers-reduced-motion:reduce){.desliza:after{animation:none}.frase{transition:none}}`;

  var HTML=`
  <section class="hero" aria-label="EMRA 2023–2050">
    <div class="fondo"><img src="https://i.ytimg.com/vi/${VIDEO}/maxresdefault.jpg" alt=""/></div>
    <div class="velo"></div>
    <div class="cont">
      <h1 id="t"><span class="ini" style="--c:var(--e)">E</span>strategia <span class="ini" style="--c:var(--m)">M</span>inera para el Bienestar de la <span class="ini" style="--c:var(--r)">R</span>egión de <span class="ini" style="--c:var(--a)">A</span>ntofagasta</h1>
      <p class="bajada">La EMRA 2023–2050 es la hoja de ruta que ordena, en cinco objetivos, cómo la minería debe mejorar la vida de quienes viven en la región de Antofagasta.</p>
      <div class="espiritu" aria-live="polite"><i></i><span class="frase" id="frase">Una minería justa, sostenible e inclusiva.</span></div>
      <div class="btns">
        <a class="btn pri" href="https://www.emra.cl/sobre-la-emra/">Conoce la EMRA</a>
        <a class="btn sec" id="gorito" href="https://portal.emra.cl/"><img src="https://portal.emra.cl/gorito.webp" alt=""/>Pregúntale a Gorito</a>
      </div>
    </div>
    <div class="desliza">Desliza</div>
    <div class="franja" aria-hidden="true"><b style="background:var(--e)"></b><b style="background:var(--m)"></b><b style="background:var(--r)"></b><b style="background:var(--a)"></b><b style="background:var(--t)"></b></div>
  </section>`;

  // Fuente (se carga en el documento; el Shadow DOM la hereda)
  if(!document.querySelector('link[data-emra-fuente]')){
    var f=document.createElement('link');f.rel='stylesheet';f.dataset.emraFuente='1';
    f.href='https://fonts.googleapis.com/css2?family=Figtree:wght@500;700;800&display=swap';document.head.appendChild(f);
  }
  raiz.innerHTML='<style>'+CSS+'</style>'+HTML;
  var $=function(s){return raiz.querySelector(s);},$$=function(s){return raiz.querySelectorAll(s);};
  var quieto=matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Video de fondo (YouTube, sin sonido, en bucle). La portada se ve mientras carga.
  if(!quieto){
    var yt=document.createElement('iframe');yt.className='yt';yt.title='Video de fondo';yt.setAttribute('aria-hidden','true');yt.tabIndex=-1;
    yt.allow='autoplay; encrypted-media';
    yt.src='https://www.youtube-nocookie.com/embed/'+VIDEO+'?autoplay=1&mute=1&loop=1&playlist='+VIDEO+'&controls=0&rel=0&playsinline=1&modestbranding=1&disablekb=1&iv_load_policy=3';
    yt.addEventListener('load',function(){setTimeout(function(){yt.classList.add('lista');},900);});
    $('.fondo').appendChild(yt);
  }

  // "Pregúntale a Gorito": abre el Gorito que ya está en emra.cl; si no está, va al portal
  $('#gorito').addEventListener('click',function(e){
    var fab=document.getElementById('gorito-fab');
    if(fab){e.preventDefault();if(!fab.classList.contains('open'))fab.click();}
  });

  // Frases oficiales del "espíritu" que se van turnando (video "EMRA 2023-2050" y emra.cl/logros)
  var FRASES=['Una minería justa, sostenible e inclusiva.','La sociedad civil, la gran industria minera, la academia y el sector público en una misma mesa.','Una plataforma de comunicación público-privada que trasciende los gobiernos de turno.'];
  if(!quieto){
    var k=0,fr=$('#frase');
    setInterval(function(){
      if(document.hidden)return;
      fr.classList.add('out');
      setTimeout(function(){k=(k+1)%FRASES.length;fr.textContent=FRASES[k];fr.classList.remove('out');},600);
    },5000);
  }

  function cargar(src){return new Promise(function(ok,err){
    if(document.querySelector('script[src="'+src+'"]'))return ok();
    var s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=err;document.head.appendChild(s);});}
  var listo=(window.gsap&&window.ScrollTrigger)?Promise.resolve():
    cargar('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js').then(function(){return cargar('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');});

  listo.then(animar).catch(function(){});

  function partir(el){
    el.setAttribute('aria-label',el.textContent.replace(/\s+/g,' ').trim());
    var nodos=[].slice.call(el.childNodes);el.innerHTML='';
    nodos.forEach(function(n){
      if(n.nodeType===3){n.textContent.split(/(\s+)/).forEach(function(t){
        if(!t)return;if(/^\s+$/.test(t)){el.append(' ');return;}
        var w=document.createElement('span');w.className='pal';w.setAttribute('aria-hidden','true');
        var i=document.createElement('span');i.textContent=t;w.append(i);el.append(w);});}
      else el.append(n);
    });
    [].forEach.call(el.querySelectorAll('.ini'),function(ini){var s=ini.nextElementSibling;if(s&&s.classList.contains('pal'))s.firstChild.prepend(ini);});
    return el.querySelectorAll('.pal>span');
  }

  function animar(){
    gsap.registerPlugin(ScrollTrigger);
    gsap.matchMedia().add({animar:'(prefers-reduced-motion: no-preference)'},function(ctx){
      if(!ctx.conditions.animar)return;
      var pal=partir($('#t'));
      // Entrada: fondo que se acerca, título palabra por palabra, franja de 5 colores que se dibuja
      var tl=gsap.timeline({defaults:{ease:'power3.out'}});
      tl.fromTo($('.fondo'),{scale:1.12},{scale:1,duration:2.4,ease:'power2.out'},0)
        .from(pal,{yPercent:110,opacity:0,duration:.9,stagger:.06},.2)
        .from($$('.franja b'),{scaleX:0,duration:.5,stagger:.12,ease:'power2.inOut'},.5)
        .from($('.bajada'),{opacity:0,y:18,duration:.8},'-=.4')
        .from($('.espiritu'),{opacity:0,x:-14,duration:.6},'-=.4')
        .fromTo($$('.btn'),{opacity:0,y:16},{opacity:1,y:0,stagger:.12,duration:.6},'-=.3')
        .from($('.desliza'),{opacity:0,duration:.6},'-=.2');
      // Al bajar (sin fijar la página): el video se acerca y el texto sube y se desvanece
      gsap.to($('.fondo'),{scale:1.1,yPercent:8,ease:'none',scrollTrigger:{trigger:host,start:'top top',end:'bottom top',scrub:true}});
      gsap.to($('.cont'),{yPercent:-18,opacity:0,ease:'none',scrollTrigger:{trigger:host,start:'top top',end:'bottom 25%',scrub:true}});
      gsap.to($('.desliza'),{opacity:0,ease:'none',scrollTrigger:{trigger:host,start:'top top',end:'15% top',scrub:true}});
    });
    window.addEventListener('load',function(){ScrollTrigger.refresh();});
    if(document.fonts)document.fonts.ready.then(function(){ScrollTrigger.refresh();});
  }
})();
