/* ═══════════════════════════════════════════════════════
   Gorito Embed v1.0 — burbuja flotante del asistente EMRA
   Uso en cualquier sitio (WordPress, HTML, etc.):
   <script src="https://DOMINIO-DEL-PORTAL/gorito-embed.js" defer></script>
   La URL del chat se detecta sola desde el src del script.
   ═══════════════════════════════════════════════════════ */
(function () {
  if (window.__goritoLoaded) return;
  window.__goritoLoaded = true;

  // Origen del portal, deducido del propio script (cero configuración)
  var script = document.currentScript || (function () {
    var s = document.getElementsByTagName('script');
    for (var i = s.length - 1; i >= 0; i--) if ((s[i].src || '').indexOf('gorito-embed') > -1) return s[i];
    return null;
  })();
  var base = 'https://emra.cl';
  try { if (script && script.src) base = new URL(script.src).origin; } catch (e) {}
  var chatUrl = (window.GORITO_URL || base + '/gorito.html');

  // ── Estilos ──
  var css = [
    '#gorito-fab{position:fixed;bottom:20px;right:20px;z-index:2147483000;width:60px;height:60px;border-radius:50%;',
    'background:linear-gradient(135deg,#038FCF,#0277ad);border:none;cursor:pointer;box-shadow:0 6px 24px rgba(3,143,207,.45);',
    'display:flex;align-items:center;justify-content:center;font-size:28px;transition:transform .2s;line-height:1}',
    '#gorito-fab:hover{transform:scale(1.08)}',
    '#gorito-fab .g-close{display:none;color:#fff;font-size:22px;font-weight:700;font-family:sans-serif}',
    '#gorito-fab.open .g-emoji{display:none}',
    '#gorito-fab.open .g-close{display:block}',
    '#gorito-tag{position:fixed;bottom:32px;right:90px;z-index:2147483000;background:#0B1929;color:#fff;',
    'font:600 12px/1.3 -apple-system,sans-serif;padding:8px 12px;border-radius:10px;border:1px solid rgba(3,143,207,.5);',
    'box-shadow:0 4px 16px rgba(0,0,0,.3);cursor:pointer;max-width:190px}',
    '#gorito-panel{position:fixed;bottom:92px;right:20px;z-index:2147483000;width:380px;height:600px;',
    'max-height:calc(100vh - 112px);border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.5);',
    'border:1px solid rgba(3,143,207,.35);display:none;background:#0B1929}',
    '#gorito-panel.open{display:block}',
    '#gorito-panel iframe{width:100%;height:100%;border:none}',
    '@media(max-width:480px){#gorito-panel{right:0;bottom:0;width:100%;height:100%;max-height:100%;border-radius:0}}'
  ].join('');
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── Elementos ──
  var panel = document.createElement('div');
  panel.id = 'gorito-panel';

  var fab = document.createElement('button');
  fab.id = 'gorito-fab';
  fab.setAttribute('aria-label', 'Abrir asistente Gorito');
  fab.innerHTML = '<span class="g-emoji">🤖</span><span class="g-close">✕</span>';

  var tag = document.createElement('div');
  tag.id = 'gorito-tag';
  tag.textContent = '¿Dudas sobre la EMRA? Pregúntale a Gorito';

  var loaded = false;
  function toggle() {
    var open = !panel.classList.contains('open');
    if (open && !loaded) {
      var f = document.createElement('iframe');
      f.src = chatUrl;
      f.title = 'Gorito — Asistente EMRA';
      f.allow = 'clipboard-write';
      panel.appendChild(f);
      loaded = true;
    }
    panel.classList.toggle('open', open);
    fab.classList.toggle('open', open);
    tag.style.display = 'none';
  }
  fab.addEventListener('click', toggle);
  tag.addEventListener('click', toggle);

  // Ocultar la etiqueta luego de un rato si no interactúan
  setTimeout(function () { tag.style.display = 'none'; }, 15000);

  document.body.appendChild(panel);
  document.body.appendChild(fab);
  document.body.appendChild(tag);
})();
