/* =====================================================================
   UI-SRS · Connector entre la interfície i el mòdul SRS
   ===================================================================== */
const UI = (() => {
  'use strict';
  const $ = s => document.querySelector(s);
  let pid = null, sess = null, modeActiu = null, taules = [];

  function actualitza() {
    if (!pid) return;
    const st = SRS.stats(pid);

    // Badge portada
    const badge = $('#srs-badge');
    if (badge) { badge.hidden = st.degudes === 0; badge.textContent = `${st.degudes} a punt`; }

    // Resum configuració repàs
    const resum = $('#repas-resum');
    if (resum) resum.innerHTML = st.degudes
      ? `🔁 <b>${st.degudes}</b> repassos a punt · <b>${st.per.lenta}</b> de lentes`
      : `🎉 Cap repàs pendent. Bona feina!`;

    // Retenció resultats
    const ret = $('#srs-retencio');
    if (ret) ret.textContent = st.retencio == null ? '—' : st.retencio + '%';
  }

  const classeEstat = (a, b) => 'est-' + SRS.estat(pid, a, b);

  function setPerfil(id) { pid = id; actualitza(); }
  function setMode(m, taulesSel) {
    modeActiu = m; taules = taulesSel || [];
    if (pid && m !== 'presentacio') sess = SRS.novaSessio(pid);
  }

  function primeraPregunta() {
    if (modeActiu !== 'repas') return null;
    const cua = SRS.queue(pid, 999);
    const f = cua.filter(c => c.state === 'review').sort((a, b) => b.interval - a.interval)[0];
    return f ? { a: f.a, b: f.b, tipus: f.tipus } : null;
  }

  function properaPregunta() {
    if (modeActiu === 'presentacio') return null;
    const re = sess && sess.seguent();
    if (re) return re;
    if (modeActiu === 'repas') {
      const q = SRS.queue(pid, 1)[0];
      if (q) return { a: q.a, b: q.b, tipus: q.tipus };
      const nv = SRS.noves(pid, taules, 1)[0];
      if (nv) return { a: nv.a, b: nv.b, tipus: 'directa' };
    }
    return null;
  }

  function resposta(p, r) {
    if (modeActiu === 'presentacio') return;
    if(sess) sess.resultat(p, r);
    actualitza();
  }

  const taulesLentes = () => {
    const s = new Set();
    for (let a = 1; a <= 10; a++) for (let b = 1; b <= 10; b++)
      if (SRS.estat(pid, a, b) === 'lenta') s.add(a);
    return [...s];
  };

  const fetsFitxa = () => SRS.queue(pid, 40);
  const csvProgres = () => SRS.csv(pid);

  return { setPerfil, setMode, actualitza, classeEstat, primeraPregunta, properaPregunta, resposta, taulesLentes, fetsFitxa, csvProgres };
})();