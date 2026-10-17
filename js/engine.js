/* =====================================================================
   ENGINE — runs the game. You normally don't need to edit this file;
   change the story and questions in content.js instead.
   ===================================================================== */
(function () {
  "use strict";

  const SAVE_KEY = "alder-lane-save-v1";
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- saving (per browser; wrapped so private windows still work) ---------- */
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(SAVE_KEY)); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem(SAVE_KEY, JSON.stringify(v)); } catch (e) { /* storage blocked */ } },
    clear() { try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* storage blocked */ } }
  };

  function freshState() {
    return {
      v: 1, name: "", started: false, phase: 0,
      scores: { team: 100, doc: 100, pres: 100, sense: 100, flex: 100 },
      flags: [], notes: [], clock: PHASES[0].time, ps: {}, facts: [],
      answers: {}, reflections: {}, startedAt: null, finishedAt: null
    };
  }

  let S = store.get();
  if (!S || S.v !== 1) S = freshState();
  const save = () => store.set(S);

  /* ---------- small helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  // Stable shuffle: the same question always shows its options in the same order.
  function shuffled(arr, seed) {
    const a = arr.map((v, i) => ({ v, i })); let h = hash(seed);
    for (let i = a.length - 1; i > 0; i--) { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; const j = h % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const phase = () => PHASES[S.phase];
  const pstate = (init) => (S.ps[phase().id] = S.ps[phase().id] || init);

  function tick(min) {
    const m = /^(\D*?)(\d{1,2}):(\d{2})$/.exec(S.clock || "");
    if (!m) return;
    let t = parseInt(m[2], 10) * 60 + parseInt(m[3], 10) + min;
    t = t % (24 * 60);
    S.clock = `${m[1]}${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
    const c = $("#clock"); if (c) c.textContent = S.clock;
  }

  // The scene clock only moves forward: a phase's start time is used
  // unless the player's actions have already pushed the clock past it.
  function laterClock(cur, next) {
    if (!next) return cur;
    const re = /^(\d{1,2}):(\d{2})$/;
    const a = re.exec(cur || ""), b = re.exec(next);
    if (a && b && (+a[1] * 60 + +a[2]) > (+b[1] * 60 + +b[2])) return cur;
    return next;
  }

  function addNote(text) {
    if (!text || S.notes.some(n => n.text === text)) return;
    S.notes.push({ t: S.clock, text, ch: phase().chapter });
    const b = $("#nb-count"); if (b) b.textContent = S.notes.length;
  }

  function applyScore(score, flag) {
    const deltas = [];
    if (score) for (const k in score) {
      if (!(k in S.scores)) continue;
      S.scores[k] = Math.max(0, Math.min(100, S.scores[k] + score[k]));
      deltas.push(`${score[k] > 0 ? "+" : ""}${score[k]} ${COMPONENTS[k].label}`);
    }
    if (flag) S.flags.push({ ...flag, ch: phase().chapter, t: S.clock });
    if (deltas.length) toast(deltas.join(" · "), "bad");
    renderMeters();
  }

  function unlockFact(id) {
    if (!id || !FACTS[id] || S.facts.includes(id)) return;
    S.facts.push(id);
    toast(`Real-World File added: ${FACTS[id].title}`, "info");
  }

  /* ---------- toasts ---------- */
  function toast(msg, kind) {
    const wrap = $("#toasts"); if (!wrap) return;
    const t = document.createElement("div");
    t.className = `toast ${kind || ""}`; t.textContent = msg;
    wrap.appendChild(t);
    while (wrap.children.length > 3) wrap.firstElementChild.remove();
    setTimeout(() => t.classList.add("out"), 3200);
    setTimeout(() => t.remove(), 3800);
  }

  /* ---------- header meters ---------- */
  function renderMeters() {
    const m = $("#meters"); if (!m) return;
    m.innerHTML = Object.keys(COMPONENTS).map(k => {
      const v = S.scores[k];
      const lvl = v >= 85 ? "good" : v >= 70 ? "warn" : "bad";
      return `<div class="meter ${lvl}" title="${COMPONENTS[k].label}: ${v} — ${esc(COMPONENTS[k].lesson)}">
        <span class="meter-k">${COMPONENTS[k].short}</span>
        <span class="meter-bar"><i style="width:${v}%"></i></span>
        <span class="meter-v">${v}</span></div>`;
    }).join("");
  }

  /* ---------- progress rail ---------- */
  function chapters() {
    const out = [];
    PHASES.forEach((p, i) => { if (!out.length || out[out.length - 1].name !== p.chapter) out.push({ name: p.chapter, first: i }); });
    return out;
  }
  function renderRail() {
    const r = $("#rail"); if (!r) return;
    const cs = chapters(); const cur = phase().chapter;
    const curIdx = cs.findIndex(c => c.name === cur);
    r.innerHTML = `<div class="rail-mobile">Step ${S.phase + 1} of ${PHASES.length} · <b>${esc(cur)}</b></div>
      <ol>${cs.map((c, i) => `<li class="${i < curIdx ? "done" : i === curIdx ? "cur" : ""}">${esc(c.name)}</li>`).join("")}</ol>
      <div class="rail-bar"><i style="width:${Math.round((S.phase / (PHASES.length - 1)) * 100)}%"></i></div>`;
  }

  /* =====================================================================
     QUESTION WIDGET — used by many phase types.
     ===================================================================== */
  function questionHTML(q, key) {
    const order = shuffled(q.options, key);
    const ans = S.answers[key];
    const answered = ans !== undefined;
    let html = `<div class="q ${answered ? "answered" : ""}" data-key="${esc(key)}">`;
    if (q.context) html += `<div class="q-context">${q.context}</div>`;
    html += `<p class="q-prompt">${q.prompt}</p><div class="q-opts">`;
    order.forEach(({ v, i }) => {
      const chosen = answered && ans === i;
      const cls = answered ? (chosen ? (v.correct ? "chosen right" : "chosen wrong") : (v.correct ? "reveal" : "dim")) : "";
      html += `<button class="opt ${cls}" data-opt="${i}" ${answered ? "disabled" : ""}>${v.text}</button>`;
    });
    html += `</div>`;
    if (answered) {
      const o = q.options[ans];
      html += `<div class="fb ${o.correct ? "right" : "wrong"}" role="status"><b>${o.correct ? "Good call." : "Not the best call."}</b> ${o.feedback || ""}`;
      if (!o.correct) { const c = q.options.find(x => x.correct); if (c) html += `<div class="fb-best"><span>Best answer</span> ${c.text}</div>`; }
      html += `</div>`;
    }
    return html + `</div>`;
  }

  function wireQuestions(root, lookup, after) {
    $$(".q:not(.answered) .opt", root).forEach(btn => btn.addEventListener("click", () => {
      const key = btn.closest(".q").dataset.key;
      const q = lookup(key); const i = parseInt(btn.dataset.opt, 10);
      S.answers[key] = i;
      const o = q.options[i];
      applyScore(o.score, o.flag);
      if (o.note) addNote(o.note);
      tick(1); save();
      after(key);
    }));
  }

  /* =====================================================================
     SCREENS
     ===================================================================== */
  function renderTitle() {
    const app = $("#app");
    app.className = "is-title";
    const resumable = S.started && S.phase > 0 && !S.finishedAt;
    app.innerHTML = `
    <section class="title">
      <div class="tape" aria-hidden="true"><span>SCENE · DO NOT CROSS · LAKE CORVIN CO. ME · SCENE · DO NOT CROSS · LAKE CORVIN CO. ME · SCENE · DO NOT CROSS ·</span></div>
      <div class="title-inner">
        <p class="eyebrow">${esc(COURSE.title)} · ${esc(COURSE.week)}</p>
        <h1>${esc(COURSE.gameTitle)}</h1>
        <p class="lede">A welfare check. A locked house. A man on the kitchen floor. You are the death investigator, and everything you do at this scene follows the National Institute of Justice's real-world guide for scene investigators.</p>

        <div class="title-grid">
          <form id="start-form" class="card start-card" novalidate>
            <div class="tag-row"><span class="evtag">Case ${esc(COURSE.caseNo)}</span></div>
            <label for="student-name">Your name (as it appears on the course roster)</label>
            <input id="student-name" type="text" autocomplete="name" maxlength="80" value="${esc(S.name || "")}" placeholder="First and last name" required>
            <p class="err" id="name-err" hidden>Enter your name so it appears on your case review.</p>
            <div class="btn-row">
              ${resumable ? `<button type="button" class="btn primary" id="resume">Resume case (step ${S.phase + 1})</button>
              <button type="submit" class="btn" id="begin">Start over</button>`
              : `<button type="submit" class="btn primary" id="begin">Begin the case</button>`}
            </div>
            <p class="small muted">About 30–40 minutes. Progress saves in this browser, so you can stop and come back.</p>
          </form>

          <div class="card how">
            <h2>How you're scored</h2>
            <p>You start with 100 points in each of the lesson's <b>Five Components</b>. Mistakes cost points, and the meters at the top of the screen update as you play.</p>
            <ul class="comp-list">${Object.values(COMPONENTS).map(c => `<li><b>${c.label}</b> <span>${esc(c.lesson)}</span></li>`).join("")}</ul>
            <p>Your final review lists every mistake, matched to <b>Geberth's 10 most common errors</b> and to the NIJ guide. Use the <b>Notebook</b> to review what you've documented, and the <b>Field Manual</b> for lesson reference.</p>
          </div>
        </div>
        <p class="disclaimer">The case, people, address and county are fictional. The procedures, science and "Real-World File" facts are real and cited. No graphic images are used.</p>
      </div>
    </section>`;

    const form = $("#start-form");
    const go = (fresh) => {
      const name = $("#student-name").value.trim();
      if (!name) { $("#name-err").hidden = false; $("#student-name").focus(); return; }
      if (fresh) { S = freshState(); }
      S.name = name; S.started = true; S.startedAt = S.startedAt || Date.now();
      save(); renderShell(); renderPhase(); window.scrollTo(0, 0);
    };
    form.addEventListener("submit", e => { e.preventDefault(); go(true); });
    const r = $("#resume"); if (r) r.addEventListener("click", () => go(false));
  }

  function renderShell() {
    const app = $("#app");
    app.className = "";
    app.innerHTML = `
      <header class="bar">
        <div class="bar-inner">
          <div class="bar-id">
            <span class="bar-title">${esc(COURSE.gameTitle)}</span>
            <span class="bar-case">${esc(COURSE.caseNo)} · <span class="clock-wrap">Scene clock <b id="clock">${esc(S.clock)}</b></span></span>
          </div>
          <div id="meters" class="meters" aria-label="Your Five Components scores"></div>
          <div class="bar-btns">
            <button class="btn small" id="open-nb">Notebook <span class="count" id="nb-count">${S.notes.length}</span></button>
            <button class="btn small" id="open-man">Field Manual</button>
          </div>
        </div>
      </header>
      <nav id="rail" class="rail" aria-label="Case progress"></nav>
      <main id="stage" class="stage" tabindex="-1"></main>
      <aside id="drawer" class="drawer" hidden aria-modal="true" role="dialog" aria-labelledby="drawer-title">
        <div class="drawer-panel">
          <div class="drawer-head"><h2 id="drawer-title"></h2><button class="btn small" id="drawer-close">Close</button></div>
          <div class="drawer-body" id="drawer-body"></div>
        </div>
      </aside>`;
    renderMeters();
    $("#open-nb").addEventListener("click", openNotebook);
    $("#open-man").addEventListener("click", () => openManual());
    $("#drawer-close").addEventListener("click", closeDrawer);
    $("#drawer").addEventListener("click", e => { if (e.target.id === "drawer") closeDrawer(); });
  }

  /* ---------- drawers ---------- */
  let lastFocus = null;
  function openDrawer(title, html) {
    lastFocus = document.activeElement;
    $("#drawer-title").textContent = title;
    $("#drawer-body").innerHTML = html;
    $("#drawer").hidden = false;
    $("#drawer-close").focus();
  }
  function closeDrawer() { const d = $("#drawer"); if (!d || d.hidden) return; d.hidden = true; if (lastFocus) lastFocus.focus(); }
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });

  function notebookHTML() {
    if (!S.notes.length) return `<p class="muted">Nothing documented yet. Observations, measurements and interview answers are logged here automatically with the scene-clock time.</p>`;
    return `<ol class="notes">${S.notes.map(n => `<li><time>${esc(n.t)}</time><span>${esc(n.text)}</span></li>`).join("")}</ol>`;
  }
  function openNotebook() { openDrawer("Investigator's notebook", notebookHTML()); }

  function openManual(sectionId) {
    const tabs = MANUAL.map(m => `<button class="mtab" data-sec="${m.id}">${esc(m.title)}</button>`).join("") +
      `<button class="mtab" data-sec="files">Real-World Files (${S.facts.length}/${Object.keys(FACTS).length})</button>`;
    openDrawer("Field Manual", `<div class="mtabs">${tabs}</div><div id="msec"></div>
      <div class="drawer-foot"><button class="btn small ghost" id="restart">Restart the case</button><span id="restart-confirm" hidden> Erase all progress? <button class="btn small danger" id="restart-yes">Yes, restart</button> <button class="btn small" id="restart-no">Cancel</button></span></div>`);
    const show = (id) => {
      $$(".mtab").forEach(b => b.classList.toggle("on", b.dataset.sec === id));
      const box = $("#msec");
      if (id === "files") {
        const all = Object.keys(FACTS);
        box.innerHTML = all.map(k => S.facts.includes(k) ? factCard(k) :
          `<div class="fact locked"><span class="fact-k">Locked</span><p>Keep investigating to unlock this file.</p></div>`).join("");
        return;
      }
      const m = MANUAL.find(x => x.id === id);
      box.innerHTML = `<h3>${esc(m.title)}</h3>${m.html}${m.calculator ? glaisterHTML() : ""}`;
      if (m.calculator) wireGlaister();
    };
    $$(".mtab").forEach(b => b.addEventListener("click", () => show(b.dataset.sec)));
    show(sectionId || MANUAL[0].id);
    $("#restart").addEventListener("click", () => { $("#restart-confirm").hidden = false; });
    $("#restart-no").addEventListener("click", () => { $("#restart-confirm").hidden = true; });
    $("#restart-yes").addEventListener("click", () => { store.clear(); S = freshState(); closeDrawer(); renderTitle(); });
  }

  function glaisterHTML() {
    return `<div class="calc">
      <label for="g-temp">Body temperature (°F): <b id="g-val">90.0</b></label>
      <input id="g-temp" type="range" min="60" max="99" step="0.1" value="90">
      <label for="g-amb">Room temperature (°F): <b id="g-ambv">70</b></label>
      <input id="g-amb" type="range" min="40" max="95" step="1" value="70">
      <p class="calc-out" id="g-out" aria-live="polite"></p></div>`;
  }
  function wireGlaister() {
    const t = $("#g-temp"), a = $("#g-amb");
    const upd = () => {
      const bt = parseFloat(t.value), at = parseFloat(a.value);
      $("#g-val").textContent = bt.toFixed(1); $("#g-ambv").textContent = at;
      const out = $("#g-out");
      if (bt <= at + 1) out.innerHTML = `<b>No estimate.</b> The body is at room temperature, so the cooling clock has stopped. Use other evidence.`;
      else if (bt >= 98.4) out.innerHTML = `<b>About 0 hours.</b> The body is at or above normal temperature. Fever, exertion or heat can raise it, which is one reason this rule is unreliable.`;
      else out.innerHTML = `Estimate: <b>about ${((98.4 - bt) / 1.5).toFixed(1)} hours</b> since death. Treat it as a rough range only, and adjust for clothing, body size and the environment.`;
    };
    t.addEventListener("input", upd); a.addEventListener("input", upd); upd();
  }

  function factCard(id) {
    const f = FACTS[id];
    return `<article class="fact"><span class="fact-k">Real-World File</span><h4>${esc(f.title)}</h4><p>${f.body}</p>
      <p class="src"><a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.source)}</a></p></article>`;
  }

  /* =====================================================================
     PHASE DISPATCH
     ===================================================================== */
  function renderPhase() {
    const p = phase();
    if (!S.ps[p.id] || !S.ps[p.id]._entered) { pstate({}); S.ps[p.id]._entered = true; S.clock = laterClock(S.clock, p.time); save(); }
    renderRail(); renderMeters();
    const c = $("#clock"); if (c) c.textContent = S.clock;
    const stage = $("#stage");
    const fresh = (p.facts || []).filter(id => FACTS[id] && !S.facts.includes(id));
    fresh.forEach(id => S.facts.push(id));
    if (fresh.length === 1) toast(`Real-World File added: ${FACTS[fresh[0]].title}`, "info");
    else if (fresh.length > 1) toast(`${fresh.length} Real-World Files added. Find them beside the case and in the Field Manual.`, "info");
    stage.innerHTML = `
      <div class="phase-head">
        <p class="eyebrow">${esc(p.chapter)}${p.nij ? ` · <span class="nij">NIJ ${esc(p.nij)}</span>` : ""}</p>
        <h1>${p.title}</h1>
      </div>
      <div class="phase-grid ${p.facts && p.facts.length ? "" : "solo"}">
        <div class="phase-main" id="pm"></div>
        ${p.facts && p.facts.length ? `<aside class="phase-aside" aria-label="Real-World Files">${p.facts.map(factCard).join("")}</aside>` : ""}
      </div>`;
    const pm = $("#pm");
    const R = RENDER[p.type];
    if (R) R(p, pm); else pm.innerHTML = `<p>Unknown phase type: ${esc(p.type)}</p>`;
    save();
  }
  function rerender() { const y = window.scrollY; renderPhase(); window.scrollTo(0, y); }

  function next() {
    if (S.phase < PHASES.length - 1) S.phase++;
    save(); renderPhase();
    window.scrollTo(0, 0);
    const st = $("#stage"); if (st) st.focus({ preventScroll: true });
  }
  const continueBtn = (label) => `<div class="btn-row end"><button class="btn primary" id="next">${label || "Continue"}</button></div>`;
  const wireNext = (root) => { const b = $("#next", root); if (b) b.addEventListener("click", next); };

  const RENDER = {};

  /* ---------- story ---------- */
  RENDER.story = (p, root) => {
    root.innerHTML = `<div class="prose">${p.body}</div>${continueBtn("Respond to the scene")}`;
    wireNext(root);
  };

  /* ---------- questions ---------- */
  RENDER.questions = (p, root) => {
    const keys = p.questions.map(q => `${p.id}.${q.id}`);
    let html = "";
    for (let i = 0; i < p.questions.length; i++) {
      html += questionHTML(p.questions[i], keys[i]);
      if (S.answers[keys[i]] === undefined) break;
    }
    const done = keys.every(k => S.answers[k] !== undefined);
    root.innerHTML = html + (done ? continueBtn() : "");
    wireQuestions(root, key => p.questions[keys.indexOf(key)], () => rerender());
    wireNext(root);
  };

  /* ---------- select (kit) ---------- */
  RENDER.select = (p, root) => {
    const ps = pstate({}); ps.chosen = ps.chosen || [];
    const order = shuffled(p.items, p.id);
    root.innerHTML = `<p class="prose">${p.intro}</p>
      <div class="kit">${order.map(({ v }) => {
        const on = ps.chosen.includes(v.id);
        let res = "";
        if (ps.checked) {
          if (v.needed && on) res = `<span class="res good">Packed</span>`;
          else if (v.needed && !on) res = `<span class="res bad">Missing</span>`;
          else if (!v.needed && on) res = `<span class="res bad">Leave it</span>`;
          else res = `<span class="res neutral">Correctly left behind</span>`;
        }
        return `<button class="kit-item ${on ? "on" : ""} ${ps.checked ? "locked" : ""}" data-id="${v.id}" aria-pressed="${on}" ${ps.checked ? "disabled" : ""}>
          <span class="box" aria-hidden="true"></span><span class="kit-l">${esc(v.label)}</span>${res}
          ${ps.checked ? `<span class="kit-why">${esc(v.why)}</span>` : ""}</button>`;
      }).join("")}</div>
      ${ps.checked ? continueBtn("Drive to the scene") : `<div class="btn-row end"><button class="btn primary" id="check">Check my kit</button></div>`}`;
    $$(".kit-item:not(.locked)", root).forEach(b => b.addEventListener("click", () => {
      const id = b.dataset.id; const i = ps.chosen.indexOf(id);
      if (i >= 0) ps.chosen.splice(i, 1); else ps.chosen.push(id);
      save(); rerender();
    }));
    const chk = $("#check", root);
    if (chk) chk.addEventListener("click", () => {
      ps.checked = true;
      let missed = 0, extra = 0;
      p.items.forEach(it => {
        const on = ps.chosen.includes(it.id);
        if (it.needed && !on) { missed++; applyScore(p.missPenalty); }
        if (!it.needed && on) { extra++; applyScore({ sense: -4 }); unlockFact(it.fact); }
      });
      if (missed) S.flags.push({ nij: "A", text: `Left ${missed} needed item${missed > 1 ? "s" : ""} out of the scene kit.`, ch: p.chapter, t: S.clock });
      if (extra) S.flags.push({ err: 6, nij: "A", text: `Packed ${extra} item${extra > 1 ? "s" : ""} that don't belong at a scene.`, ch: p.chapter, t: S.clock });
      addNote(`Scene kit checked. ${missed ? missed + " item(s) missing. " : ""}Departed for 418 Alder Lane.`);
      tick(10); save(); rerender();
    });
    wireNext(root);
  };

  /* ---------- sequence (choose the next step) ---------- */
  RENDER.sequence = (p, root) => {
    const ps = pstate({}); ps.done = ps.done || []; ps.mistakes = ps.mistakes || 0;
    const remaining = shuffled(p.steps, p.id).map(x => x.v).filter(s => !ps.done.includes(s.id));
    const finished = !remaining.length;
    root.innerHTML = `<p class="prose">${p.intro}</p>
      <div class="seq">
        <ol class="seq-done">${ps.done.map(id => { const s = p.steps.find(x => x.id === id);
          return `<li><span class="seq-t">${esc(s.text)}</span><span class="seq-why"><span class="nij">NIJ ${esc(s.nij)}</span> ${esc(s.why)}</span></li>`; }).join("")}
          ${finished ? "" : `<li class="seq-next">What do you do next?</li>`}</ol>
        ${finished ? "" : `<div class="seq-opts">${remaining.map(s => `<button class="opt" data-id="${s.id}">${esc(s.text)}</button>`).join("")}</div>`}
        <div id="seq-fb" class="fb wrong" hidden role="status"></div>
      </div>
      ${finished ? `<div class="fb ${ps.mistakes ? "wrong" : "right"}"><b>${ps.mistakes ? `Done, with ${ps.mistakes} step${ps.mistakes > 1 ? "s" : ""} out of order.` : "Every step in the right order."}</b> The order isn't arbitrary: each step protects what comes after it.</div>${continueBtn()}` : ""}`;
    $$(".seq-opts .opt", root).forEach(b => b.addEventListener("click", () => {
      const expected = p.steps[ps.done.length];
      const picked = p.steps.find(s => s.id === b.dataset.id);
      if (picked.id === expected.id) {
        ps.done.push(picked.id); tick(3);
        addNote(`${picked.text}.`);
        if (ps.done.length === p.steps.length && ps.mistakes) S.flags.push({ err: 6, nij: p.nij, text: `${ps.mistakes} step(s) taken out of order: ${p.title}.`, ch: p.chapter, t: S.clock });
        save(); rerender();
      } else {
        ps.mistakes++; applyScore(p.penalty); save();
        const fb = $("#seq-fb", root);
        fb.hidden = false;
        fb.innerHTML = `<b>Not yet.</b> "${esc(picked.text)}" comes later. Think about what has to happen first so that this step is safe and its results can be trusted.`;
        b.classList.add("shake"); setTimeout(() => b.classList.remove("shake"), 450);
      }
    }));
    wireNext(root);
  };

  /* ---------- zones (perimeter) ---------- */
  RENDER.zones = (p, root) => {
    const ps = pstate({}); ps.assign = ps.assign || {}; ps.tool = ps.tool || "inner";
    const tools = [["inner", "Inner perimeter"], ["outer", "Outer perimeter"], ["secure", "Secure area"], ["none", "Clear"]];
    const labelOf = { inner: "Inner", outer: "Outer", secure: "Secure area", none: "" };
    const allSet = p.zones.every(z => ps.assign[z.id] && ps.assign[z.id] !== "none");
    root.innerHTML = `<div class="prose">${p.intro}</div>
      ${ps.checked ? "" : `<div class="tools" role="radiogroup" aria-label="Marker">${tools.map(([k, l]) =>
        `<button class="tool t-${k} ${ps.tool === k ? "on" : ""}" role="radio" aria-checked="${ps.tool === k}" data-tool="${k}"><span class="sw"></span>${l}</button>`).join("")}</div>`}
      <div class="sketch-wrap">${ART.siteplan()}</div>
      <ul class="zone-list">${p.zones.map(z => {
        const a = ps.assign[z.id] || "none";
        const ok = ps.checked ? (a === z.answer) : null;
        return `<li class="${ps.checked ? (ok ? "ok" : "no") : ""}"><button class="zone-btn" data-zone="${z.id}" ${ps.checked ? "disabled" : ""}>${esc(z.label)}</button>
          <span class="zone-a a-${a}">${labelOf[a] || "Not set"}</span>
          ${ps.checked ? `<span class="zone-why">${ok ? "" : `<b>Should be: ${labelOf[z.answer]}.</b> `}${esc(z.why)}</span>` : ""}</li>`;
      }).join("")}</ul>
      ${ps.checked ? continueBtn() : `<div class="btn-row end"><button class="btn primary" id="check" ${allSet ? "" : "disabled"}>Set the perimeter</button>${allSet ? "" : `<span class="small muted">Assign every area to continue.</span>`}</div>`}`;
    // paint zones
    p.zones.forEach(z => {
      const a = ps.assign[z.id] || "none";
      $$(`[data-zone="${z.id}"]`, root).forEach(el => { if (el.classList.contains("zone")) el.setAttribute("class", `zone a-${a}`); });
    });
    const paint = (id) => { if (ps.checked) return; ps.assign[id] = ps.tool; save(); rerender(); };
    $$(".zone", root).forEach(el => el.addEventListener("click", () => paint(el.dataset.zone)));
    $$(".zone-btn", root).forEach(el => el.addEventListener("click", () => paint(el.dataset.zone)));
    $$(".tool", root).forEach(el => el.addEventListener("click", () => { ps.tool = el.dataset.tool; save(); rerender(); }));
    const chk = $("#check", root);
    if (chk) chk.addEventListener("click", () => {
      ps.checked = true; let wrongInner = 0, wrong = 0;
      p.zones.forEach(z => {
        if (ps.assign[z.id] !== z.answer) { wrong++; if (z.answer === "inner") wrongInner++; applyScore({ pres: -4 }); }
      });
      if (wrongInner) S.flags.push({ err: 2, nij: "B2-A", text: `Left ${wrongInner} inner-perimeter area(s) unprotected.`, ch: p.chapter, t: S.clock });
      else if (wrong) S.flags.push({ nij: "B2-A", text: `${wrong} perimeter area(s) set incorrectly.`, ch: p.chapter, t: S.clock });
      addNote("Perimeter expanded: inner = house, porch, back/side yards; outer = front yard, driveway, street frontage; secure area = Haynes driveway. Scene log at front walk.");
      tick(6); save(); rerender();
    });
    wireNext(root);
  };

  /* ---------- interview ---------- */
  RENDER.interview = (p, root) => {
    const ps = pstate({}); ps.asked = ps.asked || [];
    const left = p.maxQuestions - ps.asked.length;
    const ended = ps.ended || left <= 0;
    if (ended && !ps.scored) {
      ps.scored = true; ps.ended = true;
      const missed = p.mustAsk.filter(id => !ps.asked.includes(id));
      if (missed.length) {
        missed.forEach(() => applyScore(p.missPenalty));
        S.flags.push({ ...p.missFlag, ch: p.chapter, t: S.clock });
        missed.forEach(id => { const q = p.questions.find(x => x.id === id); if (q.note) addNote(`(Follow-up by partner) ${q.note}`); });
      }
      ps.missed = missed; save();
    }
    const order = shuffled(p.questions, p.id).map(x => x.v);
    const w = p.witness;
    root.innerHTML = `<div class="prose">${p.intro}</div>
      <div class="witness"><span class="avatar" aria-hidden="true">${esc(w.initials)}</span><div><b>${esc(w.name)}</b><span>${esc(w.role)}</span></div>
        <span class="qleft">${ended ? "Interview ended" : `${left} question${left === 1 ? "" : "s"} left`}</span></div>
      <div class="transcript">${ps.asked.map(id => { const q = p.questions.find(x => x.id === id);
        return `<div class="tq">${esc(q.q)}</div><div class="ta">${esc(q.a)}</div>${q.feedback ? `<div class="fb ${q.bad ? "wrong" : "info"}">${esc(q.feedback)}</div>` : ""}`; }).join("") || `<p class="muted small">Choose a question below.</p>`}</div>
      ${ended ? (ps.missed && ps.missed.length ? `<div class="fb wrong"><b>You missed key questions.</b> Your partner had to go back and ask:<ul>${ps.missed.map(id => { const q = p.questions.find(x => x.id === id); return `<li><b>${esc(q.q)}</b> ${esc(q.a)}</li>`; }).join("")}</ul></div>`
        : `<div class="fb right"><b>Solid interview.</b> You covered everything this witness could tell you that mattered.</div>`) + continueBtn()
      : `<div class="ask">${order.filter(q => !ps.asked.includes(q.id)).map(q => `<button class="opt" data-id="${q.id}">${esc(q.q)}</button>`).join("")}</div>
        <div class="btn-row end"><button class="btn ghost" id="end-int">End interview</button></div>`}`;
    $$(".ask .opt", root).forEach(b => b.addEventListener("click", () => {
      const q = p.questions.find(x => x.id === b.dataset.id);
      ps.asked.push(q.id); tick(2);
      if (q.bad) applyScore(q.score, q.flag);
      if (q.note) addNote(q.note);
      save(); rerender();
    }));
    const end = $("#end-int", root); if (end) end.addEventListener("click", () => { ps.ended = true; save(); rerender(); });
    wireNext(root);
  };

  /* ---------- scene (floor plan with hotspots) ---------- */
  RENDER.scene = (p, root) => {
    const ps = pstate({}); ps.done = ps.done || {}; ps.seen = ps.seen || []; ps.placard = ps.placard || {}; ps.n = ps.n || 0;
    const itemState = it => {
      const d = ps.done[it.id] || [];
      if (it.required.every(a => d.includes(a))) return "done";
      return ps.seen.includes(it.id) ? "seen" : "new";
    };
    const sel = p.items.find(i => i.id === ps.sel);
    const docCount = p.items.filter(i => itemState(i) === "done").length;

    let panel = "";
    if (!ps.overall) {
      panel = `<div class="panel-empty overall-box"><p><b>Start with orientation photographs.</b> Shoot every room and the exterior from the corners, before anything is moved, so each item can be placed in context later (NIJ C1-B).</p>
        <button class="btn primary" id="overall">Take orientation photos</button>
        <p class="small muted">You can tap items on the sketch to look, but take these before you document anything.</p></div>`;
    }
    if (sel) {
      const d = ps.done[sel.id] || [];
      const qkey = `${p.id}.${sel.id}.q`;
      panel += `<div class="item-head">${sel.evidence ? `<span class="evtag">${ps.placard[sel.id] ? `Item #${ps.placard[sel.id]}` : "Evidence"}</span>` : ""}<h2>${esc(sel.label)}</h2></div>
        <p class="obs">${esc(sel.observe)}</p>
        <div class="acts">${sel.actions.map(a => {
          const isDone = d.includes(a.id);
          return `<button class="act ${isDone ? (a.bad ? "badone" : "did") : ""} ${a.bad ? "risky" : ""}" data-act="${a.id}" ${isDone ? "disabled" : ""}>
            <span class="act-k">${a.collect ? "Collect" : a.bad ? "Action" : "Document"}</span>${esc(a.label)}</button>`;
        }).join("")}</div>
        ${sel.actions.filter(a => d.includes(a.id) && a.feedback).map(a => `<div class="fb ${a.bad ? "wrong" : "info"}">${esc(a.feedback)}</div>`).join("")}
        ${sel.actions.filter(a => a.package && d.includes(a.id)).map(a => questionHTML(a.package, `${p.id}.${sel.id}.${a.id}.pkg`)).join("")}
        ${sel.info ? `<div class="fb info">${esc(sel.info)}</div>` : ""}
        ${sel.question ? questionHTML(sel.question, qkey) : ""}
        ${sel.fact && S.facts.includes(sel.fact) ? factCard(sel.fact) : ""}`;
    } else if (ps.overall) {
      panel = `<div class="panel-empty"><p><b>Orientation photos taken.</b> Tap a numbered marker on the sketch to examine that item. Search the way the Nutshell Studies taught: sweep each room in a spiral.</p></div>`;
    }

    root.innerHTML = `<div class="prose">${p.intro}</div>
      <div class="scene">
        <div class="scene-left"><div class="sketch-wrap">${ART.floorplan()}</div>
          <div class="chips" aria-label="Items in the scene">${p.items.map(it => `<button class="chip chip-${itemState(it)} ${ps.sel === it.id ? "on" : ""}" data-id="${it.id}">${esc(it.label)}</button>`).join("")}</div></div>
        <div class="scene-panel" id="panel" aria-live="polite">${panel}</div>
      </div>
      <div class="scene-foot">
        <span class="progress-chip">${docCount} of ${p.items.length} items fully documented</span>
        ${ps.finished ? "" : `<button class="btn primary" id="finish" ${ps.overall ? "" : "disabled"}>Finish scene documentation</button>`}
      </div>
      ${ps.finished ? finishSummary() + continueBtn("Examine the body") : ""}`;

    function finishSummary() {
      const miss = ps.missedList || [];
      return miss.length ? `<div class="fb wrong"><b>Documentation gaps.</b> Once the scene is released you can't go back.<ul>${miss.map(m => `<li>${esc(m)}</li>`).join("")}</ul></div>`
        : `<div class="fb right"><b>Thorough work.</b> Every item is photographed, measured where needed, and collected with its chain of custody started.</div>`;
    }

    // hotspots
    const g = $("#hotspots", root);
    g.innerHTML = p.items.map((it, idx) => {
      const st = itemState(it);
      return `<g class="hs hs-${st} ${ps.sel === it.id ? "hs-sel" : ""}" data-id="${it.id}" tabindex="0" role="button" aria-label="${esc(it.label)}${st === "done" ? ", documented" : ""}">
        <circle cx="${it.x}" cy="${it.y}" r="24" class="hs-hit"/>
        <circle cx="${it.x}" cy="${it.y}" r="13" class="hs-dot"/>
        ${ps.placard[it.id] ? `<text x="${it.x}" y="${it.y + 4.5}" class="hs-n" text-anchor="middle">${ps.placard[it.id]}</text>` : `<circle cx="${it.x}" cy="${it.y}" r="4" class="hs-pip"/>`}</g>`;
    }).join("");
    const pick = id => {
      ps.sel = id;
      const it = p.items.find(i => i.id === id);
      if (!ps.seen.includes(id)) { ps.seen.push(id); addNote(it.note); tick(1); unlockFact(it.fact); }
      save(); rerender();
      const pn = $("#panel"); if (pn && window.innerWidth < 900) pn.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    $$(".chip", root).forEach(c => c.addEventListener("click", () => pick(c.dataset.id)));
    $$(".hs", root).forEach(h => {
      h.addEventListener("click", () => pick(h.dataset.id));
      h.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(h.dataset.id); } });
    });

    const ov = $("#overall", root);
    if (ov) ov.addEventListener("click", () => { ps.overall = true; addNote("Orientation photographs: exterior (4 sides), every room from each corner, before any item was moved."); tick(8); save(); rerender(); });

    $$(".act", root).forEach(b => b.addEventListener("click", () => {
      const a = sel.actions.find(x => x.id === b.dataset.act);
      const d = (ps.done[sel.id] = ps.done[sel.id] || []);
      if (!ps.overall && !a.bad && !ps.overallWarned) {
        ps.overallWarned = true;
        applyScore(p.overallPenalty, { err: 5, nij: "C1-B", text: "Started close-up documentation before taking orientation photographs." });
      }
      const unmet = (a.requires || []).filter(r => !d.includes(r));
      if (unmet.length && a.collect) {
        applyScore({ pres: -8, doc: -4 }, { err: 6, nij: "C1", text: `Collected "${sel.label}" before photographing and documenting it in place.` });
        toast("Once an item is moved, it can never be returned to its original position.", "bad");
      } else if (unmet.length) {
        applyScore({ doc: -2 });
      }
      if (a.bad) applyScore(a.score, a.flag);
      d.push(a.id);
      if (a.id === "photo" && sel.evidence && !ps.placard[sel.id]) ps.placard[sel.id] = ++ps.n;
      if (a.note) addNote(a.note);
      else if (!a.bad) addNote(`${sel.label}: ${a.label.toLowerCase()}.`);
      tick(a.collect ? 4 : 2); save(); rerender();
    }));

    wireQuestions(root, key => {
      const parts = key.split(".");
      const it = p.items.find(i => i.id === parts[1]);
      if (parts[3] === "pkg") return it.actions.find(a => a.id === parts[2]).package;
      return it.question;
    }, () => rerender());

    const fin = $("#finish", root);
    if (fin) fin.addEventListener("click", () => {
      ps.finished = true; ps.missedList = [];
      p.items.forEach(it => {
        const d = ps.done[it.id] || [];
        const miss = it.required.filter(r => !d.includes(r));
        if (miss.length) {
          applyScore(p.missPenalty);
          const labels = miss.map(m => it.actions.find(a => a.id === m).label.toLowerCase());
          ps.missedList.push(`${it.label}: ${labels.join(", ")}`);
        }
      });
      if (ps.missedList.length) S.flags.push({ err: 5, nij: "C1–C4", text: `Left ${ps.missedList.length} scene item(s) incompletely documented.`, ch: p.chapter, t: S.clock });
      ps.sel = null; tick(5); save(); rerender();
    });
    wireNext(root);
  };

  /* ---------- body exam ---------- */
  RENDER.body = (p, root) => {
    const ps = pstate({}); ps.done = ps.done || [];
    const sel = p.exams.find(e => e.id === ps.sel);
    let panel = `<div class="panel-empty"><p><b>Choose an examination.</b> NIJ D2 says to examine him without removing clothing, and to photograph before you touch.</p></div>`;
    if (sel) {
      panel = `<div class="item-head"><h2>${esc(sel.label)}</h2></div>
        ${ps.blocked === sel.id ? `<div class="fb wrong">${esc(ps.blockMsg)}</div>` : `<p class="obs">${esc(sel.finding)}</p>`}
        ${ps.done.includes(sel.id) && sel.question ? questionHTML(sel.question, `${p.id}.${sel.id}.q`) : ""}
        ${ps.done.includes(sel.id) && sel.question2 && S.answers[`${p.id}.${sel.id}.q`] !== undefined ? questionHTML(sel.question2, `${p.id}.${sel.id}.q2`) : ""}
        ${ps.done.includes(sel.id) && sel.fact ? factCard(sel.fact) : ""}`;
    }
    const allDone = p.exams.filter(e => e.required).every(e => ps.done.includes(e.id));
    root.innerHTML = `<div class="prose">${p.intro}</div>
      <div class="scene body-scene">
        <div class="body-left">
          <div class="sketch-wrap small">${ART.bodychart()}</div>
          <div class="exam-list">${p.exams.map(e => `<button class="exam ${ps.done.includes(e.id) ? "did" : ""} ${ps.sel === e.id ? "on" : ""} ${e.gate ? "gate" : ""}" data-id="${e.id}">
            <span class="exam-s">${ps.done.includes(e.id) ? "Done" : e.gate ? "Move" : "Exam"}</span>${esc(e.label)}</button>`).join("")}</div>
        </div>
        <div class="scene-panel" id="panel" aria-live="polite">${panel}</div>
      </div>
      <div class="scene-foot"><span class="progress-chip">${ps.done.length} of ${p.exams.length} examinations</span>
        ${ps.finished ? "" : `<button class="btn primary" id="finish">Finish body examination</button>`}</div>
      ${ps.finished ? (ps.missed && ps.missed.length ? `<div class="fb wrong"><b>Not documented:</b> ${esc(ps.missed.join(", "))}. Once the body leaves the scene, its position and context are gone.</div>` : `<div class="fb right"><b>Complete external examination.</b> Every postmortem change is documented: livor, rigor, temperature, decomposition and insects (NIJ D5).</div>`) + continueBtn() : ""}`;

    const mk = $("#body-markers", root);
    mk.innerHTML = p.exams.filter(e => ps.done.includes(e.id) && e.marker).map(e => {
      const x = e.marker[0] + (e.side === "front" ? 220 : 0), y = e.marker[1] + 20;
      return `<circle cx="${x}" cy="${y}" r="7" class="bm"/><text x="${x}" y="${y + 3.5}" class="bm-n" text-anchor="middle">${p.exams.indexOf(e) + 1}</text>`;
    }).join("");

    $$(".exam", root).forEach(b => b.addEventListener("click", () => {
      const e = p.exams.find(x => x.id === b.dataset.id);
      ps.sel = e.id; ps.blocked = null;
      if (!ps.done.includes(e.id)) {
        const unmet = (e.requires || []).filter(r => !ps.done.includes(r));
        if (unmet.includes("roll")) {
          ps.blocked = e.id; ps.blockMsg = "He's face down. You can't see this until he's rolled, and he can't be rolled until the back of the body is documented.";
          save(); rerender(); return;
        }
        if (unmet.length && e.gate) {
          applyScore({ pres: -10, doc: -5 }, { err: 6, nij: "D1–D2", text: "Moved the body before its position and posterior surface were fully documented." });
          toast("You moved the body before documenting it. That position can never be restored.", "bad");
        } else if (unmet.length) {
          applyScore({ doc: -3 }, { err: 5, nij: "D1", text: `Handled the body (${e.label.toLowerCase()}) before photographing it.` });
        }
        ps.done.push(e.id); addNote(e.note); tick(3);
      }
      save(); rerender();
    }));
    wireQuestions(root, key => {
      const parts = key.split("."); const e = p.exams.find(x => x.id === parts[1]);
      return parts[2] === "q2" ? e.question2 : e.question;
    }, (key) => { const e = p.exams.find(x => x.id === key.split(".")[1]); if (e && e.fact) unlockFact(e.fact); rerender(); });

    const fin = $("#finish", root);
    if (fin) fin.addEventListener("click", () => {
      ps.finished = true;
      ps.missed = p.exams.filter(e => e.required && !ps.done.includes(e.id)).map(e => e.label);
      ps.missed.forEach(() => applyScore(p.missPenalty));
      if (ps.missed.length) S.flags.push({ err: 6, nij: "D2–D5", text: `Incomplete body examination: ${ps.missed.join(", ")}.`, ch: p.chapter, t: S.clock });
      ps.sel = null; save(); rerender();
    });
    wireNext(root);
  };

  /* ---------- time since death ---------- */
  RENDER.pmi = (p, root) => {
    const ps = pstate({}); ps.sel = ps.sel || [];
    const key = `${p.id}.window`;
    const q = { prompt: "When did Raymond most likely die?", options: p.options };
    root.innerHTML = `<div class="prose">${p.intro}</div>
      <div class="clues">${p.clues.map(c => {
        const on = ps.sel.includes(c.id);
        let res = "";
        if (ps.checked) res = c.good ? (on ? `<span class="res good">Useful</span>` : `<span class="res bad">Missed</span>`) : (on ? `<span class="res bad">Not a time clue</span>` : `<span class="res neutral">Correctly left out</span>`);
        return `<button class="kit-item ${on ? "on" : ""} ${ps.checked ? "locked" : ""}" data-id="${c.id}" aria-pressed="${on}" ${ps.checked ? "disabled" : ""}><span class="box" aria-hidden="true"></span><span class="kit-l">${esc(c.text)}</span>${res}${ps.checked && c.why ? `<span class="kit-why">${esc(c.why)}</span>` : ""}</button>`;
      }).join("")}</div>
      ${ps.checked ? questionHTML(q, key) : `<div class="btn-row end"><button class="btn primary" id="check">Lock in my clues</button></div>`}
      ${S.answers[key] !== undefined ? `<div class="sketch-wrap">${ART.timeline()}</div>
        <div class="fb info"><b>Why circumstantial evidence wins here:</b> postmortem changes only give ranges, and heat speeds every one of them up. Once his body reached room temperature and rigor had passed, his body couldn't say much more about time. The pill organizer, the newspapers and the phone could. Try the Glaister calculator in the Field Manual to see why body temperature stopped helping.</div>${continueBtn()}` : ""}`;
    $$(".kit-item:not(.locked)", root).forEach(b => b.addEventListener("click", () => {
      const i = ps.sel.indexOf(b.dataset.id); if (i >= 0) ps.sel.splice(i, 1); else ps.sel.push(b.dataset.id); save(); rerender();
    }));
    const chk = $("#check", root);
    if (chk) chk.addEventListener("click", () => {
      ps.checked = true;
      const missed = p.clues.filter(c => c.good && !ps.sel.includes(c.id)).length;
      const wrong = p.clues.filter(c => !c.good && ps.sel.includes(c.id)).length;
      if (missed) applyScore({ doc: -2 * missed });
      if (wrong) applyScore({ sense: -3 * wrong });
      if (missed >= 3) S.flags.push({ err: 7, nij: "E2", text: `Missed ${missed} timeline clues when estimating time since death.`, ch: p.chapter, t: S.clock });
      save(); rerender();
    });
    wireQuestions(root, () => q, () => { addNote("Estimated time of death: Sun 10/11 after ~19:00, before Mon 10/12 AM (~2.5 days before discovery)."); rerender(); });
    wireNext(root);
  };

  /* ---------- autopsy + death certificate ---------- */
  RENDER.certificate = (p, root) => {
    const parts = [["partI", "Part I (a)"], ["partII", "Part II"], ["mechanism", "Mechanism"], ["manner", "Manner"]];
    let html = `<div class="prose"><p>Dr. Ana Reyes, forensic pathologist, completes the autopsy. Here is her summary. Now help her fill out the death certificate.</p></div>${p.findings}<div class="cert">`;
    let all = true;
    for (const [k, label] of parts) {
      html += `<div class="cert-line"><span class="cert-k">${label}</span>${questionHTML(p[k], `${p.id}.${k}`)}</div>`;
      if (S.answers[`${p.id}.${k}`] === undefined) { all = false; break; }
    }
    html += `</div>`;
    if (all) html += `<div class="fb info">${p.whatIf}</div>` + continueBtn("See your case review");
    root.innerHTML = html;
    wireQuestions(root, key => p[key.split(".")[1]], () => rerender());
    wireNext(root);
  };

  /* ---------- report ---------- */
  function overall() { const v = Object.values(S.scores); return Math.round(v.reduce((a, b) => a + b, 0) / v.length); }
  function rank(o) {
    if (o >= 90) return ["Field-ready", "You worked this scene the way the NIJ guide intends."];
    if (o >= 80) return ["Solid investigator", "Good work. Review the flagged items before your next scene."];
    if (o >= 70) return ["Needs supervision", "You got there, but several mistakes would be challenged in court."];
    return ["Shadow a senior investigator", "Replay the case after reviewing the Field Manual."];
  }
  function summaryText() {
    const o = overall();
    const lines = [
      `${COURSE.title} — ${COURSE.gameTitle} (${COURSE.caseNo})`,
      `Student: ${S.name}`,
      `Completed: ${new Date(S.finishedAt || Date.now()).toLocaleString()}`,
      `Overall: ${o}% (${rank(o)[0]})`,
      ...Object.keys(COMPONENTS).map(k => `  ${COMPONENTS[k].label}: ${S.scores[k]}`),
      `Mistakes flagged: ${S.flags.length}`,
      ...S.flags.map(f => `  - ${f.err ? `[Geberth #${f.err}] ` : ""}${f.text}${f.nij ? ` (NIJ ${f.nij})` : ""}`),
      `Real-World Files collected: ${S.facts.length}/${Object.keys(FACTS).length}`
    ];
    phase().reflections.forEach((r, i) => lines.push(`Reflection ${i + 1}: ${r.prompt}`, `  ${S.reflections[r.id] || "(no answer)"}`));
    return lines.join("\n");
  }

  RENDER.report = (p, root) => {
    if (!S.finishedAt) { S.finishedAt = Date.now(); save(); }
    const o = overall(); const [rk, rkMsg] = rank(o);
    const byErr = {};
    S.flags.filter(f => f.err).forEach(f => { byErr[f.err] = (byErr[f.err] || 0) + 1; });
    const gf = COURSE.googleForm;
    let formUrl = "";
    if (gf && gf.url) {
      const u = new URL(gf.url);
      u.searchParams.set("usp", "pp_url");
      if (gf.nameField) u.searchParams.set(gf.nameField, S.name);
      if (gf.scoreField) u.searchParams.set(gf.scoreField, String(o));
      if (gf.summaryField) u.searchParams.set(gf.summaryField, summaryText().slice(0, 1800));
      formUrl = u.toString();
    }
    root.innerHTML = `
      <section class="report">
        <div class="report-top">
          <div>
            <p class="eyebrow">Case review · ${esc(COURSE.caseNo)}</p>
            <h2 class="report-name">${esc(S.name)}</h2>
            <p class="muted">${esc(COURSE.title)} · Completed ${esc(new Date(S.finishedAt).toLocaleString())}</p>
          </div>
          <div class="score-big"><span class="score-n">${o}<small>%</small></span><span class="score-r">${esc(rk)}</span></div>
        </div>
        <p>${esc(rkMsg)}</p>
        <div class="comp-bars">${Object.keys(COMPONENTS).map(k => {
          const v = S.scores[k]; const lvl = v >= 85 ? "good" : v >= 70 ? "warn" : "bad";
          return `<div class="cb ${lvl}"><span class="cb-l">${COMPONENTS[k].label}</span><span class="cb-bar"><i style="width:${v}%"></i></span><span class="cb-v">${v}</span></div>`;
        }).join("")}</div>

        <h3>What went wrong (${S.flags.length})</h3>
        ${S.flags.length ? `<ul class="flags">${S.flags.map(f => `<li><span class="flag-meta">${esc(f.ch)}${f.err ? ` · Geberth #${f.err}` : ""}${f.nij ? ` · NIJ ${esc(f.nij)}` : ""}</span>${esc(f.text)}</li>`).join("")}</ul>`
          : `<p class="fb right">No mistakes flagged. That is an exceptional scene.</p>`}

        <h3>Geberth's 10 most common errors: your record</h3>
        <ol class="geberth-check">${Object.keys(GEBERTH).map(n => `<li class="${byErr[n] ? "hit" : "clear"}"><span>${esc(GEBERTH[n])}</span><b>${byErr[n] ? `Committed ×${byErr[n]}` : "Avoided"}</b></li>`).join("")}</ol>

        <h3>Reflection</h3>
        ${p.reflections.map(r => `<label class="refl" for="${r.id}">${esc(r.prompt)}</label>
          <textarea id="${r.id}" rows="4" data-r="${r.id}">${esc(S.reflections[r.id] || "")}</textarea>`).join("")}

        <h3>Your notebook</h3>
        <details class="nb-details"><summary>Show all ${S.notes.length} timestamped entries</summary>${notebookHTML()}</details>

        <div class="btn-row report-actions">
          <button class="btn primary" id="copy">Copy my results</button>
          <button class="btn" id="print">Print or save as PDF</button>
          ${formUrl ? `<a class="btn" id="submit" href="${esc(formUrl)}" target="_blank" rel="noopener">Submit to instructor</a>` : ""}
          <button class="btn ghost" id="again">Play again</button>
        </div>
        <p class="small muted" id="copy-msg" aria-live="polite">Copy your results and paste them where your instructor asks (for example, the course assignment drop box).</p>
        <textarea id="copy-fallback" class="sr-fallback" readonly hidden></textarea>
      </section>`;
    $$("textarea[data-r]", root).forEach(t => t.addEventListener("input", () => { S.reflections[t.dataset.r] = t.value; save(); }));
    $("#copy", root).addEventListener("click", () => {
      const txt = summaryText();
      const ok = () => { $("#copy-msg").textContent = "Copied. Paste it into your assignment submission."; };
      const fallback = () => { const f = $("#copy-fallback"); f.hidden = false; f.value = txt; f.focus(); f.select(); $("#copy-msg").textContent = "Your browser blocked copying. The text is selected below: press Ctrl+C (or Cmd+C) to copy it."; };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, fallback); else fallback();
    });
    $("#print", root).addEventListener("click", () => window.print());
    $("#again", root).addEventListener("click", () => { store.clear(); S = freshState(); renderTitle(); window.scrollTo(0, 0); });
  };

  /* ---------- boot ---------- */
  function boot() { if (S.started && S.finishedAt) { renderShell(); renderPhase(); } else renderTitle(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
