// Двигуни Opel (GM): Ecotec, Turbo, CDTI. Нові Astra L і Corsa F мають двигуни PSA — див. psa.js.
// Ключ — ідентифікатор, на який посилаються файли data/makes/*.js.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

Object.assign(window.CarCheck.engines, {
  "opel-ecotec": {
    name: "1.0 / 1.2 / 1.4 / 1.6 / 1.8 Ecotec (атмосферні)",
    family: "GM Family 0 / Family 1",
    fuel: "Бензин",
    timing: "ремінь (1.0 / 1.2 у Corsa — ланцюг)",
    summary: "Прості атмосферні мотори Astra, Corsa й Insignia. Недорогі в ремонті, добре переносять ГБО.",
    issues: [
      "Течі оливи з-під кришки клапанів і корпусу термостата",
      "Відмова клапанів зміни фаз (VVT), брязкіт на холодну",
      "1.8: модуль запалювання; 1.0/1.2 у Corsa: розтягнення ланцюга"
    ]
  },
  "opel-1.4-turbo": {
    name: "1.4 Turbo (A14NET, B14NET)",
    family: "GM Family 0",
    fuel: "Бензин, турбо",
    timing: "ланцюг",
    summary: "Основний турбомотор Astra J/K, Insignia й Mokka 2010–2019 рр. Динамічний, але чутливий до обслуговування.",
    issues: [
      "Відмова клапана вентиляції картера (PCV) у кришці клапанів → витрата оливи, свист",
      "Розтягнення ланцюга ГРМ",
      "Течі охолоджувальної рідини з турбіни й корпусу термостата"
    ]
  },
  "opel-1.6-turbo": {
    name: "1.6 Turbo (A16LET, A16XHT)",
    family: "GM Family 1",
    fuel: "Бензин, турбо",
    timing: "ремінь (A16LET) / ланцюг (A16XHT SIDI)",
    summary: "Потужний турбомотор Astra J/K та Insignia. Швидкий, але має відомі проблеми.",
    issues: [
      "A16LET: тріщини поршнів, витрата оливи",
      "Течі антифризу, перегрів",
      "Знос турбіни на великих пробігах"
    ]
  },
  "opel-2.0-turbo": {
    name: "2.0 Turbo (Z20LEH, A20NHT, LTG)",
    family: "GM Ecotec / LNF",
    fuel: "Бензин, турбо",
    timing: "ланцюг",
    summary: "Потужний турбомотор Astra OPC та Insignia. Швидкий, але навантажений; часто після тюнінгу.",
    issues: [
      "Розтягнення ланцюга ГРМ і натягувача",
      "Знос турбіни, течі оливи й антифризу",
      "Ризик жорсткої експлуатації й чіп-тюнінгу"
    ]
  },
  "opel-sge-turbo": {
    name: "1.0 / 1.2 / 1.4 Turbo (B10XFT, B14XFT, F12SHT, F14SHT)",
    family: "GM Small Gasoline Engine",
    fuel: "Бензин, турбо (безпосередній вприск)",
    timing: "ремінь",
    summary: "Новіші невеликі турбомотори Astra K і Corsa E (2015–2021). Економні; статистики менше, ніж у старих моторів.",
    issues: [
      "Нагар на впускних клапанах (безпосередній вприск)",
      "Течі оливи й антифризу",
      "1.0 (3 циліндри): вібрації на холостих"
    ]
  },
  "opel-1.3-cdti": {
    name: "1.3 CDTI (Fiat Multijet)",
    family: "Fiat SDE",
    fuel: "Дизель (Common Rail)",
    timing: "ланцюг",
    summary: "Маленький дизель Fiat у Corsa й Astra. Економний, але не любить міських поїздок.",
    issues: ["Розтягнення ланцюга ГРМ", "Забивання DPF і клапана EGR", "Форсунки, оливний насос"]
  },
  "opel-1.7-cdti": {
    name: "1.7 CDTI (Isuzu)",
    family: "Isuzu Circle L",
    fuel: "Дизель (Common Rail)",
    timing: "ремінь",
    summary: "Дизель Isuzu в Astra H/J і Corsa D. Витривалий, але має свої слабкі місця.",
    issues: ["Форсунки й насос паливного тиску", "Двомасовий маховик, турбіна", "Клапан EGR, DPF у новіших версіях"]
  },
  "opel-1.9-cdti": {
    name: "1.9 CDTI (Fiat JTD)",
    family: "Fiat JTD",
    fuel: "Дизель (Common Rail)",
    timing: "ремінь",
    summary: "Дизель Fiat в Astra H, Vectra й Zafira. Сильний, але зі знаменитими «болячками».",
    issues: [
      "Вихровi заслінки впускного колектора (можуть зламатися й потрапити в циліндр)",
      "Клапан EGR, DPF",
      "Двомасовий маховик, течі з радіатора EGR"
    ]
  },
  "opel-2.0-cdti": {
    name: "2.0 CDTI (A20DTH, B20DTH)",
    family: "GM Family B",
    fuel: "Дизель (Common Rail)",
    timing: "ланцюг",
    summary: "Основний дизель Insignia A/B і Astra J. Потужний, але потребує уважного обслуговування.",
    issues: [
      "Двомасовий маховик і зчеплення",
      "Натягувач ланцюга ГРМ, течі оливи",
      "DPF, клапан і радіатор EGR, турбіна"
    ]
  },
  "opel-1.6-cdti": {
    name: "1.6 CDTI «Whisper» (B16DTH, B16DTL)",
    family: "GM Family B Medium",
    fuel: "Дизель (Common Rail)",
    timing: "ланцюг",
    summary: "Тихий сучасний дизель Astra J/K та Insignia B (2013–2019). Загалом надійний.",
    issues: ["DPF при міській експлуатації", "Система AdBlue (SCR) у новіших версіях", "Двомасовий маховик"]
  },
  "opel-1.5-diesel": {
    name: "1.5 Diesel (D15DT, 3 цил.)",
    family: "GM",
    fuel: "Дизель (Common Rail)",
    timing: "ремінь",
    summary: "3-циліндровий дизель Astra K після рестайлінгу (2019–2021). Економний; статистики мало.",
    issues: ["DPF і AdBlue при міській експлуатації", "Вібрації (3 циліндри)", "Мало статистики на великих пробігах"]
  }
});
