// Перевірка посилання: чи це конкретне оголошення про продаж авто з підтримуваного сайту.
// Використовується і в браузері (window.CarCheckURL), і на сервері (import).
//
// Приклади оголошень:
//   otomoto.pl  /osobowe/oferta/skoda-octavia-2-0-tdi-ID6GabcD.html   або /oferta/…-ID….html
//   olx.pl      /d/oferta/skoda-octavia-…-CID5-IDxyz.html            (також /d/uk/oferta/…)
//   auto.ria.com /auto_skoda_octavia_39915829.html                   (також /uk/auto_…)
// Списки й пошук (/osobowe/skoda/octavia?…, /motoryzacja/samochody/…, /search/…, /car/…) — не оголошення.

// Поки що працюємо лише з Otomoto. Щоб увімкнути OLX чи AUTO.RIA, розкоментуйте рядки
// (і додайте їм завантаження сторінки в functions/api/, як otomoto.js).
const SITES = [
  { host: "otomoto.pl",   name: "Otomoto",   listing: /^\/(?:[a-z-]+\/)?oferta\/[^/]+-ID[0-9A-Za-z]+\.html$/ }
  // { host: "olx.pl",       name: "OLX",       listing: /^\/d\/(?:[a-z]{2}\/)?oferta\/[^/]+-ID[0-9A-Za-z]+\.html$/ },
  // { host: "auto.ria.com", name: "AUTO.RIA",  listing: /^\/(?:(?:uk|ru)\/)?auto_[a-z0-9_]+_\d+\.html$/i }
];

// Повертає { ok: true, site, host, path } або { ok: false, reason, message }
function checkListingUrl(raw) {
  let u;
  try { u = new URL(String(raw || "").trim()); } catch {
    return { ok: false, reason: "invalid", message: "Це не схоже на посилання. Скопіюйте адресу оголошення з браузера." };
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") {
    return { ok: false, reason: "invalid", message: "Це не схоже на посилання. Скопіюйте адресу оголошення з браузера." };
  }
  const host = u.hostname.toLowerCase().replace(/^(www\.|m\.)/, "");
  const site = SITES.find(s => host === s.host || host.endsWith("." + s.host));
  if (!site) {
    return { ok: false, reason: "site", message: "Поки що підтримуємо лише оголошення з Otomoto." };
  }
  const path = decodeURIComponent(u.pathname).replace(/\/+$/, "");
  if (!site.listing.test(path)) {
    return {
      ok: false, reason: "not_listing",
      message: `Це посилання на ${site.name}, але не на конкретне оголошення (схоже на список чи пошук). Відкрийте потрібне авто й скопіюйте його адресу.`
    };
  }
  return { ok: true, site: site.name, host: site.host, path };
}

if (typeof window !== "undefined") window.CarCheckURL = { check: checkListingUrl };
if (typeof module !== "undefined") module.exports = { checkListingUrl };
