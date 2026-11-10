// Peugeot: моделі → покоління → варіанти (двигун + роки + коробки).
// Двигуни й коробки PSA. Дані попередні, потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["Peugeot"] = {
  "308": [
    {
      generation: "I (T7)", years: [2007, 2013],
      variants: [
        { engine: "psa-thp",  label: "1.4 VTi 95–98 к.с.",          years: [2008, 2013], manual: ["MT5"], auto: [] },
        { engine: "psa-thp",  label: "1.6 VTi 120 к.с.",            years: [2007, 2013], manual: ["MT5"], auto: ["PSA-AL4"] },
        { engine: "psa-thp",  label: "1.6 THP 150–200 к.с.",        years: [2007, 2013], manual: ["MT6"], auto: ["PSA-EAT6"],
          note: "Автомат — 6-ступ. Aisin (AM6), попередник EAT6." },
        { engine: "psa-dv6",  label: "1.6 HDi 90–112 к.с.",         years: [2007, 2013], manual: ["MT5", "MT6"], auto: ["PSA-ETG"],
          note: "Робот ETG6 — з 2010 р." },
        { engine: "psa-dw10", label: "2.0 HDi 136–163 к.с.",        years: [2007, 2013], manual: ["MT6"], auto: ["PSA-EAT6"] }
      ]
    },
    {
      generation: "II (T9)", years: [2013, 2021],
      variants: [
        { engine: "psa-puretech", label: "1.2 PureTech 82 к.с. (атмосферний)", years: [2014, 2021], manual: ["MT5"], auto: [],
          note: "Атмосферна версія має ланцюг ГРМ — значно надійніша за турбоверсії." },
        { engine: "psa-puretech", label: "1.2 PureTech 110–130 к.с.", years: [2014, 2021], manual: ["MT5", "MT6"], auto: ["PSA-EAT6", "PSA-EAT8"],
          note: "Автомат: до ~2019 р. — EAT6, далі — EAT8." },
        { engine: "psa-thp",  label: "1.6 THP 125–270 к.с.",        years: [2013, 2019], manual: ["MT6"], auto: ["PSA-EAT6"] },
        { engine: "psa-dv6",  label: "1.6 BlueHDi 100–120 к.с.",    years: [2013, 2018], manual: ["MT5", "MT6"], auto: ["PSA-EAT6"] },
        { engine: "psa-dv5",  label: "1.5 BlueHDi 100–130 к.с.",    years: [2018, 2021], manual: ["MT6"], auto: ["PSA-EAT8"] },
        { engine: "psa-dw10", label: "2.0 BlueHDi 150–180 к.с.",    years: [2013, 2021], manual: ["MT6"], auto: ["PSA-EAT6", "PSA-EAT8"],
          note: "Автомат: до ~2017 р. — EAT6, далі — EAT8." }
      ]
    },
    {
      generation: "III (P5)", years: [2021, null],
      variants: [
        { engine: "psa-puretech", label: "1.2 PureTech 110–130 к.с.", years: [2021, null], manual: ["MT6"], auto: ["PSA-EAT8"] },
        { engine: "psa-dv5",      label: "1.5 BlueHDi 130 к.с.",      years: [2021, null], manual: ["MT6"], auto: ["PSA-EAT8"] },
        { engine: "psa-phev",     label: "Hybrid 1.6 180–225 к.с. (PHEV)", years: [2021, null], manual: [], auto: ["PSA-EEAT8"] }
      ]
    }
  ],

  "3008": [
    {
      generation: "I", years: [2009, 2016],
      variants: [
        { engine: "psa-thp",  label: "1.6 VTi 120 к.с.",            years: [2009, 2016], manual: ["MT5"], auto: [] },
        { engine: "psa-thp",  label: "1.6 THP 150–165 к.с.",        years: [2009, 2016], manual: ["MT6"], auto: ["PSA-EAT6"] },
        { engine: "psa-dv6",  label: "1.6 HDi / e-HDi 110–115 к.с.", years: [2009, 2016], manual: ["MT6"], auto: ["PSA-ETG"] },
        { engine: "psa-dw10", label: "2.0 HDi 150–163 к.с.",        years: [2009, 2016], manual: ["MT6"], auto: ["PSA-EAT6"] }
      ]
    },
    {
      generation: "II", years: [2016, 2023],
      variants: [
        { engine: "psa-puretech", label: "1.2 PureTech 130 к.с.",     years: [2016, 2023], manual: ["MT6"], auto: ["PSA-EAT6", "PSA-EAT8"],
          note: "Автомат: до ~2019 р. — EAT6, далі — EAT8." },
        { engine: "psa-thp",  label: "1.6 THP 165–180 к.с.",        years: [2016, 2020], manual: [], auto: ["PSA-EAT6", "PSA-EAT8"] },
        { engine: "psa-dv6",  label: "1.6 BlueHDi 100–120 к.с.",    years: [2016, 2018], manual: ["MT6"], auto: ["PSA-EAT6"] },
        { engine: "psa-dv5",  label: "1.5 BlueHDi 130 к.с.",        years: [2018, 2023], manual: ["MT6"], auto: ["PSA-EAT8"] },
        { engine: "psa-dw10", label: "2.0 BlueHDi 150–180 к.с.",    years: [2016, 2023], manual: ["MT6"], auto: ["PSA-EAT6", "PSA-EAT8"] },
        { engine: "psa-phev", label: "Hybrid / Hybrid4 225–300 к.с. (PHEV)", years: [2020, 2023], manual: [], auto: ["PSA-EEAT8"] }
      ]
    }
  ]
};
