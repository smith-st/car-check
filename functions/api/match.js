// Підбір версії авто з бази кодом — без Claude.
//
// Ідея: Claude не потрібно бачити всю базу (217 версій усіх марок). Ми самі звужуємо її
// до кількох кандидатів, і Claude отримує лише їх та описи їхніх двигунів і коробок.
//
//   fromSpecs(K, specs) — для оголошення з Otomoto: є марка, модель, рік, паливо, об'єм, потужність, коробка.
//   fromText(K, text)   — для вставленого вручну тексту: шукаємо марку й модель (і рік) у тексті.
//
// Повертають { status, indices } — індекси в K.catalog:
//   "exact"   — версію визначено точно (1 кандидат) або майже точно (кілька дуже схожих);
//   "partial" — збіг лише за маркою/моделлю/роком/об'ємом, остаточно вирішить Claude;
//   "model"   — відома лише модель (текст), Claude обирає з усіх її версій;
//   "none"    — модель є в базі, але такої версії немає (Claude не потрібен);
//   "unknown" — нічого не зрозуміло, Claude отримує всю базу (рідкісний випадок).

export const slugify = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
  .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const NOW = new Date().getFullYear();
const yTo = y => (y === null ? NOW : y);

// «1.5 TSI 150 к.с.» → 1.5; «RS 2.0 TDI 184 к.с.» → 2.0; «1.33 Dual VVT-i» → 1.3
function displacement(label) {
  const m = String(label).match(/(\d\.\d{1,2})/);
  return m ? Math.round(parseFloat(m[1]) * 10) / 10 : null;
}
// «140–150 к.с.» → [140, 150]; «190 к.с.» → [190, 190]
function powerRange(label) {
  const m = String(label).match(/(\d{2,3})(?:\s*[–-]\s*(\d{2,3}))?\s*к\.с\./);
  return m ? [Number(m[1]), Number(m[2] || m[1])] : null;
}
const fuelKind = s => {
  s = String(s || "").toLowerCase();
  if (/plug|плагін/.test(s)) return "phev";
  if (/diesel|дизель/.test(s)) return "diesel";
  return "petrol"; // бензин, бензин+LPG, повні й мілд-гібриди
};
const roman = s => (String(s || "").trim().match(/^([IVX]+|B\d)\b/) || [])[1] || null;

// Індекси каталогу для пари марка+модель
// Порівнюємо без дефісів і пробілів: «cee'd» = «Ceed», «CX 5» = «CX-5», «Seria 3» = «seria-3»
const compact = s => slugify(s).replace(/-/g, "");
function modelIndices(K, make, model) {
  const mk = compact(make), md = compact(model);
  return K.catalog.map((c, i) => i).filter(i => compact(K.catalog[i].make) === mk && compact(K.catalog[i].model) === md);
}

export function fromSpecs(K, specs) {
  const all = modelIndices(K, specs.make, specs.model);
  if (!all.length) return { status: "none", indices: [] };

  const C = i => K.catalog[i];
  const fuel = specs.fuel ? fuelKind(specs.fuel) : null;
  const liters = specs.capacity_cm3 ? Math.round(specs.capacity_cm3 / 100) / 10 : null;

  const byYear = i => !specs.year || (specs.year >= C(i).years[0] && specs.year <= yTo(C(i).years[1]));
  const byFuel = i => {
    if (!fuel) return true;
    const ef = fuelKind((K.engines[C(i).engine_key] || {}).fuel);
    return fuel === "phev" ? ef === "phev" : fuel === "diesel" ? ef === "diesel" : ef !== "diesel";
  };
  const byDisp = i => { const d = displacement(C(i).engine); return liters == null || d == null || Math.abs(d - liters) <= 0.06; };
  const byPower = i => { const p = powerRange(C(i).engine); return !specs.power_hp || !p || (specs.power_hp >= p[0] - 6 && specs.power_hp <= p[1] + 6); };
  const byGearbox = i => !specs.gearbox || (specs.gearbox === "auto" ? C(i).auto.length > 0 : C(i).manual.length > 0);

  let strict = all.filter(i => byYear(i) && byFuel(i) && byDisp(i) && byPower(i) && byGearbox(i));
  // Кілька кандидатів — пробуємо уточнити за поколінням (Otomoto: «III (2013-)»)
  if (strict.length > 1 && roman(specs.generation)) {
    const g = strict.filter(i => roman(C(i).generation) === roman(specs.generation));
    if (g.length) strict = g;
  }
  if (strict.length) return { status: "exact", indices: strict };

  // М'якший пошук: без потужності й коробки (в оголошенні вони можуть бути вказані неточно)
  const relaxed = all.filter(i => byYear(i) && byFuel(i) && byDisp(i));
  if (relaxed.length) return { status: "partial", indices: relaxed };

  return { status: "none", indices: [] };
}

export function fromText(K, text) {
  const tokens = slugify(text).split("-").filter(Boolean);
  const has = words => tokens.some((_, i) => words.every((w, k) => tokens[i + k] === w));
  const pairs = [...new Map(K.catalog.map(c => [c.make + "|" + c.model, c])).values()];

  // Модель одразу після марки («skoda octavia», «mazda cx-5»), інакше — назва моделі будь-де (лише довші за 2 символи)
  let pair = pairs.find(c => has([...slugify(c.make).split("-"), ...slugify(c.model).split("-")]));
  if (!pair) pair = pairs.find(c => has(slugify(c.make).split("-")) && slugify(c.model).replace(/-/g, "").length > 2 && has(slugify(c.model).split("-")));
  if (!pair) return { status: "unknown", indices: K.catalog.map((c, i) => i) };

  let idx = modelIndices(K, pair.make, pair.model);
  // Якщо в тексті є рік — лишаємо версії, що випускались у цей рік
  const years = [...String(text).matchAll(/\b(19[89]\d|20[0-3]\d)\b/g)].map(m => Number(m[1])).filter(y => y <= NOW);
  if (years.length) {
    const y = idx.filter(i => years.some(yr => yr >= K.catalog[i].years[0] && yr <= yTo(K.catalog[i].years[1])));
    if (y.length) idx = y;
  }
  return { status: "model", indices: idx };
}
