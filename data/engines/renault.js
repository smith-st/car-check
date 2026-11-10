// Двигуни Renault (стоять також у Dacia й частково Nissan): 16V/SCe, TCe, dCi.
// Ключ — ідентифікатор, на який посилаються файли data/makes/*.js.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

Object.assign(window.CarCheck.engines, {
  "ren-16v": {
    name: "1.2 / 1.4 / 1.6 16V (D4F, K4J, K4M)",
    family: "Renault D / K",
    fuel: "Бензин",
    timing: "ремінь",
    summary: "Прості атмосферні мотори Clio, Megane й Duster. Невибагливі, добре переносять ГБО.",
    issues: ["Регламентна заміна ременя ГРМ (обрив гне клапани)", "Котушки запалювання", "Течі оливи, витрата на великих пробігах"]
  },
  "ren-sce": {
    name: "1.0 / 1.6 SCe (H4D, H4M)",
    family: "Renault-Nissan H",
    fuel: "Бензин",
    timing: "ланцюг",
    summary: "Новіші атмосферні мотори Clio V, Megane IV і Duster II. Прості й економні.",
    issues: ["1.0 (3 циліндри): вібрації, слабка динаміка", "Мало системних проблем"]
  },
  "ren-tce-small": {
    name: "0.9 / 1.0 TCe (H4Bt, H4Dt)",
    family: "Renault-Nissan H",
    fuel: "Бензин, турбо",
    timing: "ланцюг",
    summary: "3-циліндрові турбомотори Clio, Captur і Duster. Економні; часто з заводським ГБО (ECO-G).",
    issues: ["Витрата оливи на частині моторів", "Вібрації на холостих", "Турбіна при поганому обслуговуванні"]
  },
  "ren-tce-1.2": {
    name: "1.2 TCe (H5Ft)",
    family: "Renault-Nissan H",
    fuel: "Бензин, турбо (безпосередній вприск)",
    timing: "ланцюг",
    summary: "Турбомотор 2012–2018 рр. (Megane, Clio, Duster, Qashqai 1.2 DIG-T). Відомий великою витратою оливи; один з найпроблемніших моторів Renault.",
    issues: [
      "Велика витрата оливи (кільця) → нагар, руйнування мотора; частину лікували перепрошивкою й ремонтом за гарантією",
      "Розтягнення ланцюга ГРМ",
      "Нагар на клапанах"
    ]
  },
  "ren-tce-1.3": {
    name: "1.3 TCe (H5H, спільний з Mercedes)",
    family: "Renault-Nissan-Daimler",
    fuel: "Бензин, турбо (безпосередній вприск)",
    timing: "ланцюг",
    summary: "Турбомотор з 2017–2018 рр. (Megane IV, Clio V, Duster II, Qashqai J11/J12, Mercedes A/B). Помітно надійніший за 1.2 TCe.",
    issues: ["Ранні мотори: витрата оливи, пропуски запалювання (оновлення ПЗ)", "Сажовий фільтр GPF у новіших версіях"]
  },
  "ren-dci-1.5": {
    name: "1.5 dCi / Blue dCi (K9K)",
    family: "Renault K9K",
    fuel: "Дизель (Common Rail)",
    timing: "ремінь",
    summary: "Найпоширеніший дизель Renault, Dacia й Nissan. Дуже економний; живе довго при хорошій оливі.",
    issues: [
      "Провертання шатунних вкладишів (особливо до ~2010 р. і при рідкій заміні оливи)",
      "Форсунки (Delphi/Continental), паливний насос",
      "DPF, клапан EGR, двомасовий маховик"
    ]
  },
  "ren-dci-1.6": {
    name: "1.6 dCi (R9M)",
    family: "Renault R9M",
    fuel: "Дизель (Common Rail)",
    timing: "ланцюг",
    summary: "Дизель Megane, Qashqai й X-Trail 2011–2018 рр. Тяговий і економний.",
    issues: ["DPF і клапан EGR при міській їзді", "Турбіна, двомасовий маховик", "Датчики й клапани системи вихлопу"]
  }
});
