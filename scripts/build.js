// Збирання даних сайту. Запускати після будь-якої зміни в data/:
//
//   node scripts/build.js
//
// Що робить:
//   1. Читає всі файли з data/engines/, data/gearboxes/ і data/makes/.
//   2. Перевіряє дані: кожна версія посилається на існуючий двигун і коробку, роки в межах покоління тощо.
//      Якщо є помилки — показує їх і нічого не записує.
//   3. Записує:
//      data/bundle.js      — усі дані одним файлом для сторінок сайту
//      data/knowledge.json — база для бекенда (/api/analyze): список авто, двигуни, коробки
//      docs/korobky.md     — «яка коробка на яких моделях і роках»
//   4. Оновлює версію (?v=…) скриптів і стилів в index.html та car.html, щоб браузери не брали старі файли з кешу.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const rel = p => path.relative(root, p).split(path.sep).join("/");
const SOURCE_DIRS = ["data/engines", "data/gearboxes", "data/makes"];
const files = SOURCE_DIRS.flatMap(d =>
  fs.readdirSync(path.join(root, d)).filter(f => f.endsWith(".js")).sort().map(f => path.join(root, d, f)));

// ---------- 1. Завантаження ----------
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of files) {
  try { vm.runInContext(fs.readFileSync(f, "utf8"), ctx, { filename: rel(f) }); }
  catch (e) { console.error(`Помилка в ${rel(f)}: ${e.message}`); process.exit(1); }
}
const DB = ctx.window.CarCheck;
const NOW = new Date().getFullYear();
const yTo = y => (y === null ? NOW : y);

// ---------- 2. Перевірка ----------
const errors = [];
const seen = new Set();
let variants = 0;
for (const [make, models] of Object.entries(DB.makes)) {
  for (const [model, gens] of Object.entries(models)) {
    for (const g of gens) {
      const where = `${make} ${model} ${g.generation}`;
      if (!Array.isArray(g.years) || g.years.length !== 2) errors.push(`${where}: некоректні роки покоління`);
      for (const v of g.variants) {
        variants++;
        const at = `${where} — ${v.label}`;
        if (!DB.engines[v.engine]) errors.push(`${at}: немає двигуна «${v.engine}» у data/engines/`);
        for (const c of [...(v.manual || []), ...(v.auto || [])])
          if (!DB.gearboxes[c]) errors.push(`${at}: немає коробки «${c}» у data/gearboxes/`);
        for (const c of v.manual || []) if (DB.gearboxes[c] && DB.gearboxes[c].type !== "manual") errors.push(`${at}: «${c}» вказана як механіка, але це автомат`);
        for (const c of v.auto || []) if (DB.gearboxes[c] && DB.gearboxes[c].type !== "auto") errors.push(`${at}: «${c}» вказана як автомат, але це механіка`);
        if (!(v.manual || []).length && !(v.auto || []).length) errors.push(`${at}: не вказано жодної коробки`);
        if (v.years[0] < g.years[0] || yTo(v.years[1]) > yTo(g.years[1])) errors.push(`${at}: роки ${v.years.join("–")} виходять за межі покоління`);
        if (v.years[0] > yTo(v.years[1])) errors.push(`${at}: рік початку пізніший за рік кінця`);
        const id = `${where}|${v.label}`;
        if (seen.has(id)) errors.push(`${at}: дублікат версії`);
        seen.add(id);
      }
    }
  }
}
for (const [k, e] of Object.entries(DB.engines)) for (const f of ["name", "summary", "issues"]) if (!e[f]) errors.push(`Двигун «${k}»: немає поля ${f}`);
for (const [k, g] of Object.entries(DB.gearboxes)) for (const f of ["name", "type", "kind", "summary", "issues"]) if (!g[f]) errors.push(`Коробка «${k}»: немає поля ${f}`);

if (errors.length) {
  console.error(`Знайдено помилок: ${errors.length}\n- ` + errors.join("\n- "));
  process.exit(1);
}

// ---------- 3a. data/bundle.js ----------
const bundle = [
  "// ЗГЕНЕРОВАНО скриптом scripts/build.js — не редагуйте вручну.",
  "// Джерела: data/engines/, data/gearboxes/, data/makes/.",
  "",
  ...files.map(f => `// ===== ${rel(f)} =====\n${fs.readFileSync(f, "utf8").trim()}\n`)
].join("\n");
fs.writeFileSync(path.join(root, "data/bundle.js"), bundle);

