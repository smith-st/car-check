// Тип кузова для ілюстрації на сторінці авто (лише картинка, на звіт не впливає).
// Моделі, яких тут немає, показуються як хетчбек.
(function () {
  const BODY = {
    sedan: ["A4", "A6", "3 Series", "5 Series", "C-Class", "E-Class", "Passat", "Superb", "Insignia", "6", "Octavia"],
    suv:   ["X3", "Duster", "Tucson", "ix35", "Sportage", "CX-5", "CX-30", "Qashqai", "Juke", "X-Trail", "3008", "Kodiaq", "Karoq", "RAV4", "Tiguan"],
    mpv:   ["Touran"]
  };
  const map = {};
  Object.entries(BODY).forEach(([type, models]) => models.forEach(m => { map[m] = type; }));
  window.CarCheckBody = model => map[model] || "hatch";
})();
