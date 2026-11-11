// Спільне для обох сторінок: виклик /api/analyze, збереження й показ аналізу оголошення.
window.CarCheckAI = (function () {
  const KEY = "carcheck-analysis";
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  async function analyze(text, url, vin) {
    let res;
    try {
      res = await fetch("api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text, url, vin: vin || undefined })
      });
    } catch {
      throw new Error("Немає з'єднання з сервером аналізу.");
    }
    let data = null;
    try { data = await res.json(); } catch { /* не JSON */ }
    if (!data) {
      // Бекенда немає взагалі (статичний хостинг) — 404/405 без JSON;
      // інше (5xx, сторінка помилки Cloudflare) — тимчасовий збій сервера
      throw new Error(res.status === 404 || res.status === 405
        ? "Аналіз оголошень працює лише на версії сайту з бекендом (Cloudflare)."
        : "Сервер тимчасово не відповів. Спробуйте ще раз за хвилину.");
    }
    if (!res.ok || data.error) {
      // Технічна причина (статус і текст помилки API) — дрібним текстом, щоб було видно, що сталося
      const tech = data.detail ? ` (${data.status || res.status}: ${data.detail})` : "";
      const err = new Error((data.error || "Помилка аналізу.") + tech);
      err.data = data;
      throw err;
    }
    return data;
  }

  // Зберігаємо результат, щоб показати його на сторінці авто
  function save(result) {
    try { sessionStorage.setItem(KEY, JSON.stringify(result)); } catch { /* приватний режим */ }
  }
  // Повертає збережений аналіз, якщо він стосується цього авто
  function load(p) {
    let r = null;
    try { r = JSON.parse(sessionStorage.getItem(KEY) || "null"); } catch { return null; }
    const m = r && r.match;
    if (!m) return null;
    return m.make === p.make && m.model === p.model && m.gen === p.gen &&
      m.engine === p.engine && Number(m.year) === Number(p.year) ? r : null;
  }

  const fmt = n => Number(n).toLocaleString("uk-UA");

  function facts(l) {
    if (!l) return "";
    const items = [
      l.year && `${l.year} р.`,
      l.mileage_km != null && `${fmt(l.mileage_km)} км`,
      l.engine,
      l.gearbox && (l.gearbox === "auto" ? "автомат" : "механіка"),
      l.price != null && `${fmt(l.price)} ${l.currency || ""}`.trim()
    ].filter(Boolean);
    return items.length ? `<div class="ai-facts">${items.map(i => `<span>${esc(i)}</span>`).join("")}</div>` : "";
  }

  const VERDICT = {
    recommended: ["Варто їхати дивитись", "ok"],
    caution: ["Обережно — є питання", "warn"],
    avoid: ["Краще шукати інше", "bad"]
  };
  const PRICE = { low: ["Нижче ринку", "warn"], fair: ["У межах ринку", "ok"], high: ["Вище ринку", "bad"], unknown: ["Важко оцінити", "muted"] };
  const MILEAGE = { plausible: ["Правдоподібний", "ok"], suspicious: ["Підозрілий", "bad"], unknown: ["Не вказано", "muted"] };
  const SEV = { high: "Високий", medium: "Середній", low: "Низький" };
  const badge = ([text, cls]) => `<span class="pill ${cls}">${esc(text)}</span>`;

  function priceBar(p, price, cur) {
    if (!p || p.fair_min == null || p.fair_max == null || p.fair_max <= 0) return "";
    const lo = Math.min(p.fair_min, price ?? p.fair_min) * 0.85;
    const hi = Math.max(p.fair_max, price ?? p.fair_max) * 1.15;
    const pos = v => ((v - lo) / (hi - lo) * 100).toFixed(1);
    return `<div class="pbar">
        <div class="pbar-track"><i style="left:${pos(p.fair_min)}%;width:${(pos(p.fair_max) - pos(p.fair_min)).toFixed(1)}%"></i>
          ${price != null ? `<b style="left:${pos(price)}%" title="Ціна в оголошенні"></b>` : ""}</div>
        <div class="pbar-legend"><span>Орієнтовно ринок: ${fmt(p.fair_min)}–${fmt(p.fair_max)} ${esc(cur || "")}</span></div>
      </div>`;
  }

  // Перевірка за VIN: розшифровка, розбіжності, знахідки в інтернеті
  function vinBlock(r) {
    const v = r.vin;
    if (!v) return `<div class="ai-sec"><h4>Перевірка за VIN</h4>
      <p class="sub-line">VIN не вказано. Попросіть його в продавця (на Otomoto — кнопка «Pokaż VIN») і перевірте авто ще раз:
      Car Check звірить рік і марку та пошукає історію авто в інтернеті.</p></div>`;
    const c = r.vin_check || {};
    const facts = [
      v.maker && `Виробник: ${v.maker}`,
      v.country && `Зібрано: ${v.country}`,
      v.year && `Модельний рік: ${v.year}`
    ].filter(Boolean);
    const found = (c.findings || []);
    return `<div class="ai-sec vin-sec">
      <h4>Перевірка за VIN</h4>
      <div class="vin-head"><code>${esc(v.value)}</code>${facts.map(f => `<span>${esc(f)}</span>`).join("")}</div>
      ${v.north_america ? `<div class="trisk high"><span class="sev">Увага</span><div><b>Авто з ринку США / Канади</b><p>Такі авто часто пригнані після ДТП з аукціонів. Перевірте історію за VIN особливо уважно.</p></div></div>` : ""}
      ${(v.mismatches || []).map(m => `<div class="trisk high"><span class="sev">Розбіжність</span><div><p>${esc(m)}</p></div></div>`).join("")}
      ${c.summary ? `<p class="vin-sum">${esc(c.summary)}</p>` : ""}
      ${found.length ? `<div class="trisks">${found.map(f => `<div class="trisk medium"><span class="sev">Знайдено</span>
        <div><b><a href="${esc(f.url)}" target="_blank" rel="noopener nofollow">${esc(f.title)}</a></b><p>${esc(f.text)}</p></div></div>`).join("")}</div>`
        : v.searched ? `<p class="sub-line">У відкритих джерелах за цим VIN нічого не знайдено — це добрий знак, але не гарантія.</p>` : ""}
      <p class="sub-line">Безкоштовна державна перевірка: <a href="https://historiapojazdu.gov.pl/" target="_blank" rel="noopener">historiapojazdu.gov.pl</a>
        — пробіги з техогляду, кількість власників, пошкодження. Потрібні VIN, номер і дата першої реєстрації (спитайте в продавця).</p>
    </div>`;
  }

  // Що Claude побачив на фото оголошення
  const PSEV = { high: "Важливо", medium: "Увага", low: "Дрібниця", info: "Норма" };
  function photoBlock(r) {
    const obs = r.photo_observations || [];
    if (!obs.length || !(r.photos || []).length) return "";
    const thumb = n => (r.photos[n - 1] || "").replace(/;s=\d+x\d+$/, ";s=320x240");
    return `<div class="ai-sec">
      <h4>Що видно на фото (${r.photos.length} фото)</h4>
      <div class="trisks">${obs.map(o => `<div class="trisk photo ${esc(o.severity)}">
        <a class="ph" href="${esc(r.photos[o.photo - 1])}" target="_blank" rel="noopener"><img src="${esc(thumb(o.photo))}" alt="Фото ${o.photo}" loading="lazy"><span>Фото ${o.photo}</span></a>
        <div><span class="sev">${esc(PSEV[o.severity] || "")}</span><p>${esc(o.text)}</p>${o.check ? `<p class="chk">Перевірте: ${esc(o.check)}</p>` : ""}</div>
      </div>`).join("")}</div>
      <div class="sub-line">Claude бачить лише те, що на фото. Відсутність видимих дефектів не замінює огляд і перевірку товщиноміром.</div>
    </div>`;
  }

  function render(r) {
    const l = r.listing || {};
    const v = r.verdict || {};
    const [vText, vCls] = VERDICT[v.label] || VERDICT.caution;
    const li = arr => arr.map(x => typeof x === "object"
      ? `<li class="${esc(x.severity)}">${esc(x.text)}</li>` : `<li>${esc(x)}</li>`).join("");
    const col = (title, arr, cls) => arr && arr.length
      ? `<div class="ai-col ${cls}"><h4>${title}</h4><ul>${li(arr)}</ul></div>` : "";
    const p = r.price || {}, m = r.mileage || {}, q = r.listing_quality || {};

    return `<div class="ai">
      <div class="verdict ${vCls}">
        <div class="score"><b>${v.score ?? "–"}</b><span>з 10</span></div>
        <div>
          <div class="v-label">${esc(vText)}</div>
          <h3>${esc(v.headline || "")}</h3>
          <p>${esc(v.explanation || r.summary || "")}</p>
        </div>
      </div>
      ${facts(l)}

      <div class="ai-cards">
        <div class="ai-card">
          <div class="ai-card-h"><h4>Ціна</h4>${badge(PRICE[p.assessment] || PRICE.unknown)}</div>
          ${l.price != null ? `<div class="big">${fmt(l.price)} <small>${esc(l.currency || "")}</small></div>` : ""}
          ${priceBar(p, l.price, l.currency)}
          <p>${esc(p.comment || "")}</p>
        </div>
        <div class="ai-card">
          <div class="ai-card-h"><h4>Пробіг</h4>${badge(MILEAGE[m.assessment] || MILEAGE.unknown)}</div>
          ${l.mileage_km != null ? `<div class="big">${fmt(l.mileage_km)} <small>км</small></div>` : ""}
          ${m.per_year_km ? `<div class="sub-line">≈ ${fmt(m.per_year_km)} км на рік</div>` : ""}
          <p>${esc(m.comment || "")}</p>
        </div>
        <div class="ai-card">
          <div class="ai-card-h"><h4>Оголошення</h4><span class="pill ${q.score >= 7 ? "ok" : q.score >= 4 ? "warn" : "bad"}">${q.score ?? "–"} / 10</span></div>
          <p>${esc(q.comment || "")}</p>
          ${q.missing && q.missing.length ? `<div class="sub-line">Не вказано:</div><div class="missing">${q.missing.map(x => `<span>${esc(x)}</span>`).join("")}</div>` : ""}
        </div>
      </div>

      ${r.technical_risks && r.technical_risks.length ? `
      <div class="ai-sec">
        <h4>Технічні ризики саме цього авто</h4>
        <div class="trisks">
          ${r.technical_risks.map(t => `<div class="trisk ${esc(t.severity)}">
            <span class="sev">${esc(SEV[t.severity] || "")}</span>
            <div><b>${esc(t.title)}</b><p>${esc(t.text)}</p></div>
          </div>`).join("")}
        </div>
      </div>` : ""}

      ${r.extra_costs && r.extra_costs.length ? `
      <div class="ai-sec">
        <h4>Очікувані витрати після покупки</h4>
        <div class="costs">
          ${r.extra_costs.map(c => `<div class="cost"><span>${esc(c.item)}</span><b>${esc(c.estimate)}</b></div>`).join("")}
        </div>
        <div class="sub-line">Суми орієнтовні й залежать від стану авто та сервісу.</div>
      </div>` : ""}

      ${vinBlock(r)}
      ${photoBlock(r)}

      ${(r.notes || []).length ? `<div class="sub-line">Технічна примітка: ${esc(r.notes.join(" | "))}</div>` : ""}

      <div class="ai-grid">
        ${col("Тривожні ознаки", r.red_flags, "bad")}
        ${col("Що добре", r.good_signs, "good")}
        ${col("Запитайте продавця", r.questions_for_seller, "ask")}
      </div>
    </div>`;
  }

  return { analyze, save, load, render };
})();
