// Спільне для обох сторінок: виклик /api/analyze, збереження й показ аналізу оголошення.
window.CarCheckAI = (function () {
  const KEY = "carcheck-analysis";
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  async function analyze(text, url) {
    let res;
    try {
      res = await fetch("api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text, url })
      });
    } catch {
      throw new Error("Немає з'єднання з сервером аналізу.");
    }
    let data = null;
    try { data = await res.json(); } catch { /* не JSON */ }
    if (res.status === 404 || res.status === 405 || !data) {
      throw new Error("Аналіз оголошень працює лише на версії сайту з бекендом (Cloudflare).");
    }
    if (!res.ok || data.error) throw new Error(data.error || "Помилка аналізу.");
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

  function facts(l) {
    if (!l) return "";
    const items = [
      l.year && `${l.year} р.`,
      l.mileage_km != null && `${Number(l.mileage_km).toLocaleString("uk-UA")} км`,
      l.engine,
      l.gearbox && (l.gearbox === "auto" ? "автомат" : "механіка"),
      l.price != null && `${Number(l.price).toLocaleString("uk-UA")} ${l.currency || ""}`.trim()
    ].filter(Boolean);
    return items.length ? `<div class="ai-facts">${items.map(i => `<span>${esc(i)}</span>`).join("")}</div>` : "";
  }

  function render(r) {
    const li = (arr, cls) => arr.map(x => typeof x === "object"
      ? `<li class="${esc(x.severity)}">${esc(x.text)}</li>` : `<li>${esc(x)}</li>`).join("");
    const col = (title, arr, cls) => arr && arr.length
      ? `<div class="ai-col ${cls}"><h4>${title}</h4><ul>${li(arr)}</ul></div>` : "";
    return `<div class="ai">
      ${facts(r.listing)}
      <p class="ai-summary">${esc(r.summary)}</p>
      <div class="ai-grid">
        ${col("Тривожні ознаки", r.red_flags, "bad")}
        ${col("Що добре", r.good_signs, "good")}
        ${col("Запитайте продавця", r.questions_for_seller, "ask")}
      </div>
    </div>`;
  }

  return { analyze, save, load, render };
})();
