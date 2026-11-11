// VIN: перевірка формату, розшифровка без зовнішніх сервісів і звірка з оголошенням.
//
//   normalizeVin(s)        → "WVWZZZ1KZ8W123456" або null
//   findVinInText(text)    → VIN, знайдений в описі продавця, або null
//   decodeVin(vin)         → { wmi, maker, country, region, year_candidates, check_digit, … }
//   compareVin(dec, specs) → список розбіжностей з оголошенням (марка, рік)
//
// Модельний рік (10-й символ) надійний лише для авто з Північної Америки, Кореї та груп VW, де він
// записується завжди. Решта європейських виробників часто ставлять туди довільний символ — тоді рік не беремо.

const VALID = /^[A-HJ-NPR-Z0-9]{17}$/;

export function normalizeVin(s) {
  const v = String(s || "").toUpperCase().replace(/[\s-]/g, "");
  return VALID.test(v) && /\d/.test(v) && /[A-Z]/.test(v) ? v : null;
}

// VIN в описі: 17 символів поспіль, переважно поруч зі словом «VIN»
export function findVinInText(text) {
  const t = String(text || "").toUpperCase();
  const all = [...t.matchAll(/(?:^|[^A-Z0-9])([A-HJ-NPR-Z0-9]{17})(?=$|[^A-Z0-9])/g)].map(m => m[1]).filter(normalizeVin);
  if (!all.length) return null;
  const near = all.find(v => { const i = t.indexOf(v); return /VIN|NADWOZI/.test(t.slice(Math.max(0, i - 30), i)); });
  return near || all[0];
}

// Виробник за WMI (перші 3 символи). Лише марки, що трапляються на ринку вживаних авто в Польщі.
const WMI = {
  WVW: "Volkswagen", WV1: "Volkswagen", WV2: "Volkswagen", WV3: "Volkswagen", "1VW": "Volkswagen", "3VW": "Volkswagen", "9BW": "Volkswagen",
  TMB: "Škoda", VSS: "Seat", WAU: "Audi", WA1: "Audi", WUA: "Audi", TRU: "Audi",
  JMZ: "Mazda", JM1: "Mazda", JM3: "Mazda", "3MZ": "Mazda", "3MV": "Mazda",
  SB1: "Toyota", NMT: "Toyota", VNK: "Toyota", JTD: "Toyota", JTN: "Toyota", JTE: "Toyota", JTM: "Toyota", JTK: "Toyota", JT2: "Toyota",
  "2T1": "Toyota", "2T3": "Toyota", "4T1": "Toyota", "4T3": "Toyota", "5TD": "Toyota", "5YF": "Toyota",
  WF0: "Ford", WF1: "Ford", NM0: "Ford", SFA: "Ford", VS6: "Ford", "1FA": "Ford", "1FM": "Ford", "3FA": "Ford", "3FM": "Ford",
  W0L: "Opel", W0V: "Opel", VXK: "Opel",
  VF3: "Peugeot", VR3: "Peugeot", VF7: "Citroën", VR7: "Citroën",
  VF1: "Renault", UU1: "Dacia",
  KMH: "Hyundai", TMA: "Hyundai", NLH: "Hyundai", "5NP": "Hyundai", "5NM": "Hyundai", KM8: "Hyundai",
  KNA: "Kia", KNE: "Kia", U5Y: "Kia", U6Y: "Kia", "5XY": "Kia", "3KP": "Kia", KND: "Kia",
  SJN: "Nissan", JN1: "Nissan", JN8: "Nissan", VSK: "Nissan", "1N4": "Nissan", "3N1": "Nissan", "5N1": "Nissan",
  WBA: "BMW", WBS: "BMW", WBY: "BMW", WBX: "BMW", "5UX": "BMW", "5YM": "BMW",
  WDD: "Mercedes-Benz", WDB: "Mercedes-Benz", WDC: "Mercedes-Benz", W1K: "Mercedes-Benz", W1N: "Mercedes-Benz", W1V: "Mercedes-Benz",
  "4JG": "Mercedes-Benz", "55S": "Mercedes-Benz", W1W: "Mercedes-Benz",
  VF9: "Peugeot", ZFA: "Fiat", ZAR: "Alfa Romeo", YV1: "Volvo", YV4: "Volvo", SAL: "Land Rover", SAJ: "Jaguar",
  JHM: "Honda", "1HG": "Honda", "2HG": "Honda", "5FN": "Honda", "5J6": "Honda", SHH: "Honda", JMB: "Mitsubishi", JS3: "Suzuki", TSM: "Suzuki", JF1: "Subaru", "5YJ": "Tesla", LRW: "Tesla", XP7: "Tesla"
};

