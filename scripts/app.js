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

  // ---------- Посилання / текст оголошення ----------
  const ALLOWED = ["otomoto.pl", "auto.ria.com", "olx.pl"];
  const listing = $("listing");
  const goLink = $("go-link");
  const setMsg = (text, cls) => { const m = $("url-msg"); m.className = "msg" + (cls ? " " + cls : ""); m.textContent = text; };
  const noInfo = (makeName) => showSimple(
    makeName ? `По цій моделі ${makeName} інформації поки немає` : "По цьому авто інформації поки немає",
    `Зараз доступні: ${availableList()}. Ми поступово додаємо нові марки й моделі.`);

  listing.addEventListener("input", () => {
    $("go-link-text").textContent = listing.value.trim() ? "Аналізувати" : "Перевірити";
  });

  // Підставити авто у форму ручного вибору
  function prefill(m) {
    $("t-manual").click();
    make.value = m.make; make.dispatchEvent(new Event("change"));
    model.value = m.model; model.dispatchEvent(new Event("change"));
    if (m.year) { year.value = String(m.year); year.dispatchEvent(new Event("change")); }
    if (m.engine) {
      const opt = [...engine.options].find(o => o.value && currentLabel(o.value) === m.engine && currentGen(o.value) === m.gen);
      if (opt) { engine.value = opt.value; engine.dispatchEvent(new Event("change")); }
    }
  }
  const currentGen = id => DB.makes[make.value][model.value][Number(id.split(":")[0])].generation;
  const currentLabel = id => {
    const [gi, vi] = id.split(":").map(Number);
    return DB.makes[make.value][model.value][gi].variants[vi].label;
  };

  goLink.addEventListener("click", async () => {
    setMsg("");
    const rawUrl = $("url").value.trim();
    const text = listing.value.trim();
    let u = null, site = null;
    if (rawUrl) {
      try { u = new URL(rawUrl); } catch { return setMsg("Вставте коректне посилання.", "err"); }
      const host = u.hostname.replace(/^www\./, "");
      site = ALLOWED.find(d => host === d || host.endsWith("." + d));
      if (!site) return setMsg("Поки що підтримуємо лише otomoto.pl, auto.ria.com та olx.pl.", "err");
    }

    // З текстом — аналіз через Claude
    if (text) {
      goLink.classList.add("loading");
      $("go-link-text").textContent = "Аналізую…";
      setMsg("Claude читає оголошення, це займає 10–20 секунд…");
      let r;
      try { r = await CarCheckAI.analyze(text, rawUrl); }
      catch (e) { return setMsg(e.message, "err"); }
      finally { goLink.classList.remove("loading"); $("go-link-text").textContent = "Аналізувати"; }

      if (!r.is_car_listing) return setMsg("Схоже, це не оголошення про продаж авто.", "err");
      if (!r.match) {
        setMsg("");
        const known = r.listing && DB.makes[r.listing.make];
        return noInfo(known ? r.listing.make : null);
      }
      CarCheckAI.save(r);
      if (r.match.gb) {
        location.href = "car.html?" + new URLSearchParams(r.match).toString();
        return;
      }
      // Тип коробки з оголошення не зрозумілий — просимо обрати
      prefill(r.match);
      showSimple(`${r.match.make} ${r.match.model} ${r.match.year}, ${r.match.engine}`,
        "Авто знайдено в базі. З оголошення не зрозуміло, яка коробка, — оберіть тип коробки й натисніть «Перевірити».");
      gearbox.focus();
      return;
    }

    // Лише посилання — визначаємо марку й модель з адреси
    if (!u) return setMsg("Вставте посилання або текст оголошення.", "err");
    const found = detectCar(u.pathname);
    if (!found || !found.model) return noInfo(found && found.make);
    setMsg(`Розпізнано: ${found.make} ${found.model} (${site}). Уточніть рік, двигун і коробку.`, "ok");
    prefill(found);
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
