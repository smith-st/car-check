// Дизелі PSA (HDi): стоять у Peugeot, Citroën, а також Ford (TDCi), Mazda (MZ-CD) і Volvo.
// Ключ — ідентифікатор, на який посилаються файли data/makes/*.js.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

Object.assign(window.CarCheck.engines, {
  "psa-dw10": {
    name: "2.0 TDCi (PSA DW10)",
    family: "PSA DW10",
    fuel: "Дизель",
    timing: "ремінь",
    summary: "Дизель PSA, що стояв у Ford, Peugeot, Citroën і Volvo. Загалом витривалий.",
    issues: [
      "Форсунки та їхні ущільнення",
      "DPF і клапан EGR при міській їзді",
      "Двомасовий маховик, турбіна"
    ]
  },
  "psa-dv6": {
    name: "1.6 HDi / TDCi / MZ-CD (PSA DV6)",
    family: "PSA DV6",
    fuel: "Дизель",
    timing: "ремінь",
    summary: "Дизель PSA, що стояв у Peugeot, Citroën, Ford і Mazda. Економний, але має відомі «болячки».",
    issues: [
      "Прогар мідних шайб форсунок → нагар і закоксування оливи",
      "Масляне голодування турбіни через забитий сітчастий фільтр її живлення",
      "Забивання DPF при міській експлуатації"
    ]
  }
});
