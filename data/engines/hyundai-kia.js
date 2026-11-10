// Двигуни Hyundai і Kia (спільні для обох марок): Gamma, Kappa, Nu, Smartstream, CRDi, гібриди.
// Ключ — ідентифікатор, на який посилаються файли data/makes/*.js.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

Object.assign(window.CarCheck.engines, {
  "hk-mpi": {
    name: "1.4 / 1.6 MPI (Gamma, Kappa)",
    family: "Hyundai Gamma / Kappa",
    fuel: "Бензин",
    timing: "ланцюг",
    summary: "Прості атмосферні мотори i30, Ceed і Tucson. Загалом надійні, підходять під ГБО.",
    issues: [
      "Витрата оливи на великих пробігах",
      "Задири циліндрів через крихту зруйнованого каталізатора (при перегріві або пропусках запалювання)",
      "Розтягнення ланцюга ГРМ після 150–200 тис. км"
    ]
  },
  "hk-gdi": {
    name: "1.6 GDI (Gamma)",
    family: "Hyundai Gamma",
    fuel: "Бензин (безпосередній вприск)",
    timing: "ланцюг",
    summary: "Атмосферний мотор з безпосереднім вприском 2011–2019 рр. Економніший за MPI, але примхливіший.",
    issues: ["Нагар на впускних клапанах", "Витрата оливи, задири циліндрів", "Стук паливного насоса високого тиску"]
  },
  "hk-tgdi-small": {
    name: "1.0 / 1.4 T-GDI (Kappa)",
    family: "Hyundai Kappa",
    fuel: "Бензин, турбо (безпосередній вприск)",
    timing: "ланцюг",
    summary: "Невеликі турбомотори i30, Ceed, i20 з 2015 р. Економні; великих системних проблем не відомо.",
    issues: ["Нагар на впускних клапанах", "1.0 (3 циліндри): вібрації на холостих", "Чутливість до якості оливи"]
  },
  "hk-tgdi-1.6": {
    name: "1.6 T-GDI (Gamma II)",
    family: "Hyundai Gamma II",
    fuel: "Бензин, турбо (безпосередній вприск)",
    timing: "ланцюг",
    summary: "Потужний турбомотор Tucson, Sportage, i30 Turbo / Ceed GT (2015–2020). Динамічний.",
    issues: ["Нагар на впускних клапанах", "Розрідження оливи паливом при коротких поїздках", "Знос турбіни на великих пробігах"]
  },
  "hk-smartstream": {
    name: "1.5 / 1.6 T-GDI Smartstream",
    family: "Hyundai Smartstream",
    fuel: "Бензин, турбо (часто з мілд-гібридом 48 В)",
    timing: "ланцюг",
    summary: "Нове покоління турбомоторів з 2020 р. (i30, Ceed, Tucson NX4, Sportage NQ5). Статистики поки небагато.",
    issues: ["Мало статистики на великих пробігах", "Мілд-гібрид: акумулятор і стартер-генератор 48 В"]
  },
  "hk-nu": {
    name: "2.0 MPI / GDI (Nu)",
    family: "Hyundai Nu",
    fuel: "Бензин",
    timing: "ланцюг",
    summary: "2-літровий атмосферний мотор ix35, Tucson і Sportage. Простий, але з відомими проблемами.",
    issues: ["Задири циліндрів і витрата оливи", "Стук поршнів на холодну", "Нагар (версія GDI)"]
  },
  "hk-crdi-small": {
    name: "1.4 / 1.6 / 1.7 CRDi (U-line)",
    family: "Hyundai U",
    fuel: "Дизель (Common Rail)",
    timing: "ланцюг",
    summary: "Дизелі i30, Ceed, Tucson і Sportage. Економні й загалом витривалі.",
    issues: ["Забивання DPF при міській їзді", "Форсунки", "Двомасовий маховик"]
  },
  "hk-crdi-2.0": {
    name: "2.0 / 2.2 CRDi (R-line)",
    family: "Hyundai R",
    fuel: "Дизель (Common Rail)",
    timing: "ланцюг",
    summary: "Потужні дизелі ix35/Tucson і Sportage. Тягові, але потребують уваги.",
    issues: ["Форсунки й паливний насос", "DPF і клапан EGR", "Розтягнення ланцюга ГРМ на великих пробігах"]
  },
  "hk-hybrid": {
    name: "1.6 T-GDI Hybrid / Plug-in Hybrid",
    family: "Hyundai Smartstream",
    fuel: "Бензин + електро (повний або плагін-гібрид)",
    timing: "ланцюг",
    summary: "Гібриди Tucson NX4 і Sportage NQ5 (з 2021 р.). Технологія нова; статистики поки мало.",
    issues: ["Стан високовольтної батареї", "Помилки гібридної системи", "Мало статистики на великих пробігах"]
  }
});
