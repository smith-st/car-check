// Audi: моделі → покоління → варіанти (двигун + роки + коробки).
// Двигуни спільні з групою VAG; коробки: DSG (поперечні мотори), S tronic DL501/DL382, Multitronic, ZF (поздовжні).
// Дані попередні, потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["Audi"] = {
  "A3": [
    {
      generation: "II (8P)", years: [2003, 2012],
      variants: [
        { engine: "1.6-mpi",       label: "1.6 MPI 102 к.с.",          years: [2003, 2010], manual: ["MT5"], auto: ["09G"] },
        { engine: "1.6-fsi",       label: "1.6 FSI 115 к.с.",          years: [2003, 2007], manual: ["MT6"], auto: ["09G"] },
        { engine: "1.2-tsi-ea111", label: "1.2 TFSI 105 к.с.",         years: [2010, 2012], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.4-tsi-ea111", label: "1.4 TFSI 125 к.с.",         years: [2007, 2012], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.8-tsi",       label: "1.8 TFSI 160 к.с.",         years: [2006, 2012], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "2.0-tsi",       label: "2.0 TFSI 200 к.с.",         years: [2004, 2012], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "1.9-tdi",       label: "1.9 TDI 105 к.с.",          years: [2003, 2010], manual: ["MT5"], auto: ["DQ250"] },
        { engine: "2.0-tdi-pd",    label: "2.0 TDI PD 140–170 к.с.",   years: [2003, 2008], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "1.6-tdi-cr",    label: "1.6 TDI 90–105 к.с.",       years: [2009, 2012], manual: ["MT5"], auto: ["DQ200"] },
        { engine: "2.0-tdi-cr",    label: "2.0 TDI CR 140–170 к.с.",   years: [2008, 2012], manual: ["MT6"], auto: ["DQ250"] }
      ]
    },
    {
      generation: "III (8V)", years: [2012, 2020],
      variants: [
        { engine: "1.0-tsi",       label: "1.0 TFSI 115 к.с.",         years: [2016, 2020], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.2-tsi-ea211", label: "1.2 TFSI 105–110 к.с.",     years: [2012, 2016], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.4-tsi-ea211", label: "1.4 TFSI 122–150 к.с.",     years: [2012, 2018], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.5-tsi",       label: "1.5 TFSI 150 к.с.",         years: [2017, 2020], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.8-tsi",       label: "1.8 TFSI 180 к.с.",         years: [2012, 2016], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "2.0-tsi",       label: "2.0 TFSI 190–310 к.с.",     years: [2013, 2020], manual: ["MT6"], auto: ["DQ250", "DQ381"],
          note: "Здебільшого DQ250; S3 і новіші версії — також DQ381." },
        { engine: "1.4-tsi-phev",  label: "e-tron 1.4 TFSI 204 к.с. (PHEV)", years: [2014, 2020], manual: [], auto: ["DQ400E"] },
        { engine: "1.6-tdi-cr",    label: "1.6 TDI 105–116 к.с.",      years: [2012, 2020], manual: ["MT5", "MT6"], auto: ["DQ200"] },
        { engine: "2.0-tdi-ea288", label: "2.0 TDI 150–184 к.с.",      years: [2012, 2020], manual: ["MT6"], auto: ["DQ250"] }
      ]
    },
    {
      generation: "IV (8Y)", years: [2020, null],
      variants: [
        { engine: "1.0-tsi",       label: "30 TFSI 1.0 110 к.с.",      years: [2020, 2024], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.5-tsi",       label: "35 TFSI 1.5 150 к.с.",      years: [2020, null], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "2.0-tsi",       label: "40 TFSI / S3 2.0 190–333 к.с.", years: [2020, null], manual: [], auto: ["DQ381"] },
        { engine: "1.4-tsi-phev",  label: "40/45 TFSI e 1.4 204–245 к.с. (PHEV)", years: [2020, null], manual: [], auto: ["DQ400E"] },
        { engine: "2.0-tdi-ea288", label: "30/35 TDI 2.0 116–150 к.с.", years: [2020, null], manual: ["MT6"], auto: ["DQ381"] }
      ]
    }
  ],

  "A4": [
    {
      generation: "B8 (8K)", years: [2007, 2015],
      variants: [
        { engine: "1.8-tsi",       label: "1.8 TFSI 120–170 к.с.",     years: [2007, 2015], manual: ["MT6"], auto: ["MULTITRONIC"] },
        { engine: "2.0-tsi",       label: "2.0 TFSI 180–225 к.с.",     years: [2008, 2015], manual: ["MT6"], auto: ["MULTITRONIC", "DL501"],
          note: "Передній привід — варіатор Multitronic, quattro — S tronic DL501." },
        { engine: "2.0-tdi-cr",    label: "2.0 TDI 120–190 к.с.",      years: [2008, 2015], manual: ["MT6"], auto: ["MULTITRONIC", "DL501"],
          note: "Передній привід — варіатор Multitronic, quattro — S tronic DL501." },
        { engine: "3.0-tdi",       label: "3.0 TDI V6 204–245 к.с.",   years: [2007, 2015], manual: ["MT6"], auto: ["MULTITRONIC", "DL501"],
          note: "Передній привід — Multitronic, quattro — S tronic DL501." }
      ]
    },
    {
      generation: "B9 (8W)", years: [2015, null],
      variants: [
        { engine: "1.4-tsi-ea211", label: "1.4 TFSI 150 к.с.",         years: [2015, 2019], manual: ["MT6"], auto: ["DL382"] },
        { engine: "2.0-tsi",       label: "2.0 TFSI 150–265 к.с.",     years: [2015, null], manual: ["MT6"], auto: ["DL382"] },
        { engine: "2.0-tdi-ea288", label: "2.0 TDI 122–204 к.с.",      years: [2015, null], manual: ["MT6"], auto: ["DL382"] },
        { engine: "3.0-tdi",       label: "3.0 TDI V6 218–347 к.с.",   years: [2015, null], manual: [], auto: ["DL382", "ZF-8HP"],
          note: "218–272 к.с. — S tronic, потужніші (S4 TDI, 50 TDI) — 8-ступ. автомат ZF." }
      ]
    }
  ],

  "A6": [
    {
      generation: "C7 (4G)", years: [2011, 2018],
      variants: [
        { engine: "2.0-tsi",       label: "2.0 TFSI 180–252 к.с.",     years: [2011, 2018], manual: ["MT6"], auto: ["MULTITRONIC", "DL501"],
          note: "Передній привід — Multitronic (до ~2015), далі й quattro — S tronic DL501." },
        { engine: "2.0-tdi-cr",    label: "2.0 TDI 136–190 к.с.",      years: [2011, 2018], manual: ["MT6"], auto: ["MULTITRONIC", "DL501"],
          note: "До ~2014 р. з переднім приводом — Multitronic, далі — S tronic DL501." },
        { engine: "3.0-tdi",       label: "3.0 TDI V6 204–326 к.с.",   years: [2011, 2018], manual: [], auto: ["MULTITRONIC", "DL501", "ZF-8HP"],
          note: "204 к.с. з переднім приводом — Multitronic; 245–272 quattro — S tronic DL501; BiTDI 313–326 — 8-ступ. ZF." }
      ]
    },
    {
      generation: "C8 (4K)", years: [2018, null],
      variants: [
        { engine: "2.0-tsi",       label: "45 TFSI 2.0 245–265 к.с.",  years: [2018, null], manual: [], auto: ["DL382"] },
        { engine: "2.0-tdi-ea288", label: "40 TDI 2.0 204 к.с.",       years: [2018, null], manual: [], auto: ["DL382"] },
        { engine: "3.0-tdi",       label: "45/50 TDI 3.0 V6 231–286 к.с.", years: [2018, null], manual: [], auto: ["ZF-8HP"] }
      ]
    }
  ]
};
