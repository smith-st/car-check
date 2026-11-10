// Nissan: моделі → покоління → варіанти (двигун + роки + коробки).
// Дані попередні, зібрані з відкритих джерел. Потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["Nissan"] = {
  "Qashqai": [
    {
      generation: "I (J10)", years: [2007, 2013],
      variants: [
        { engine: "nissan-hr16", label: "1.6 114–117 к.с.",     years: [2007, 2013], manual: ["MT5"], auto: ["REN-CVT"],
          note: "Варіатор — з 2010 р." },
        { engine: "nissan-mr20", label: "2.0 141 к.с.",         years: [2007, 2013], manual: ["MT6"], auto: ["REN-CVT"] },
        { engine: "ren-dci-1.5", label: "1.5 dCi 106–110 к.с.", years: [2007, 2013], manual: ["MT5", "MT6"], auto: [] },
        { engine: "ren-dci-1.6", label: "1.6 dCi 130 к.с.",     years: [2011, 2013], manual: ["MT6"], auto: [] },
        { engine: "nissan-m9r",  label: "2.0 dCi 150 к.с.",     years: [2007, 2013], manual: ["MT6"], auto: ["NIS-AT6"] }
      ]
    },
    {
      generation: "II (J11)", years: [2014, 2021],
      variants: [
        { engine: "ren-tce-1.2",    label: "1.2 DIG-T 115 к.с.",       years: [2014, 2018], manual: ["MT6"], auto: ["REN-CVT"] },
        { engine: "nissan-mr16ddt", label: "1.6 DIG-T 163 к.с.",       years: [2014, 2018], manual: ["MT6"], auto: [] },
        { engine: "ren-tce-1.3",    label: "1.3 DIG-T 140–160 к.с.",   years: [2018, 2021], manual: ["MT6"], auto: ["REN-EDC7"] },
        { engine: "ren-dci-1.5",    label: "1.5 dCi 110–115 к.с.",     years: [2014, 2021], manual: ["MT6"], auto: ["REN-EDC6"],
          note: "Робот DCT — з 2018 р.; до цього лише механіка." },
        { engine: "ren-dci-1.6",    label: "1.6 dCi 130 к.с.",         years: [2014, 2018], manual: ["MT6"], auto: ["REN-CVT"] },
        { engine: "ren-dci-1.6",    label: "1.7 dCi 150 к.с.",         years: [2019, 2021], manual: ["MT6"], auto: ["REN-CVT"],
          note: "1.7 dCi — розвиток мотора 1.6 dCi." }
      ]
    },
    {
      generation: "III (J12)", years: [2021, null],
      variants: [
        { engine: "ren-tce-1.3",   label: "1.3 DIG-T mHEV 140–158 к.с.", years: [2021, null], manual: ["MT6"], auto: ["REN-CVT"] },
        { engine: "nissan-epower", label: "1.5 e-Power 190 к.с.",         years: [2022, null], manual: [], auto: ["NIS-EPOWER"] }
      ]
    }
  ],
  "Juke": [
    {
      generation: "I (F15)", years: [2010, 2019],
      variants: [
        { engine: "nissan-hr16",    label: "1.6 94–117 к.с.",    years: [2010, 2019], manual: ["MT5"], auto: ["REN-CVT"] },
        { engine: "nissan-mr16ddt", label: "1.6 DIG-T 190–218 к.с.", years: [2010, 2019], manual: ["MT6"], auto: ["REN-CVT"] },
        { engine: "ren-tce-1.2",    label: "1.2 DIG-T 115 к.с.", years: [2014, 2019], manual: ["MT6"], auto: [] },
        { engine: "ren-dci-1.5",    label: "1.5 dCi 110 к.с.",   years: [2010, 2019], manual: ["MT6"], auto: [] }
      ]
    },
    {
      generation: "II (F16)", years: [2019, null],
      variants: [
        { engine: "ren-tce-small", label: "1.0 DIG-T 114 к.с.",       years: [2019, null], manual: ["MT6"], auto: ["REN-EDC7"],
          note: "Мотор HR10DDT, спільний з Renault 1.0 TCe." },
        { engine: "ren-sce",       label: "1.6 Hybrid 143 к.с.",      years: [2022, null], manual: [], auto: ["REN-ETECH"],
          note: "Гібрид на базі Renault E-Tech (атмосферний 1.6 + електромотори)." }
      ]
    }
  ],
  "X-Trail": [
    {
      generation: "III (T32)", years: [2014, 2022],
      variants: [
        { engine: "nissan-mr16ddt", label: "1.6 DIG-T 163 к.с.",     years: [2015, 2018], manual: ["MT6"], auto: [] },
        { engine: "ren-tce-1.3",    label: "1.3 DIG-T 160 к.с.",     years: [2018, 2022], manual: [], auto: ["REN-EDC7"] },
        { engine: "ren-dci-1.6",    label: "1.6 dCi 130 к.с.",       years: [2014, 2019], manual: ["MT6"], auto: ["REN-CVT"] },
        { engine: "ren-dci-1.6",    label: "1.7 dCi 150 к.с.",       years: [2019, 2022], manual: ["MT6"], auto: ["REN-CVT"] },
        { engine: "nissan-m9r",     label: "2.0 dCi 177 к.с.",       years: [2017, 2019], manual: ["MT6"], auto: ["REN-CVT"] }
      ]
    }
  ]
};
