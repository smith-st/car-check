// Сторінка звіту по авто: car.html?make=…&model=…&gen=…&engine=…&year=…&gb=manual|auto
(function () {
  const DB = window.CarCheck;
  const NOW = new Date().getFullYear();
  const app = document.getElementById("app");
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const yTo = y => (y === null ? NOW : y);
  const yrs = r => `${r[0]}–${r[1] === null ? "н.ч." : r[1]}`;
  const GB_LABEL = { manual: "Механіка", auto: "Автомат" };

  const carUrl = (p) => "car.html?" + new URLSearchParams(p).toString();

  // ---------- Розбір параметрів ----------
  const q = new URLSearchParams(location.search);
  const P = {
    make: q.get("make"), model: q.get("model"), gen: q.get("gen"),
    engine: q.get("engine"), year: Number(q.get("year")), gb: q.get("gb")
  };

  const gens = DB.makes[P.make] && DB.makes[P.make][P.model];
  const gen = gens && gens.find(g => g.generation === P.gen);
  const v = gen && gen.variants.find(x => x.label === P.engine);
  const valid = v && (P.gb === "manual" || P.gb === "auto") && v[P.gb].length > 0 &&
    P.year >= v.years[0] && P.year <= yTo(v.years[1]);

  if (!valid) {
    document.title = "Авто не знайдено — CarCheck";
    app.innerHTML = `
      <div class="notfound">
        <h1>Авто не знайдено</h1>
        <p>Такої комбінації немає в нашій базі або посилання пошкоджене. Спробуйте обрати авто ще раз.</p>
        <a class="btn" href="index.html#check">Обрати авто</a>
      </div>`;
    return;
  }

  const engine = DB.engines[v.engine] || { name: v.label, issues: [] };
  const codes = v[P.gb];
  const gbs = codes.map(c => ({ code: c, ...(DB.gearboxes[c] || { name: c, issues: [], check: [] }) }));
  const title = `${P.make} ${P.model}`;
  document.title = `${title} ${P.year}, ${v.label} — CarCheck`;

  // ---------- Чек-лист ----------
  const isDiesel = /дизель/i.test(engine.fuel || "");
  const isTurbo = /турбо|TSI|TDI/i.test((engine.fuel || "") + engine.name);
  const isHybrid = /гібрид|електро/i.test(engine.fuel || "");
  const engineChecks = [
    "Холодний пуск: заводиться одразу, без сторонніх звуків" +
      (/ланцюг/.test(engine.timing || "") ? " (особливо брязкоту ланцюга в перші секунди)" : ""),
    "Немає диму з вихлопу: синій — олива, чорний — паливо/турбо, білий після прогріву — антифриз",
    "Немає течей оливи й антифризу під двигуном і на ньому",
    "Діагностика: немає помилок двигуна, у тому числі стертих нещодавно"
  ];
  if (isTurbo) engineChecks.push("Турбіна набирає тиск рівно, без свисту й провалів");
  if (isDiesel) engineChecks.push("Стан сажового фільтра DPF і кількість регенерацій (в діагностиці)");
  if (isHybrid) engineChecks.push("Стан високовольтної батареї та історія зарядок — у дилера");

  const gbChecks = [...new Set(gbs.flatMap(g => g.check || []))];
  const generalChecks = [
    "Історія авто за VIN: пробіг, ДТП, викрадення, застава",
    "Пробіг збігається з сервісною історією та зносом салону",
    "Товщина фарби по всіх елементах кузова (товщиномір)",
    "Підвіска: стуки на нерівностях, рівномірний знос шин",
    "Працюють кондиціонер, електрика, усі кнопки та датчики"
  ];
  const checkSections = [
    ["Двигун", engineChecks],
    ["Коробка передач", gbChecks],
    ["Кузов, ходова й документи", generalChecks]
  ];
  const totalChecks = checkSections.reduce((n, [, l]) => n + l.length, 0);

  // ---------- Головні ризики ----------
  const risks = [
    ...engine.issues.slice(0, 3).map(t => ({ tag: "Двигун", cls: "", t })),
    ...gbs.flatMap(g => (g.issues || []).slice(0, 2).map(t => ({ tag: g.code.startsWith("MT") ? "Коробка" : g.code, cls: "gb", t })))
  ];

  // ---------- Інші версії цього покоління ----------
  const others = gen.variants.filter(x => x !== v).map(x => {
    const year = Math.min(Math.max(P.year, x.years[0]), yTo(x.years[1]));
    const gb = x[P.gb].length ? P.gb : (x.manual.length ? "manual" : "auto");
    return { x, href: carUrl({ make: P.make, model: P.model, gen: gen.generation, engine: x.label, year, gb }) };
  });

  const list = items => `<ul class="issues">${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;

  app.innerHTML = `
    <div class="crumbs"><a href="index.html">Головна</a> / ${esc(P.make)} / ${esc(P.model)} / ${esc(gen.generation)}</div>

    <section class="car-hero">
      <div class="gen">${esc(gen.generation)} · ${yrs(gen.years)}</div>
      <h1>${esc(title)}</h1>
      <div class="specs">
        <div class="spec"><small>Рік</small><b>${P.year}</b></div>
        <div class="spec"><small>Двигун</small><b>${esc(v.label)}</b></div>
        <div class="spec"><small>Паливо</small><b>${esc(engine.fuel || "—")}</b></div>
        <div class="spec"><small>ГРМ</small><b>${esc(engine.timing || "—")}</b></div>
        <div class="spec"><small>Коробка</small><b>${GB_LABEL[P.gb]}${P.gb === "auto" ? " · " + esc(codes.join(" / ")) : ""}</b></div>
      </div>
      <div class="car-actions">
        <button class="btn" id="copy">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.07 0l3-3a5 5 0 00-7.07-7.07l-1.5 1.5"/><path d="M14 11a5 5 0 00-7.07 0l-3 3a5 5 0 007.07 7.07l1.5-1.5"/></svg>
          Скопіювати посилання
        </button>
        <button class="btn-ghost" id="print">Зберегти PDF</button>
        <a class="btn-ghost" href="index.html#check">Інше авто</a>
      </div>
    </section>

    <div class="car-body">
      ${codes.length > 1 || v.note ? `
      <div class="note" style="border-radius:16px">
        ${codes.length > 1 ? `<b>Можлива одна з ${codes.length} коробок: ${esc(codes.join(" або "))}.</b> ` : ""}
        ${v.note ? esc(v.note) + " " : ""}
        ${codes.length > 1 ? "Точно дізнатися можна за кодом на шильдику коробки, за PR-кодами на наклейці в багажнику (під підлогою, біля запаски) або в сервісній книжці." : ""}
      </div>` : ""}

      <section class="block">
        <div class="lbl">Коротко</div>
        <h2>Головні ризики</h2>
        <p>На що найчастіше скаржаться власники цієї версії. Перевірте ці пункти в першу чергу.</p>
        <div class="risks">
          ${risks.map(r => `<div class="risk"><span class="tag ${r.cls}">${esc(r.tag)}</span><span>${esc(r.t)}</span></div>`).join("")}
        </div>
      </section>

      <div class="two">
        <section class="block">
          <div class="lbl">Двигун</div>
          <h2>${esc(engine.name)}</h2>
          <div class="meta">${esc([engine.family, engine.fuel, engine.timing && "ГРМ: " + engine.timing].filter(Boolean).join(" · "))}</div>
          <p>${esc(engine.summary || "")}</p>
          <h3>Типові проблеми</h3>
          ${list(engine.issues)}
        </section>

        <section class="block">
          <div class="lbl">Коробка передач</div>
          ${gbs.map(g => `
            <div class="gearbox">
              <h4>${esc(g.name)}</h4>
              <div class="meta">${esc(g.kind || "")}</div>
              <p style="color:var(--muted);font-size:15px;margin-bottom:12px">${esc(g.summary || "")}</p>
              <h3>Типові проблеми</h3>
              ${list(g.issues || [])}
            </div>`).join("")}
        </section>
      </div>

      <section class="block">
        <div class="lbl">На огляд</div>
        <h2>Чек-лист огляду</h2>
        <p>Відмічайте пункти прямо на огляді з телефона.</p>
        <div class="progress"><span id="prog-text">0 з ${totalChecks}</span><div class="bar"><i id="prog-bar"></i></div></div>
        <div class="checklist">
          ${checkSections.map(([name, items]) => `
            <div>
              <h3>${esc(name)}</h3>
              ${items.map(t => `<label class="chk-item"><input type="checkbox"><span>${esc(t)}</span></label>`).join("")}
            </div>`).join("")}
        </div>
      </section>

      ${others.length ? `
      <section class="block">
        <div class="lbl">${esc(P.model)} ${esc(gen.generation)}</div>
        <h2>Інші версії</h2>
        <p>Порівняйте з іншими двигунами цього покоління.</p>
        <div class="versions">
          ${others.map(o => `<a class="version" href="${esc(o.href)}">${esc(o.x.label)}<small>${yrs(o.x.years)}</small></a>`).join("")}
        </div>
      </section>` : ""}

      <p class="disclaimer" style="font-size:13px;color:var(--muted)">Дані попередні й зібрані з відкритих джерел. Перед покупкою перевіряйте конкретне авто в сервісі.</p>
    </div>`;

  // ---------- Взаємодія ----------
  const toast = msg => {
    const t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 1800);
  };

  document.getElementById("copy").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(location.href); toast("Посилання скопійовано"); }
    catch { prompt("Скопіюйте посилання:", location.href); }
  });
  document.getElementById("print").addEventListener("click", () => window.print());

  const boxes = [...app.querySelectorAll(".chk-item input")];
  const updateProgress = () => {
    const n = boxes.filter(b => b.checked).length;
    document.getElementById("prog-text").textContent = `${n} з ${boxes.length}`;
    document.getElementById("prog-bar").style.width = (n / boxes.length * 100) + "%";
  };
  boxes.forEach(b => b.addEventListener("change", updateProgress));
})();
