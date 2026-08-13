/* =====================================================================
   SRS · Repetició espaiada per a Taules× (SM-2 adaptat a infants)
   ---------------------------------------------------------------------
   · El rating es deriva de encert + temps + ajuda (l'infant no s'autoavalua).
   · «Veure-ho» = codificació, no recuperació → reaprendre sense càstig.
   · Intervals curts i tolerants a sessions 2–3 cops/setmana.
   · La inversa es desbloqueja quan la directa està graduada.
   ===================================================================== */
const SRS = (() => {
  'use strict';

  /* --------------------------- Configuració --------------------------- */
  const CONFIG = {
    PASSOS: [10 * 60e3, 86400e3],           // aprenentatge: 10 min i 1 dia
    GRADUA: 3,                              // dies en graduar-se
    DOMINADA: 21,                           // interval (dies) per a «Dominada»
    MAX_INT: 90,                            // sostre d'interval (dies)
    EASE: { ini: 2.5, min: 1.3, max: 2.8 },
    LLINDARS: { facil: 5000, be: 12000 },   // ms (calibrables amb calibra())
    CUA_MAX: 20,                            // màxim repassos per sessió
    NOVES_PER_SESSIO: 5,                    // fets nous que pot presentar el repàs
    REINSERIR: 4,                           // re-pràctica dins la sessió, N preguntes després
    KEY: 'taulesx.srs.v1',
  };
  const DIA = 86400e3;

  /* --------------------------- Persistència --------------------------- */
  let DB = null;
  const load = () => {
    try { DB = JSON.parse(localStorage.getItem(CONFIG.KEY)) || {}; }
    catch (e) { DB = {}; }
    if (DB._llindars) Object.assign(CONFIG.LLINDARS, DB._llindars);
  };
  const save = () => localStorage.setItem(CONFIG.KEY, JSON.stringify(DB));
  const prof = pid => DB[pid] || (DB[pid] = { cards: {} });

  /* ------------------------------ Claus ------------------------------- */
  const clau = (a, b, tipus) => {
    const m = Math.min(a, b), M = Math.max(a, b);
    return (tipus === 'inversa' ? 'i' : '') + m + 'x' + M;
  };
  const descompon = k => {
    const inv = k.startsWith('i');
    const [m, M] = (inv ? k.slice(1) : k).split('x').map(Number);
    return { a: m, b: M, tipus: inv ? 'inversa' : 'directa' };
  };

  /* --------------------------- Nucli SM-2 ----------------------------- */
  const nova = () => ({
    ease: CONFIG.EASE.ini, step: 0, interval: 0, state: 'learning',
    due: Date.now(), reps: 0, respostes: 0, encerts: 0, lapses: 0, temps: [],
  });
  const card = (pid, k) => prof(pid).cards[k] || (prof(pid).cards[k] = nova());

  const invUnlocked = (pid, a, b) => {
    const d = prof(pid).cards[clau(a, b, 'directa')];
    return !!d && d.state === 'review';
  };

  const rating = (ok, ms, ajuda) => {
    if (ajuda) return null;
    if (!ok) return 1;
    return ms <= CONFIG.LLINDARS.facil ? 5 : ms <= CONFIG.LLINDARS.be ? 4 : 3;
  };

  function record(pid, a, b, tipus, r) {
    if (tipus === 'inversa' && !invUnlocked(pid, a, b)) return null;
    const k = clau(a, b, tipus);
    const c = card(pid, k);
    const ara = Date.now();
    const q = rating(r.ok, r.ms, r.ajuda);
    c.reps++;

    if (q === null) {                      // AJUDA: reaprendre sense càstig
      if (c.state === 'review') { c.state = 'learning'; c.step = CONFIG.PASSOS.length - 1; c.interval = 0; }
      c.due = ara + CONFIG.PASSOS[0];
      save(); return { rating: q, key: k, card: c };
    }

    c.respostes++;
    if (r.ok) { c.encerts++; c.temps = (c.temps || []).concat(r.ms).slice(-20); }

    if (q === 1) {                         // FALLADA
      c.lapses++;
      c.ease = Math.max(CONFIG.EASE.min, c.ease - 0.2);
      c.state = 'learning'; c.step = 0; c.interval = 0;
      c.due = ara + CONFIG.PASSOS[0];
    } else if (c.state === 'learning') {   // PASSOS CURTS
      if (q === 3) {
        c.due = ara + CONFIG.PASSOS[c.step];
      } else if (++c.step < CONFIG.PASSOS.length) {
        c.due = ara + CONFIG.PASSOS[c.step];
      } else {                             // es gradua
        c.state = 'review'; c.interval = CONFIG.GRADUA; c.due = ara + CONFIG.GRADUA * DIA;
      }
    } else {                               // REPÀS
      const mult  = q === 3 ? 1.2 : q === 5 ? c.ease * 1.3 : c.ease;
      const dease = q === 3 ? -0.15 : q === 5 ? 0.1 : 0;
      c.ease = Math.min(CONFIG.EASE.max, Math.max(CONFIG.EASE.min, c.ease + dease));
      c.interval = Math.min(CONFIG.MAX_INT, Math.max(c.interval + 1, Math.round(c.interval * mult)));
      c.due = ara + c.interval * DIA;
    }
    save();
    return { rating: q, key: k, card: c };
  }

  /* ------------------------- Cua de repassos -------------------------- */
  function queue(pid, n = CONFIG.CUA_MAX) {
    const ara = Date.now();
    return Object.entries(prof(pid).cards)
      .filter(([, c]) => c.respostes > 0 && c.due <= ara)
      .sort((x, y) => (y[1].state === 'learning') - (x[1].state === 'learning') || x[1].due - y[1].due)
      .slice(0, n)
      .map(([k, c]) => Object.assign(descompon(k), { key: k, state: c.state, due: c.due, interval: c.interval }));
  }
  
  const dueCount = pid => {
    const ara = Date.now();
    return Object.values(prof(pid).cards).filter(c => c.respostes > 0 && c.due <= ara).length;
  };

  function noves(pid, taules, n = CONFIG.NOVES_PER_SESSIO) {
    const cs = prof(pid).cards, vists = new Set(), out = [];
    for (const t of taules) for (let f = 1; f <= 10; f++) {
      const k = clau(t, f, 'directa');
      if (!cs[k] && !vists.has(k)) { vists.add(k); out.push({ a: t, b: f }); if (out.length >= n) return out; }
    }
    return out;
  }

  /* --------------------- Estat visual i estadístiques ------------------ */
  function estat(pid, a, b) {
    const c = prof(pid).cards[clau(a, b, 'directa')];
    if (!c || c.respostes === 0) return 'nova';
    if (c.state === 'learning') return 'lenta';
    return c.interval >= CONFIG.DOMINADA ? 'dominada' : 'practica';
  }

  function stats(pid) {
    const per = { lenta: 0, practica: 0, dominada: 0 };
    let reps = 0, enc = 0, started = 0;
    for (const c of Object.values(prof(pid).cards)) {
      reps += c.respostes; enc += c.encerts;
      if (!c.respostes) continue;
      started++;
      per[c.state === 'learning' ? 'lenta' : c.interval >= CONFIG.DOMINADA ? 'dominada' : 'practica']++;
    }
    return { targetes: started, degudes: dueCount(pid), retencio: reps ? Math.round(100 * enc / reps) : null, per };
  }

  function csv(pid) {
    const rows = [['fact', 'tipus', 'estat', 'reps', 'encerts', 'errors', 'ease', 'interval_dies', 'proper_repas', 'retencio_%'].join(';')];
    for (const [k, c] of Object.entries(prof(pid).cards)) {
      const d = descompon(k);
      rows.push([d.a + 'x' + d.b, d.tipus, estat(pid, d.a, d.b), c.reps, c.encerts, c.respostes - c.encerts, c.ease.toFixed(2), c.interval, new Date(c.due).toISOString().slice(0, 10), c.respostes ? Math.round(100 * c.encerts / c.respostes) : ''].join(';'));
    }
    return rows.join('\n');
  }

  /* ------------------- Calibratge i Sessió ---------------- */
  function calibra(pid) {
    const t = Object.values(prof(pid).cards).flatMap(c => c.temps || []).sort((a, b) => a - b);
    if (t.length < 30) return { mostra: t.length, suficient: false };
    const p = q => { const i = (t.length - 1) * q, b = Math.floor(i); return Math.round(t[b] + (t[Math.min(b + 1, t.length - 1)] - t[b]) * (i - b)); };
    return { mostra: t.length, suficient: true, facil: p(0.25), be: p(0.75) };
  }
  function setLlindars(l) { Object.assign(CONFIG.LLINDARS, l); DB._llindars = Object.assign(DB._llindars || {}, l); save(); }

  function novaSessio(pid) {
    const pend = []; let n = 0;
    return {
      resultat(p, r) {
        n++;
        const res = record(pid, p.a, p.b, p.tipus, r);
        if (res && res.rating === 1) pend.push({ p, torn: n + CONFIG.REINSERIR });
        return res;
      },
      seguent() { const i = pend.findIndex(x => x.torn <= n); return i >= 0 ? pend.splice(i, 1)[0].p : null; },
      pendents: () => pend.length,
    };
  }

  return { CONFIG, init: load, reset: (pid) => { pid ? delete DB[pid] : (DB = {}); save(); }, record, queue, dueCount, noves, estat, stats, csv, calibra, setLlindars, novaSessio, descompon, inverseUnlocked: invUnlocked };
})();