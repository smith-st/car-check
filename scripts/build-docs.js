// Генерує з файлів data/:
//   docs/korobky.md    — «яка коробка на яких моделях і роках»
//   data/catalog.json  — компактний список авто з бази для бекенда (/api/analyze)
// Запуск після будь-якої зміни даних: node scripts/build-docs.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const ctx = { window: {} };
vm.createContext(ctx);
const load = f => vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
load("data/engines.js");
load("data/gearboxes.js");
fs.readdirSync(path.join(root, "data/makes")).filter(f => f.endsWith(".js"))
  .forEach(f => load("data/makes/" + f));

const DB = ctx.window.CarCheck;
const yrs = r => `${r[0]}–${r[1] === null ? "н.ч." : r[1]}`;
const gbName = c => (DB.gearboxes[c] ? DB.gearboxes[c].name : c);
const out = [];

out.push("# Коробки передач: які на яких моделях стоять");
out.push("");
out.push("> Документ згенеровано автоматично з `data/` командою `node scripts/build-docs.js`.");
out.push("> Не редагуйте вручну — правте файли даних. Дані попередні, потребують звірки.");
out.push("");

// 1. По моделях
out.push("## По моделях");
for (const [make, models] of Object.entries(DB.makes)) {
  for (const [model, gens] of Object.entries(models)) {
    for (const g of gens) {
      out.push("");
      out.push(`### ${make} ${model} ${g.generation} (${yrs(g.years)})`);
      out.push("");
      out.push("| Двигун | Роки | Механіка | Автомат | Примітка |");
      out.push("|---|---|---|---|---|");
      for (const v of g.variants) {
        out.push(`| ${v.label} | ${yrs(v.years)} | ${v.manual.map(gbName).join(", ") || "—"} | ${v.auto.join(" / ") || "—"} | ${v.note || ""} |`);
      }
    }
  }
}

// 2. По коробках (зворотний індекс)
out.push("");
out.push("## По коробках");
for (const [code, gb] of Object.entries(DB.gearboxes)) {
  const uses = [];
  for (const [make, models] of Object.entries(DB.makes))
    for (const [model, gens] of Object.entries(models))
      for (const g of gens)
        for (const v of g.variants)
          if (v.manual.includes(code) || v.auto.includes(code))
            uses.push(`${make} ${model} ${g.generation} — ${v.label} (${yrs(v.years)})`);
  if (!uses.length) continue;
  out.push("");
  out.push(`### ${gb.name}`);
  out.push("");
  out.push(`*${gb.kind}.* ${gb.summary}`);
  out.push("");
  uses.forEach(u => out.push(`- ${u}`));
}
out.push("");

fs.mkdirSync(path.join(root, "docs"), { recursive: true });
fs.writeFileSync(path.join(root, "docs/korobky.md"), out.join("\n"));
console.log("docs/korobky.md: " + out.length + " рядків");

// ---------- data/catalog.json ----------
const catalog = [];
for (const [make, models] of Object.entries(DB.makes))
  for (const [model, gens] of Object.entries(models))
    for (const g of gens)
      for (const v of g.variants)
        catalog.push({
          make, model, generation: g.generation, engine: v.label,
          years: v.years, manual: v.manual.length > 0, auto: v.auto.length > 0
        });
fs.writeFileSync(path.join(root, "data/catalog.json"), JSON.stringify(catalog, null, 1) + "\n");
console.log("data/catalog.json: " + catalog.length + " варіантів");