// ---------- 3b. data/knowledge.json ----------
const catalog = [];
for (const [make, models] of Object.entries(DB.makes))
  for (const [model, gens] of Object.entries(models))
    for (const g of gens)
      for (const v of g.variants)
        catalog.push({
          make, model, generation: g.generation, engine: v.label, engine_key: v.engine,
          years: v.years, manual: v.manual, auto: v.auto, note: v.note || null
        });
const pick = (obj, keys) => Object.fromEntries(Object.entries(obj).map(([k, o]) =>
  [k, Object.fromEntries(keys.filter(f => o[f] != null).map(f => [f, o[f]]))]));
// Інші назви моделей (як на Otomoto): «bmw|seria3» → ["BMW", "3 Series"]
// Так само, як compact() у functions/api/match.js
const compact = x => String(x || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "");
const aliases = {};
for (const [key, names] of Object.entries(DB.aliases || {})) {
  const [make, model] = key.split("|");
  if (!DB.makes[make] || !DB.makes[make][model]) { console.error(`Псевдонім «${key}»: немає такої моделі в data/makes/`); process.exit(1); }
  for (const n of names) aliases[compact(make) + "|" + compact(n)] = [make, model];
}
fs.writeFileSync(path.join(root, "data/knowledge.json"), JSON.stringify({
  catalog,
  aliases,
  engines: pick(DB.engines, ["name", "family", "fuel", "timing", "summary", "issues"]),
  gearboxes: pick(DB.gearboxes, ["name", "kind", "summary", "issues"])
}) + "\n");

// ---------- 3c. docs/korobky.md ----------
const yrs = r => `${r[0]}–${r[1] === null ? "н.ч." : r[1]}`;
const gbName = c => (DB.gearboxes[c] ? DB.gearboxes[c].name : c);
const out = [
  "# Коробки передач: які на яких моделях стоять", "",
  "> Документ згенеровано автоматично з `data/` командою `node scripts/build.js`.",
  "> Не редагуйте вручну — правте файли даних. Дані попередні, потребують звірки.", "",
  "## По моделях"
];
for (const [make, models] of Object.entries(DB.makes))
  for (const [model, gens] of Object.entries(models))
    for (const g of gens) {
      out.push("", `### ${make} ${model} ${g.generation} (${yrs(g.years)})`, "",
        "| Двигун | Роки | Механіка | Автомат | Примітка |", "|---|---|---|---|---|");
      for (const v of g.variants)
        out.push(`| ${v.label} | ${yrs(v.years)} | ${v.manual.map(gbName).join(", ") || "—"} | ${v.auto.join(" / ") || "—"} | ${v.note || ""} |`);
    }
out.push("", "## По коробках");
for (const [code, gb] of Object.entries(DB.gearboxes)) {
  const uses = [];
  for (const [make, models] of Object.entries(DB.makes))
    for (const [model, gens] of Object.entries(models))
      for (const g of gens)
        for (const v of g.variants)
          if (v.manual.includes(code) || v.auto.includes(code))
            uses.push(`${make} ${model} ${g.generation} — ${v.label} (${yrs(v.years)})`);
  if (!uses.length) continue;
  out.push("", `### ${gb.name}`, "", `*${gb.kind}.* ${gb.summary}`, "", ...uses.map(u => `- ${u}`));
}
out.push("");
fs.mkdirSync(path.join(root, "docs"), { recursive: true });
fs.writeFileSync(path.join(root, "docs/korobky.md"), out.join("\n"));

// ---------- 4. Версія файлів у HTML ----------
const d = new Date();
const version = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()]
  .map(n => String(n).padStart(2, "0")).join("");
for (const page of ["index.html", "car.html"]) {
  const p = path.join(root, page);
  const html = fs.readFileSync(p, "utf8").replace(/((?:src|href)="(?:scripts|data|styles)\/[^"?]+\.(?:js|css))(?:\?v=\d+)?"/g, `$1?v=${version}"`);
  fs.writeFileSync(p, html);
}

const count = o => Object.keys(o).length;
console.log(`Готово: ${count(DB.makes)} марок, ${variants} версій, ${count(DB.engines)} двигунів, ${count(DB.gearboxes)} коробок.`);
console.log(`Оновлено: data/bundle.js, data/knowledge.json, docs/korobky.md, версія файлів ${version}.`);
