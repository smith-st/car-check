// Завантаження й розбір оголошення з Otomoto.
// Сторінка оголошення містить усі дані в <script id="__NEXT_DATA__"> → props.pageProps.advert:
// title, price, details (марка, модель, версія, рік, пробіг, двигун, коробка…), seller, equipment, description.
//
// Повертає:
//   { ok: true, text, make, model, title }   — текст для Claude (до maxChars символів)
//   { ok: false, reason, message }           — reason: "gone" (неактивне/видалене) | "blocked" | "error"

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const stripHtml = h => String(h || "")
  .replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n").replace(/<li>/gi, "• ")
  .replace(/<[^>]+>/g, "")
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/\n{3,}/g, "\n\n").trim();

// Значення, які Otomoto шифрує або лишає порожніми (дата реєстрації, VIN, номер)
const usable = v => v != null && String(v).trim() !== "" && !/^[A-Za-z0-9+/]{20,}={0,2}\.\d\./.test(String(v));

const SELLER = { PROFESSIONAL: "фірма / автосалон / коміс", PRIVATE: "приватна особа", BUSINESS: "фірма" };

export async function fetchOtomoto(url, maxChars = 8000) {
  let res;
  try {
    res = await fetch(url, {
      headers: {
        "User-Agent": UA,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pl-PL,pl;q=0.9,en;q=0.8"
      },
      redirect: "follow",
      signal: AbortSignal.timeout(12000)
    });
  } catch {
    return { ok: false, reason: "error", message: "Не вдалося з'єднатися з Otomoto." };
  }

  if (res.status === 404 || res.status === 410) {
    return { ok: false, reason: "gone", message: "Оголошення вже неактивне або видалене з Otomoto." };
  }
  if (!res.ok) {
    return { ok: false, reason: "blocked", message: `Otomoto не віддав сторінку (код ${res.status}).` };
  }

  const html = await res.text();
  // Шукаємо дані простим indexOf замість регулярного виразу — сторінка велика (~600 КБ),
  // а безкоштовний план Cloudflare обмежує процесорний час запиту.
  const marker = '<script id="__NEXT_DATA__"';
  const at = html.indexOf(marker);
  const start = at < 0 ? -1 : html.indexOf(">", at) + 1;
  const end = start > 0 ? html.indexOf("</script>", start) : -1;
  if (at < 0 || end < 0) return { ok: false, reason: "blocked", message: "Otomoto показав сторінку перевірки замість оголошення." };

  let a;
  try { a = JSON.parse(html.slice(start, end)).props.pageProps.advert; } catch { a = null; }
  if (!a || !a.title) return { ok: false, reason: "error", message: "Не вдалося знайти дані оголошення на сторінці." };
  if (a.status && a.status !== "ACTIVE") {
    return { ok: false, reason: "gone", message: "Оголошення вже неактивне на Otomoto." };
  }

  const details = Array.isArray(a.details) ? a.details : [];
  const get = key => { const d = details.find(x => x.key === key); return d && usable(d.value) ? String(d.value) : null; };

  const lines = [];
  lines.push(`Tytuł: ${a.title}`);
  if (a.price && a.price.value) {
    const labels = (a.price.labels || []).map(l => (/negotiable/i.test(l) ? "do negocjacji" : l));
    lines.push(`Cena: ${a.price.value} ${a.price.currency || ""}${labels.length ? ` (${labels.join(", ")})` : ""}`);
  }
  if (a.createdAt) lines.push(`Dodano: ${String(a.createdAt).slice(0, 10)}`);
  if (a.seller) {
    lines.push(`Sprzedający: ${SELLER[a.seller.type] || a.seller.type || "?"}${a.seller.name ? ` — ${a.seller.name}` : ""}`);
  }
  // Параметри, що не впливають на оцінку стану, ризиків і ціни, — не передаємо (економія токенів)
  const SKIP = new Set(["door_count", "nr_seats", "co2_emissions", "urban_consumption", "extra_urban_consumption", "colour_type"]);
  lines.push("", "Parametry:");
  for (const d of details) if (usable(d.value) && !SKIP.has(d.key)) lines.push(`- ${d.label}: ${d.value}`);
  if (a.verifiedCar) lines.push("- Pojazd zweryfikowany przez Otomoto: Tak");

  if (Array.isArray(a.equipment) && a.equipment.length) {
    const eq = a.equipment.flatMap(g => (g.values || []).map(v => v.label)).filter(Boolean);
    if (eq.length) lines.push("", `Wyposażenie (${eq.length}): ${eq.slice(0, 40).join(", ")}${eq.length > 40 ? ", …" : ""}`);
  }

  const head = lines.join("\n");
  // Опис продавця лишаємо повністю (у межах ліміту) — прибираємо лише зайві пробіли й повтори рядків
  const seen = new Set();
  const desc = stripHtml(a.description).split("\n").map(l => l.replace(/[ \t]+/g, " ").trim())
    .filter(l => { if (!l) return true; const k = l.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; })
    .join("\n").replace(/\n{2,}/g, "\n");
  const room = Math.max(500, maxChars - head.length - 20);
  const text = `${head}\n\nOpis:\n${desc.length > room ? desc.slice(0, room) + "…" : desc}`;

  // Структуровані дані для підбору версії авто кодом
  const specs = {
    make: get("make"), model: get("model"), version: get("version"), generation: get("generation"),
    year: Number(get("year")) || null,
    fuel: get("fuel_type"),
    capacity_cm3: Number((get("engine_capacity") || "").replace(/cm.*$/i, "").replace(/\D/g, "")) || null, // «1 984 cm3» → 1984
    power_hp: Number((get("engine_power") || "").replace(/km.*$/i, "").replace(/\D/g, "")) || null,    // «190 KM» → 190
    gearbox: /automat/i.test(get("gearbox") || "") ? "auto" : /manual/i.test(get("gearbox") || "") ? "manual" : null
  };
  return { ok: true, text, make: specs.make, model: specs.model, title: a.title, specs };
}
