// Volkswagen: моделі → покоління → варіанти (двигун + роки + коробки).
// Двигуни й коробки спільні з Škoda (група VAG). Дані попередні, зібрані з відкритих джерел. Потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["Volkswagen"] = {
  "Golf": [
    {
      generation: "V (1K)", years: [2003, 2008],
      variants: [
        { engine: "1.4-mpi",       label: "1.4 MPI 75–80 к.с.",     years: [2003, 2008], manual: ["MT5"], auto: [] },
        { engine: "1.6-mpi",       label: "1.6 MPI 102 к.с.",       years: [2003, 2008], manual: ["MT5"], auto: ["09G"] },
        { engine: "1.6-fsi",       label: "1.6 FSI 115 к.с.",       years: [2003, 2008], manual: ["MT5"], auto: ["09G"] },
        { engine: "1.4-tsi-ea111", label: "1.4 TSI 122–170 к.с.",   years: [2006, 2008], manual: ["MT6"], auto: ["DQ250", "DQ200"],
          note: "Версії 140–170 к.с. (з компресором і турбіною) — DSG-6 DQ250; 122 к.с. з 2008 р. — DSG-7 DQ200." },
        { engine: "2.0-tsi",       label: "GTI 2.0 TFSI 200 к.с.",  years: [2004, 2008], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "1.9-tdi",       label: "1.9 TDI 90–105 к.с.",    years: [2003, 2008], manual: ["MT5"], auto: ["DQ250"] },
        { engine: "2.0-tdi-pd",    label: "2.0 TDI PD 140–170 к.с.", years: [2003, 2008], manual: ["MT6"], auto: ["DQ250"] }
      ]
    },
    {
      generation: "VI (5K)", years: [2008, 2012],
      variants: [
        { engine: "1.4-mpi",       label: "1.4 MPI 80 к.с.",         years: [2008, 2012], manual: ["MT5"], auto: [] },
        { engine: "1.6-mpi",       label: "1.6 MPI 102 к.с.",        years: [2008, 2012], manual: ["MT5"], auto: ["09G"] },
        { engine: "1.2-tsi-ea111", label: "1.2 TSI 85–105 к.с.",     years: [2010, 2012], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.4-tsi-ea111", label: "1.4 TSI 122–160 к.с.",    years: [2008, 2012], manual: ["MT6"], auto: ["DQ200"],
          note: "160 к.с. — версія з компресором і турбіною (TSI Twincharger)." },
        { engine: "2.0-tsi",       label: "GTI 2.0 TSI 211 к.с.",    years: [2009, 2012], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "1.6-tdi-cr",    label: "1.6 TDI 90–105 к.с.",     years: [2009, 2012], manual: ["MT5"], auto: ["DQ200"] },
        { engine: "2.0-tdi-cr",    label: "2.0 TDI CR 110–170 к.с.", years: [2008, 2012], manual: ["MT6"], auto: ["DQ250"] }
      ]
    },
    {
      generation: "VII (5G)", years: [2012, 2020],
      variants: [
        { engine: "1.2-tsi-ea211", label: "1.2 TSI 85–110 к.с.",     years: [2012, 2016], manual: ["MT5", "MT6"], auto: ["DQ200"],
          note: "85 к.с. — 5-ступ. механіка, 105–110 к.с. — 6-ступ." },
        { engine: "1.0-tsi",       label: "1.0 TSI 110–115 к.с.",    years: [2015, 2020], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.4-tsi-ea211", label: "1.4 TSI 122–150 к.с.",    years: [2012, 2018], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.5-tsi",       label: "1.5 TSI 130–150 к.с.",    years: [2017, 2020], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "2.0-tsi",       label: "GTI 2.0 TSI 220–245 к.с.", years: [2013, 2020], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "1.4-tsi-phev",  label: "GTE 1.4 TSI 204 к.с. (PHEV)", years: [2014, 2020], manual: [], auto: ["DQ400E"] },
        { engine: "1.6-tdi-cr",    label: "1.6 TDI 90–115 к.с.",     years: [2012, 2020], manual: ["MT5"], auto: ["DQ200"] },
        { engine: "2.0-tdi-ea288", label: "2.0 TDI 150 к.с.",        years: [2012, 2020], manual: ["MT6"], auto: ["DQ250", "DQ381"],
          note: "Здебільшого DQ250; на авто останніх років випуску може стояти DQ381." },
        { engine: "2.0-tdi-ea288", label: "GTD 2.0 TDI 184 к.с.",    years: [2013, 2020], manual: ["MT6"], auto: ["DQ250"] }
      ]
    },
    {
      generation: "VIII (CD)", years: [2020, null],
      variants: [
        { engine: "1.0-tsi",       label: "1.0 TSI / eTSI 110 к.с.", years: [2020, null], manual: ["MT6"], auto: ["DQ200"],
          note: "Автомат — лише у версії eTSI (мілд-гібрид)." },
        { engine: "1.5-tsi",       label: "1.5 TSI / eTSI 130–150 к.с.", years: [2020, null], manual: ["MT6"], auto: ["DQ200"],
          note: "Автомат — у версії eTSI (мілд-гібрид)." },
        { engine: "2.0-tsi",       label: "GTI 2.0 TSI 245–265 к.с.", years: [2020, null], manual: ["MT6"], auto: ["DQ381"] },
        { engine: "1.4-tsi-phev",  label: "eHybrid / GTE 1.4 TSI 204–245 к.с. (PHEV)", years: [2020, 2024], manual: [], auto: ["DQ400E"] },
        { engine: "2.0-tdi-ea288", label: "2.0 TDI 115–150 к.с.",    years: [2020, null], manual: ["MT6"], auto: ["DQ381"] },
        { engine: "2.0-tdi-ea288", label: "GTD 2.0 TDI 200 к.с.",    years: [2020, null], manual: [], auto: ["DQ381"] }
      ]
    }
  ],

  "Passat": [
    {
      generation: "B6 (3C)", years: [2005, 2010],
      variants: [
        { engine: "1.6-fsi",       label: "1.6 FSI 115 к.с.",          years: [2005, 2008], manual: ["MT6"], auto: ["09G"] },
        { engine: "1.4-tsi-ea111", label: "1.4 TSI 122 к.с.",          years: [2007, 2010], manual: ["MT6"], auto: [] },
        { engine: "1.8-tsi",       label: "1.8 TSI 160 к.с.",          years: [2007, 2010], manual: ["MT6"], auto: ["09G"] },
        { engine: "2.0-fsi",       label: "2.0 FSI 150 к.с.",          years: [2005, 2008], manual: ["MT6"], auto: ["09G"] },
        { engine: "2.0-tsi",       label: "2.0 TFSI 200 к.с.",         years: [2005, 2010], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "1.9-tdi",       label: "1.9 TDI 105 к.с.",          years: [2005, 2010], manual: ["MT5"], auto: ["DQ250"] },
        { engine: "2.0-tdi-pd",    label: "2.0 TDI PD 140–170 к.с.",   years: [2005, 2008], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "2.0-tdi-cr",    label: "2.0 TDI CR 110–170 к.с.",   years: [2008, 2010], manual: ["MT6"], auto: ["DQ250"] }
      ]
    },
    {
      generation: "B7 (36)", years: [2010, 2015],
      variants: [
        { engine: "1.4-tsi-ea111", label: "1.4 TSI 122–150 к.с.",      years: [2010, 2015], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.8-tsi",       label: "1.8 TSI 160 к.с.",          years: [2010, 2015], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "2.0-tsi",       label: "2.0 TSI 210 к.с.",          years: [2010, 2015], manual: [], auto: ["DQ250"] },
        { engine: "1.6-tdi-cr",    label: "1.6 TDI 105 к.с.",          years: [2010, 2015], manual: ["MT5"], auto: ["DQ200"] },
        { engine: "2.0-tdi-cr",    label: "2.0 TDI 140–177 к.с.",      years: [2010, 2015], manual: ["MT6"], auto: ["DQ250"] }
      ]
    },
    {
      generation: "B8 (3G)", years: [2014, 2023],
      variants: [
        { engine: "1.4-tsi-ea211", label: "1.4 TSI 125–150 к.с.",      years: [2014, 2019], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.5-tsi",       label: "1.5 TSI 150 к.с.",          years: [2019, 2023], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.8-tsi",       label: "1.8 TSI 180 к.с.",          years: [2014, 2018], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "1.4-tsi-phev",  label: "GTE 1.4 TSI 218 к.с. (PHEV)", years: [2015, 2023], manual: [], auto: ["DQ400E"] },
        { engine: "1.6-tdi-cr",    label: "1.6 TDI 120 к.с.",          years: [2014, 2020], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "2.0-tdi-ea288", label: "2.0 TDI 150 к.с.",          years: [2014, 2023], manual: ["MT6"], auto: ["DQ250", "DQ381"],
          note: "До ~2018 р. переважно DQ250, пізніше — DQ381." },
        { engine: "2.0-tdi-ea288", label: "2.0 TDI 190 к.с.",          years: [2014, 2023], manual: ["MT6"], auto: ["DQ250", "DQ381"],
          note: "До ~2018 р. переважно DQ250, пізніше — DQ381; з повним приводом 4Motion — DQ500." },
        { engine: "2.0-tdi-ea288", label: "2.0 BiTDI 240 к.с. 4Motion", years: [2014, 2020], manual: [], auto: ["DQ500"] }
      ]
    }
  ],

  "Tiguan": [
    {
      generation: "I (5N)", years: [2007, 2016],
      variants: [
        { engine: "1.4-tsi-ea111", label: "1.4 TSI 122–160 к.с.",     years: [2007, 2016], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "2.0-tsi",       label: "2.0 TSI 170–211 к.с. 4Motion", years: [2007, 2016], manual: ["MT6"], auto: ["09G", "DQ500"],
          note: "До рестайлінгу (2007–2011) — 6-ступ. автомат Aisin, після (2011+) — DSG-7 DQ500." },
        { engine: "2.0-tdi-cr",    label: "2.0 TDI 110–177 к.с.",     years: [2007, 2016], manual: ["MT6"], auto: ["09G", "DQ500"],
          note: "До рестайлінгу (2007–2011) — 6-ступ. автомат Aisin, після (2011+) — DSG-7 DQ500." }
      ]
    },
    {
      generation: "II (AD)", years: [2016, 2024],
      variants: [
        { engine: "1.4-tsi-ea211", label: "1.4 TSI 125–150 к.с.",     years: [2016, 2018], manual: ["MT6"], auto: ["DQ200", "DQ500"],
          note: "150 к.с. з переднім приводом — DQ200, з повним 4Motion — DQ500." },
        { engine: "1.5-tsi",       label: "1.5 TSI 130–150 к.с.",     years: [2018, 2024], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "2.0-tsi",       label: "2.0 TSI 180–245 к.с. 4Motion", years: [2016, 2024], manual: [], auto: ["DQ500"] },
        { engine: "1.4-tsi-phev",  label: "eHybrid 1.4 TSI 245 к.с. (PHEV)", years: [2020, 2024], manual: [], auto: ["DQ400E"] },
        { engine: "2.0-tdi-ea288", label: "2.0 TDI 115–150 к.с.",     years: [2016, 2024], manual: ["MT6"], auto: ["DQ381", "DQ500"],
          note: "З переднім приводом — DQ381, з повним 4Motion — DQ500." },
        { engine: "2.0-tdi-ea288", label: "2.0 TDI 190–240 к.с. 4Motion", years: [2016, 2024], manual: [], auto: ["DQ500"] }
      ]
    }
  ]
};
