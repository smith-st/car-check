// Dacia: моделі → покоління → варіанти (двигун + роки + коробки).
// Двигуни й коробки Renault. Дані попередні, потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["Dacia"] = {
  "Duster": [
    {
      generation: "I", years: [2010, 2017],
      variants: [
        { engine: "ren-16v",     label: "1.6 16V 105–115 к.с.",     years: [2010, 2017], manual: ["MT5", "MT6"], auto: [] },
        { engine: "ren-tce-1.2", label: "1.2 TCe 125 к.с.",         years: [2013, 2017], manual: ["MT6"], auto: [] },
        { engine: "ren-dci-1.5", label: "1.5 dCi 86–110 к.с.",      years: [2010, 2017], manual: ["MT5", "MT6"], auto: ["REN-EDC6"],
          note: "Автомат EDC — з 2016 р." }
      ]
    },
    {
      generation: "II", years: [2017, 2024],
      variants: [
        { engine: "ren-sce",       label: "1.6 SCe 115 к.с.",       years: [2017, 2019], manual: ["MT6"], auto: [] },
        { engine: "ren-tce-small", label: "1.0 TCe 90–100 к.с. (у т.ч. LPG ECO-G)", years: [2019, 2024], manual: ["MT6"], auto: [] },
        { engine: "ren-tce-1.3",   label: "1.3 TCe 130–150 к.с.",   years: [2018, 2024], manual: ["MT6"], auto: ["REN-EDC7"] },
        { engine: "ren-dci-1.5",   label: "1.5 dCi / Blue dCi 95–115 к.с.", years: [2017, 2024], manual: ["MT6"], auto: ["REN-EDC6"] }
      ]
    }
  ]
};