function country(v) {
  const a = v[0], b = v[1];
  if ("145".includes(a)) return ["США", "na"];
  if (a === "2") return ["Канада", "na"];
  if (a === "3") return ["Мексика", "na"];
  if (a === "9") return ["Бразилія", "other"];
  if (a === "J") return ["Японія", "asia"];
  if (a === "K") return ["Південна Корея", "asia"];
  if (a === "L") return ["Китай", "asia"];
  if (a === "W") return ["Німеччина", "eu"];
  if (a === "V") return [b <= "R" ? "Франція" : "Іспанія", "eu"];
  if (a === "Z") return ["Італія", "eu"];
  if (a === "S") return [b <= "M" ? "Велика Британія" : "Європа", "eu"];
  if (a === "T") return [b <= "H" ? "Швейцарія" : b <= "P" ? "Чехія" : "Угорщина", "eu"];
  if (a === "U") return [b <= "M" ? "Румунія" : "Словаччина", "eu"];
  if (a === "Y") return [b <= "E" ? "Бельгія" : b <= "K" ? "Фінляндія" : "Швеція", "eu"];
  if (a === "N") return [b <= "R" ? "Туреччина" : "Інше", "other"];
  if (a === "X") return ["Росія / Нідерланди / інше", "other"];
  return ["Інше", "other"];
}

// Контрольна цифра (9-й символ): обов'язкова в Північній Америці, в Європі — ні
const TRANS = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9, S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9 };
const WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
function checkDigitOk(v) {
  let sum = 0;
  for (let i = 0; i < 17; i++) sum += (/\d/.test(v[i]) ? Number(v[i]) : TRANS[v[i]]) * WEIGHTS[i];
  const r = sum % 11;
  return v[8] === (r === 10 ? "X" : String(r));
}

const YEAR_CODES = "ABCDEFGHJKLMNPRSTVWXY123456789"; // 1980/2010 … 2009/2039
function yearCandidates(code) {
  const i = YEAR_CODES.indexOf(code);
  if (i < 0) return [];
  const now = new Date().getFullYear();
  return [1980 + i, 2010 + i].filter(y => y <= now + 1);
}

const VW_GROUP = new Set(["Volkswagen", "Škoda", "Seat", "Audi"]);

export function decodeVin(v) {
  const wmi = v.slice(0, 3);
  const maker = WMI[wmi] || null;
  const [ctry, region] = country(v);
  const cd = checkDigitOk(v);
  // Рік — лише там, де 10-й символ справді означає модельний рік
  const yearReliable = region === "na" || v[0] === "K" || ["TMA", "NLH", "U5Y", "U6Y"].includes(wmi) || VW_GROUP.has(maker);
  let years = yearReliable ? yearCandidates(v[9]) : [];
  // У Північній Америці з 2010 р.: літера на 7-й позиції → цикл 2010+, цифра → 1980–2009
  if (region === "na" && years.length === 2) years = /[A-Z]/.test(v[6]) ? [years[1]] : [years[0]];
  // Вживані авто 1980-х у нас не трапляються — з двох варіантів лишаємо новіший
  if (years.length === 2 && years[0] < 1995) years = [years[1]];
  return {
    vin: v, wmi, maker, country: ctry, region,
    north_america: region === "na",
    check_digit_ok: cd,
    // Для Північної Америки неправильна контрольна цифра означає помилку у VIN або підробку
    check_digit_problem: region === "na" && !cd,
    year_candidates: years,
    serial: v.slice(11)
  };
}

const norm = s => {
  const n = String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z]/g, "");
  return { vw: "volkswagen", mercedes: "mercedesbenz", benz: "mercedesbenz", ds: "citroen" }[n] || n;
};
const sameMaker = (a, b) => { a = norm(a); b = norm(b); return a === b || a.startsWith(b) || b.startsWith(a); };

// Розбіжності між VIN і оголошенням
export function compareVin(d, listing) {
  const out = [];
  const make = listing && listing.make, year = listing && Number(listing.year);
  if (d.maker && make && !sameMaker(d.maker, make)) {
    out.push(`Виробник за VIN — ${d.maker}, а в оголошенні — ${make}.`);
  }
  // Модельний рік може бути на рік більший за рік випуску (авто, випущене восени)
  if (year && d.year_candidates.length && !d.year_candidates.some(y => y === year || y === year + 1)) {
    out.push(`Модельний рік за VIN — ${d.year_candidates.join(" або ")}, а в оголошенні — ${year}.`);
  }
  if (d.check_digit_problem) out.push("Контрольна цифра VIN не сходиться — можлива помилка в номері або підробка.");
  return out;
}

// Короткий опис для Claude
export function vinForPrompt(d, mismatches) {
  return [
    `VIN: ${d.vin}`,
    `Виробник за WMI (${d.wmi}): ${d.maker || "невідомо"}; країна складання: ${d.country}.`,
    d.north_america ? "Авто зроблене для ринку Північної Америки (США/Канада/Мексика) — майже напевно пригнане звідти." : "",
    d.year_candidates.length ? `Модельний рік за VIN: ${d.year_candidates.join(" або ")}.` : "Модельний рік у VIN цього виробника не кодується.",
    mismatches.length ? `Розбіжності з оголошенням: ${mismatches.join(" ")}` : "Явних розбіжностей VIN з оголошенням (марка, рік) немає."
  ].filter(Boolean).join("\n");
}
