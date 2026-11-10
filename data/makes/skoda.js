// Škoda: моделі → покоління → варіанти (двигун + роки + коробки).
//
// Формат варіанта:
//   engine  — ключ з data/engines.js
//   label   — як показувати у списку
//   years   — [з якого, по який]; null = випускається досі
//   manual  — коди механічних коробок з data/gearboxes.js
//   auto    — коди автоматів; якщо кодів кілька, сайт покаже всі й підкаже, як перевірити
//   note    — необов'язкове уточнення
//
// Дані попередні, зібрані з відкритих джерел. Потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["Škoda"] = {
  "Octavia": [
    {
      generation: "II (1Z)", years: [2004, 2013],
      variants: [
        { engine: "1.4-mpi",       label: "1.4 MPI 80 к.с.",        years: [2004, 2010], manual: ["MT5"], auto: [] },
        { engine: "1.6-mpi",       label: "1.6 MPI 102 к.с.",       years: [2004, 2013], manual: ["MT5"], auto: ["09G"] },
        { engine: "1.6-fsi",       label: "1.6 FSI 115 к.с.",       years: [2004, 2008], manual: ["MT5"], auto: ["09G"] },
        { engine: "2.0-fsi",       label: "2.0 FSI 150 к.с.",       years: [2004, 2008], manual: ["MT6"], auto: ["09G"] },
        { engine: "1.2-tsi-ea111", label: "1.2 TSI 105 к.с.",       years: [2010, 2013], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.4-tsi-ea111", label: "1.4 TSI 122 к.с.",       years: [2008, 2013], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.8-tsi",       label: "1.8 TSI 160 к.с.",       years: [2008, 2013], manual: ["MT6"], auto: ["09G", "DQ200"],
          note: "До рестайлінгу (2008–2009) — 6-ступ. автомат 09G, після рестайлінгу (2009+) — DSG-7 DQ200." },
        { engine: "2.0-tsi",       label: "RS 2.0 TFSI 200 к.с.",   years: [2005, 2013], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "1.9-tdi",       label: "1.9 TDI 105 к.с.",       years: [2004, 2010], manual: ["MT5"], auto: ["DQ250"] },
        { engine: "2.0-tdi-pd",    label: "2.0 TDI PD 140 к.с.",    years: [2004, 2008], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "2.0-tdi-pd",    label: "RS 2.0 TDI PD 170 к.с.", years: [2006, 2008], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "2.0-tdi-cr",    label: "2.0 TDI CR 140 к.с.",    years: [2009, 2013], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "2.0-tdi-cr",    label: "RS 2.0 TDI CR 170 к.с.", years: [2009, 2013], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "1.6-tdi-cr",    label: "1.6 TDI 105 к.с.",       years: [2009, 2013], manual: ["MT5"], auto: ["DQ200"] }
      ]
    },
    {
      generation: "III (5E)", years: [2013, 2020],
      variants: [
        { engine: "1.2-tsi-ea211", label: "1.2 TSI 105–110 к.с.",   years: [2013, 2017], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.0-tsi",       label: "1.0 TSI 115 к.с.",       years: [2017, 2020], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.4-tsi-ea211", label: "1.4 TSI 140–150 к.с.",   years: [2013, 2018], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.5-tsi",       label: "1.5 TSI 150 к.с.",       years: [2018, 2020], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.8-tsi",       label: "1.8 TSI 180 к.с.",       years: [2013, 2020], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "2.0-tsi",       label: "RS 2.0 TSI 220–245 к.с.", years: [2013, 2020], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "1.6-tdi-cr",    label: "1.6 TDI 90–115 к.с.",    years: [2013, 2020], manual: ["MT5"], auto: ["DQ200"] },
        { engine: "2.0-tdi-ea288", label: "2.0 TDI 150 к.с.",       years: [2013, 2020], manual: ["MT6"], auto: ["DQ250", "DQ381"],
          note: "Здебільшого DQ250; на частині авто останніх років випуску може стояти DQ381." },
        { engine: "2.0-tdi-ea288", label: "RS 2.0 TDI 184 к.с.",    years: [2013, 2020], manual: ["MT6"], auto: ["DQ250"] }
      ]
    },
    {
      generation: "IV (NX)", years: [2020, null],
      variants: [
        { engine: "1.0-tsi",       label: "1.0 TSI 110 к.с.",       years: [2020, 2024], manual: ["MT6"], auto: ["DQ200"],
          note: "Автомат — лише у версії e-TEC (мілд-гібрид)." },
        { engine: "1.5-tsi",       label: "1.5 TSI 115 к.с.",       years: [2024, null], manual: ["MT6"], auto: [] },
        { engine: "1.5-tsi",       label: "1.5 TSI 150 к.с.",       years: [2020, null], manual: ["MT6"], auto: ["DQ200"],
          note: "Автомат — у версії e-TEC (мілд-гібрид)." },
        { engine: "2.0-tsi",       label: "2.0 TSI 190 к.с. 4x4",   years: [2020, 2024], manual: [], auto: ["DQ381"] },
        { engine: "2.0-tsi",       label: "RS 2.0 TSI 245–265 к.с.", years: [2020, null], manual: ["MT6"], auto: ["DQ381"] },
        { engine: "1.4-tsi-phev",  label: "1.4 TSI iV 204–245 к.с. (PHEV)", years: [2020, 2023], manual: [], auto: ["DQ400E"] },
        { engine: "2.0-tdi-ea288", label: "2.0 TDI 115–116 к.с.",   years: [2020, null], manual: ["MT6"], auto: ["DQ381"] },
        { engine: "2.0-tdi-ea288", label: "2.0 TDI 150 к.с.",       years: [2020, null], manual: ["MT6"], auto: ["DQ381"] },
        { engine: "2.0-tdi-ea288", label: "RS 2.0 TDI 200 к.с.",    years: [2020, null], manual: [], auto: ["DQ381"] }
      ]
    }
  ],

  "Scala": [
    {
      generation: "I (NW)", years: [2019, null],
      variants: [
        { engine: "1.0-tsi",    label: "1.0 TSI 95 к.с.",        years: [2019, null], manual: ["MT5"], auto: [] },
        { engine: "1.0-tsi",    label: "1.0 TSI 110–116 к.с.",   years: [2019, null], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.5-tsi",    label: "1.5 TSI 150 к.с.",       years: [2019, null], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.6-tdi-cr", label: "1.6 TDI 115 к.с.",       years: [2019, 2020], manual: ["MT6"], auto: ["DQ200"] }
      ]
    }
  ],

  "Fabia": [
    {
      generation: "III (NJ)", years: [2014, 2021],
      variants: [
        { engine: "1.0-mpi",       label: "1.0 MPI 60–75 к.с.",  years: [2014, 2021], manual: ["MT5"], auto: [] },
        { engine: "1.2-tsi-ea211", label: "1.2 TSI 90 к.с.",     years: [2014, 2017], manual: ["MT5"], auto: [] },
        { engine: "1.2-tsi-ea211", label: "1.2 TSI 110 к.с.",    years: [2014, 2017], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.0-tsi",       label: "1.0 TSI 95 к.с.",     years: [2017, 2021], manual: ["MT5"], auto: [] },
        { engine: "1.0-tsi",       label: "1.0 TSI 110 к.с.",    years: [2017, 2021], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.4-tdi",       label: "1.4 TDI 75–105 к.с.", years: [2014, 2018], manual: ["MT5"], auto: ["DQ200"] }
      ]
    },
    {
      generation: "IV (PJ)", years: [2021, null],
      variants: [
        { engine: "1.0-mpi", label: "1.0 MPI 65–80 к.с.",   years: [2021, null], manual: ["MT5"], auto: [] },
        { engine: "1.0-tsi", label: "1.0 TSI 95 к.с.",      years: [2021, null], manual: ["MT5"], auto: [] },
        { engine: "1.0-tsi", label: "1.0 TSI 110–116 к.с.", years: [2021, null], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.5-tsi", label: "1.5 TSI 150 к.с.",     years: [2021, null], manual: [], auto: ["DQ200"] }
      ]
    }
  ]
};
