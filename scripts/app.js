// Логіка головної сторінки CarCheck.
// Дані підключаються з data/*.js і лежать у window.CarCheck.
(function () {
  const DB = window.CarCheck;
  const NOW = new Date().getFullYear();
  const $ = id => document.getElementById(id);
  const make = $("make"), model = $("model"), year = $("year"), engine = $("engine"), gearbox = $("gearbox");
  const goManual = $("go-manual");

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const yTo = y => (y === null ? NOW : y);
  const inRange = (y, r) => y >= r[0] && y <= yTo(r[1]);

  function fill(sel, items, placeholder) {
    // items: [{value, label}] або рядки
    sel.innerHTML = `<option value="">${placeholder}</option>` +
      items.map(i => typeof i === "object"
        ? `<option value="${esc(i.value)}">${esc(i.label)}</option>`
        : `<option value="${esc(i)}">${esc(i)}</option>`).join("");
    sel.disabled = items.length === 0;
  }
  const reset = (sel, placeholder) => fill(sel, [], placeholder);
  const updateBtn = () => {
    goManual.disabled = !(make.value && model.value && year.value && engine.value && gearbox.value);
    $("hint").hidden = !goManual.disabled;
  };

  // Варіанти, доступні для обраного року (з урахуванням покоління)
  function variantsFor() {
    const gens = DB.makes[make.value][model.value];
    const y = Number(year.value);
    const out = [];
    gens.forEach((g, gi) => {
      if (!inRange(y, g.years)) return;
      g.variants.forEach((v, vi) => {
        if (inRange(y, v.years)) out.push({ gen: g, v, id: `${gi}:${vi}` });
      });
    });
    return out;
  }
  function currentVariant() {
    const [gi, vi] = engine.value.split(":").map(Number);
    const g = DB.makes[make.value][model.value][gi];
    return { gen: g, v: g.variants[vi] };
  }

  fill(make, Object.keys(DB.makes), "Оберіть марку");

  make.addEventListener("change", () => {
    make.value ? fill(model, Object.keys(DB.makes[make.value]), "Оберіть модель")
               : reset(model, "Спочатку марка");
    reset(year, "Спочатку модель"); reset(engine, "Спочатку рік"); reset(gearbox, "Спочатку двигун");
    updateBtn();
  });

  model.addEventListener("change", () => {
    if (model.value) {
      const gens = DB.makes[make.value][model.value];
      const from = Math.min(...gens.map(g => g.years[0]));
      const to = Math.max(...gens.map(g => yTo(g.years[1])));
      const ys = [];
      for (let y = to; y >= from; y--) ys.push(y);
      fill(year, ys, "Оберіть рік");
    } else reset(year, "Спочатку модель");
    reset(engine, "Спочатку рік"); reset(gearbox, "Спочатку двигун");
    updateBtn();
  });

  year.addEventListener("change", () => {
    if (year.value) {
      const list = variantsFor();
      // Якщо в цьому році випускалось два покоління — підписуємо покоління
      const multiGen = new Set(list.map(x => x.gen.generation)).size > 1;
      fill(engine, list.map(x => ({
        value: x.id,
        label: multiGen ? `${x.v.label} — ${x.gen.generation}` : x.v.label
      })), "Оберіть двигун");
    } else reset(engine, "Спочатку рік");
    reset(gearbox, "Спочатку двигун");
    updateBtn();
  });

  engine.addEventListener("change", () => {
    if (engine.value) {
      const { v } = currentVariant();
      const opts = [];
      if (v.manual.length) opts.push({ value: "manual", label: "Механіка" });
      if (v.auto.length) opts.push({ value: "auto", label: "Автомат" });
      fill(gearbox, opts, "Оберіть коробку");
      if (opts.length === 1) gearbox.value = opts[0].value;
    } else reset(gearbox, "Спочатку двигун");
    updateBtn();
  });
  gearbox.addEventListener("change", updateBtn);

  // ---------- Перехід на сторінку авто ----------
  goManual.addEventListener("click", () => {
    const { gen, v } = currentVariant();
    location.href = "car.html?" + new URLSearchParams({
      make: make.value, model: model.value, gen: gen.generation,
      engine: v.label, year: year.value, gb: gearbox.value
    }).toString();
  });

  function showSimple(title, text) {
    $("result-title").textContent = title;
    $("result-text").textContent = text;
    $("report").innerHTML = "";
    const r = $("result");
    r.classList.remove("show"); void r.offsetWidth; r.classList.add("show");
  }

  // ---------- Вкладки ----------
  const tabs = [["t-manual", "tab-manual"], ["t-link", "tab-link"]];
  tabs.forEach(([t, p]) => $(t).addEventListener("click", () => {
    tabs.forEach(([t2, p2]) => {
      $(t2).setAttribute("aria-selected", t2 === t);
      $(p2).hidden = p2 !== p;
    });
    $("result").classList.remove("show");
  }));

  // ---------- Посилання на оголошення ----------
  const ALLOWED = ["otomoto.pl", "auto.ria.com", "olx.pl"];
  $("go-link").addEventListener("click", () => {
    const msg = $("url-msg");
    msg.className = "msg";
    let u;
    try { u = new URL($("url").value.trim()); } catch {
      msg.textContent = "Вставте коректне посилання."; msg.classList.add("err"); return;
    }
    const host = u.hostname.replace(/^www\./, "");
    const site = ALLOWED.find(d => host === d || host.endsWith("." + d));
    if (!site) {
      msg.textContent = "Поки що підтримуємо лише otomoto.pl, auto.ria.com та olx.pl.";
      msg.classList.add("err"); return;
    }
    const found = detectCar(u.pathname);
    if (!found || !found.model) {
      msg.textContent = "";
      showSimple(found ? `По цій моделі ${found.make} інформації поки немає` : "По цьому авто інформації поки немає",
        `Зараз доступні: ${availableList()}. Ми поступово додаємо нові марки й моделі.`);
      return;
    }
    msg.textContent = `Розпізнано: ${found.make} ${found.model} (${site}). Уточніть рік, двигун і коробку.`;
    msg.classList.add("ok");
    // Переходимо до ручного вибору з підставленими маркою й моделлю
    $("t-manual").click();
    make.value = found.make; make.dispatchEvent(new Event("change"));
    model.value = found.model; model.dispatchEvent(new Event("change"));
    year.focus();
    showSimple(`${found.make} ${found.model}`,
      "Авто знайдено в базі. Оберіть рік, двигун і тип коробки, щоб отримати звіт.");
  });

  // Розпізнавання марки й моделі зі шляху посилання,
  // напр. otomoto: /osobowe/oferta/skoda-octavia-…, auto.ria: /auto_skoda_octavia_…, olx: /d/oferta/skoda-octavia-…
  const slug = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  function detectCar(pathname) {
    const tokens = slug(decodeURIComponent(pathname)).split("-").filter(Boolean);
    const has = words => tokens.some((_, i) => words.every((w, k) => tokens[i + k] === w));
    for (const mk of Object.keys(DB.makes)) {
      if (!has(slug(mk).split("-").filter(Boolean))) continue;
      const mw = slug(mk).split("-").filter(Boolean);
      const models = Object.keys(DB.makes[mk]);
      // Спершу модель одразу після марки (skoda-octavia, mazda-cx-5), інакше — будь-де,
      // але тільки для довших назв, щоб «3» чи «6» не збігались з цифрами двигуна.
      const md = models.find(m => has(mw.concat(slug(m).split("-").filter(Boolean)))) ||
                 models.find(m => slug(m).replace(/-/g, "").length > 2 && has(slug(m).split("-").filter(Boolean)));
      return { make: mk, model: md || null };
    }
    return null;
  }
  function availableList() {
    return Object.entries(DB.makes)
      .map(([mk, models]) => `${mk} ${Object.keys(models).join(", ")}`).join("; ");
  }
  $("url").addEventListener("keydown", e => { if (e.key === "Enter") $("go-link").click(); });
})();
