// Renault: моделі → покоління → варіанти (двигун + роки + коробки).
// Дані попередні, зібрані з відкритих джерел. Потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["Renault"] = {
  "Megane": [
    {
      generation: "III", years: [2008, 2016],
      variants: [
        { engine: "ren-16v",     label: "1.6 16V 100–110 к.с.",     years: [2008, 2016], manual: ["MT5"], auto: ["PSA-AL4"],
          note: "Автомат — 4-ступ. DP0 (той самий, що AL4 у Peugeot)." },
        { engine: "ren-tce-1.2", label: "1.2 TCe 115–130 к.с.",     years: [2012, 2016], manual: ["MT6"], auto: ["REN-EDC6"] },
        { engine: "ren-dci-1.5", label: "1.5 dCi 86–110 к.с.",      years: [2008, 2016], manual: ["MT5", "MT6"], auto: ["REN-EDC6"],
          note: "Автомат EDC — з 2011 р." },
        { engine: "ren-dci-1.6", label: "1.6 dCi 130 к.с.",         years: [2011, 2016], manual: ["MT6"], auto: [] }
      ]
    },
    {
      generation: "IV", years: [2016, 2023],
      variants: [
        { engine: "ren-sce",     label: "1.6 SCe 115 к.с.",         years: [2016, 2019], manual: ["MT5"], auto: [] },
        { engine: "ren-tce-1.2", label: "1.2 TCe 100–130 к.с.",     years: [2016, 2018], manual: ["MT6"], auto: ["REN-EDC7"] },
        { engine: "ren-tce-1.3", label: "1.3 TCe 115–160 к.с.",     years: [2018, 2023], manual: ["MT6"], auto: ["REN-EDC7"] },
        { engine: "ren-dci-1.5", label: "1.5 dCi / Blue dCi 90–115 к.с.", years: [2016, 2023], manual: ["MT6"], auto: ["REN-EDC6", "REN-EDC7"],
          note: "До ~2018 р. — EDC-6, далі — EDC-7." },
        { engine: "ren-dci-1.6", label: "1.6 dCi 130–165 к.с.",     years: [2016, 2019], manual: ["MT6"], auto: ["REN-EDC6"] }
      ]
    }
  ],

  "Clio": [
    {
      generation: "III", years: [2005, 2012],
      variants: [
        { engine: "ren-16v",     label: "1.2 16V 75 к.с.",          years: [2005, 2012], manual: ["MT5"], auto: [] },
        { engine: "ren-16v",     label: "1.4 / 1.6 16V 98–128 к.с.", years: [2005, 2012], manual: ["MT5"], auto: ["PSA-AL4"],
          note: "Автомат — 4-ступ. DP0 (той самий, що AL4 у Peugeot)." },
        { engine: "ren-dci-1.5", label: "1.5 dCi 68–106 к.с.",      years: [2005, 2012], manual: ["MT5", "MT6"], auto: [] }
      ]
    },
    {
      generation: "IV", years: [2012, 2019],
      variants: [
        { engine: "ren-16v",       label: "1.2 16V 73–75 к.с.",     years: [2012, 2019], manual: ["MT5"], auto: [] },
        { engine: "ren-tce-small", label: "0.9 TCe 90 к.с.",        years: [2012, 2019], manual: ["MT5"], auto: [] },
        { engine: "ren-tce-1.2",   label: "1.2 TCe 118–120 к.с.",   years: [2013, 2019], manual: [], auto: ["REN-EDC6"] },
        { engine: "ren-dci-1.5",   label: "1.5 dCi 75–110 к.с.",    years: [2012, 2019], manual: ["MT5", "MT6"], auto: ["REN-EDC6"] }
      ]
    },
    {
      generation: "V", years: [2019, null],
      variants: [
        { engine: "ren-sce",       label: "1.0 SCe 65–75 к.с.",     years: [2019, 2023], manual: ["MT5"], auto: [] },
        { engine: "ren-tce-small", label: "1.0 TCe 90–100 к.с.",    years: [2019, null], manual: ["MT5", "MT6"], auto: ["REN-CVT"] },
        { engine: "ren-tce-1.3",   label: "1.3 TCe 130–140 к.с.",   years: [2019, 2021], manual: [], auto: ["REN-EDC7"] },
        { engine: "ren-sce",       label: "E-Tech Hybrid 1.6 140–145 к.с.", years: [2020, null], manual: [], auto: ["REN-ETECH"],
          note: "Повний гібрид на основі атмосферного 1.6." },
        { engine: "ren-dci-1.5",   label: "1.5 Blue dCi 85–115 к.с.", years: [2019, 2022], manual: ["MT6"], auto: [] }
      ]
    }
  ]
};
