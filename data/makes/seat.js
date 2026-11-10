// Seat: моделі → покоління → варіанти (двигун + роки + коробки).
// Двигуни й коробки спільні з Škoda та Volkswagen (група VAG). Дані попередні, потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["Seat"] = {
  "Leon": [
    {
      generation: "III (5F)", years: [2012, 2020],
      variants: [
        { engine: "1.2-tsi-ea211", label: "1.2 TSI 86–110 к.с.",       years: [2012, 2016], manual: ["MT5", "MT6"], auto: ["DQ200"] },
        { engine: "1.0-tsi",       label: "1.0 TSI 110–115 к.с.",      years: [2015, 2020], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.4-tsi-ea211", label: "1.4 TSI 122–150 к.с.",      years: [2012, 2018], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.5-tsi",       label: "1.5 TSI 130–150 к.с.",      years: [2018, 2020], manual: ["MT6"], auto: ["DQ200"] },
        { engine: "1.8-tsi",       label: "1.8 TSI 180 к.с.",          years: [2012, 2018], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "2.0-tsi",       label: "Cupra 2.0 TSI 265–300 к.с.", years: [2014, 2020], manual: ["MT6"], auto: ["DQ250"] },
        { engine: "1.6-tdi-cr",    label: "1.6 TDI 90–115 к.с.",       years: [2012, 2020], manual: ["MT5"], auto: ["DQ200"] },
        { engine: "2.0-tdi-ea288", label: "2.0 TDI 150–184 к.с.",      years: [2012, 2020], manual: ["MT6"], auto: ["DQ250"] }
      ]
    },
    {
      generation: "IV (KL)", years: [2020, null],
      variants: [
        { engine: "1.0-tsi",       label: "1.0 TSI / eTSI 110 к.с.",   years: [2020, null], manual: ["MT6"], auto: ["DQ200"],
          note: "Автомат — лише у версії eTSI (мілд-гібрид)." },
        { engine: "1.5-tsi",       label: "1.5 TSI / eTSI 130–150 к.с.", years: [2020, null], manual: ["MT6"], auto: ["DQ200"],
          note: "Автомат — у версії eTSI (мілд-гібрид)." },
        { engine: "2.0-tsi",       label: "2.0 TSI 190 к.с.",          years: [2020, 2024], manual: [], auto: ["DQ381"] },
        { engine: "1.4-tsi-phev",  label: "e-Hybrid 1.4 TSI 204 к.с. (PHEV)", years: [2020, null], manual: [], auto: ["DQ400E"] },
        { engine: "2.0-tdi-ea288", label: "2.0 TDI 115–150 к.с.",      years: [2020, null], manual: ["MT6"], auto: ["DQ381"] }
      ]
    }
  ]
};
