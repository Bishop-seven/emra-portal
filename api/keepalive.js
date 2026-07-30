// api/keepalive.js — Ping diario a Supabase para evitar la pausa por inactividad
// del plan Free. Se ejecuta vía Vercel Cron (ver "crons" en vercel.json).
// La consulta es mínima (1 fila, solo la columna id) y cuenta como actividad real.

export const config = { runtime: 'edge' };

const SB_URL = process.env.EMRA_SB_URL || 'https://tjoveoqolrfxntvvdjwh.supabase.co';
const SB_KEY = process.env.EMRA_SB_KEY || 'sb_publishable_CC2mhTuNvau_uoo9myThCw_7milAiHE';

export default async function handler() {
  const inicio = Date.now();
  try {
    const res = await fetch(`${SB_URL}/rest/v1/iniciativas?select=id&limit=1`, {
      headers: {
        'apikey': SB_KEY,
        'Authorization': 'Bearer ' + SB_KEY,
      },
    });
    const ok = res.ok;
    return new Response(JSON.stringify({
      ok,
      status: res.status,
      ms: Date.now() - inicio,
      ts: new Date().toISOString(),
      msg: ok ? 'Supabase activo — pausa por inactividad evitada' : 'Supabase respondió con error',
    }), { status: ok ? 200 : 502, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({
      ok: false, error: e.message, ts: new Date().toISOString(),
    }), { status: 502, headers: { 'Content-Type': 'application/json' } });
  }
}
