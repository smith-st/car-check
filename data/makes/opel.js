// Opel: моделі → покоління → варіанти (двигун + роки + коробки).
// Дані попередні, зібрані з відкритих джерел. Потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["Opel"] = {
  "Astra": [
    {
      generation: "H", years: [2004, 2014],
      variants: [
        { engine: "opel-ecotec",    label: "1.4 Twinport 90 к.с.",       years: [2004, 2014], manual: ["MT5"], auto: ["OPEL-EASYTRONIC"] },
        { engine: "opel-ecotec",    label: "1.6 Twinport 105–115 к.с.",  years: [2004, 2014], manual: ["MT5"], auto: ["OPEL-EASYTRONIC", "OPEL-AT4"] },
        { engine: "opel-ecotec",    label: "1.8 125–140 к.с.",           years: [2004, 2014], manual: ["MT5"], auto: ["OPEL-AT4"] },
        { engine: "opel-2.0-turbo", label: "2.0 Turbo / OPC 170–240 к.с.", years: [2004, 2010], manual: ["MT6"], auto: [] },
        { engine: "opel-1.3-cdti",  label: "1.3 CDTI 90 к.с.",           years: [2005, 2010], manual: ["MT6"], auto: [] },
        { engine: "opel-1.7-cdti",  label: "1.7 CDTI 80–125 к.с.",       years: [2004, 2014], manual: ["MT5", "MT6"], auto: [] },
        { engine: "opel-1.9-cdti",  label: "1.9 CDTI 100–150 к.с.",      years: [2004, 2010], manual: ["MT6"], auto: ["AISIN-AF40"] }
      ]
    },
    {
      generation: "J", years: [2009, 2015],
      variants: [
        { engine: "opel-ecotec",    label: "1.4 100 к.с.",               years: [2009, 2015], manual: ["MT5"], auto: [] },
        { engine: "opel-ecotec",    label: "1.6 115 к.с.",               years: [2009, 2015], manual: ["MT5"], auto: ["GM-6T"] },
        { engine: "opel-1.4-turbo", label: "1.4 Turbo 120–140 к.с.",     years: [2009, 2015], manual: ["MT6"], auto: ["GM-6T"] },
        { engine: "opel-1.6-turbo", label: "1.6 Turbo 170–200 к.с.",     years: [2009, 2015], manual: ["MT6"], auto: ["GM-6T"] },
        { engine: "opel-1.7-cdti",  label: "1.7 CDTI 110–130 к.с.",      years: [2009, 2015], manual: ["MT6"], auto: ["AISIN-AF40"] },
        { engine: "opel-1.6-cdti",  label: "1.6 CDTI 110–136 к.с.",      years: [2014, 2015], manual: ["MT6"], auto: [] },
        { engine: "opel-2.0-cdti",  label: "2.0 CDTI 160–195 к.с.",      years: [2009, 2015], manual: ["MT6"], auto: ["AISIN-AF40"] }
      ]
    },
    {
      generation: "K", years: [2015, 2021],
      variants: [
        { engine: "opel-sge-turbo", label: "1.0 Turbo 105 к.с.",         years: [2015, 2019], manual: ["MT5"], auto: ["OPEL-EASYTRONIC"] },
        { engine: "opel-sge-turbo", label: "1.4 Turbo 125–150 к.с.",     years: [2015, 2019], manual: ["MT6"], auto: ["GM-6T"] },
        { engine: "opel-1.6-turbo", label: "1.6 Turbo 200 к.с.",         years: [2016, 2019], manual: ["MT6"], auto: [] },
        { engine: "opel-1.6-cdti",  label: "1.6 CDTI 95–160 к.с.",       years: [2015, 2019], manual: ["MT6"], auto: ["GM-6T"] },
        { engine: "opel-sge-turbo", label: "1.2 Turbo 110–145 к.с.",     years: [2019, 2021], manual: ["MT6"], auto: [] },
        { engine: "opel-sge-turbo", label: "1.4 Turbo 145 к.с. CVT",     years: [2019, 2021], manual: [], auto: ["GM-CVT"] },
        { engine: "opel-1.5-diesel", label: "1.5 Diesel 105–122 к.с.",   years: [2019, 2021], manual: ["MT6"], auto: ["GM-9T"] }
      ]
    },
    {
      generation: "L", years: [2021, null],
      variants: [
        { engine: "psa-puretech", label: "1.2 Turbo (PureTech) 110–130 к.с.", years: [2021, null], manual: ["MT6"], auto: ["PSA-EAT8"] },
        { engine: "psa-dv5",      label: "1.5 Diesel (BlueHDi) 130 к.с.",     years: [2021, null], manual: ["MT6"], auto: ["PSA-EAT8"] },
        { engine: "psa-phev",     label: "1.6 Hybrid 180–225 к.с. (PHEV)",    years: [2021, null], manual: [], auto: ["PSA-EEAT8"] }
      ]
    }
  ],

  "Insignia": [
    {
      generation: "A", years: [2008, 2017],
      variants: [
        { engine: "opel-ecotec",    label: "1.6 / 1.8 115–140 к.с.",     years: [2008, 2014], manual: ["MT5", "MT6"], auto: ["GM-6T"] },
        { engine: "opel-1.4-turbo", label: "1.4 Turbo 140 к.с.",         years: [2010, 2017], manual: ["MT6"], auto: [] },
        { engine: "opel-1.6-turbo", label: "1.6 Turbo 170–180 к.с.",     years: [2008, 2017], manual: ["MT6"], auto: ["GM-6T"] },
        { engine: "opel-2.0-turbo", label: "2.0 Turbo 220–250 к.с.",     years: [2008, 2017], manual: ["MT6"], auto: ["GM-6T"] },
        { engine: "opel-2.0-cdti",  label: "2.0 CDTI 110–195 к.с.",      years: [2008, 2017], manual: ["MT6"], auto: ["AISIN-AF40"] },
        { engine: "opel-1.6-cdti",  label: "1.6 CDTI 120–136 к.с.",      years: [2015, 2017], manual: ["MT6"], auto: ["AISIN-AF40"] }
      ]
    },
    {
      generation: "B", years: [2017, 2022],
      variants: [
        { engine: "opel-sge-turbo", label: "1.5 Turbo 140–165 к.с.",     years: [2017, 2022], manual: ["MT6"], auto: ["GM-6T"] },
        { engine: "opel-2.0-turbo", label: "2.0 Turbo 200–260 к.с. 4x4", years: [2017, 2022], manual: [], auto: ["GM-8T"] },
        { engine: "opel-1.6-cdti",  label: "1.6 CDTI 110–136 к.с.",      years: [2017, 2020], manual: ["MT6"], auto: ["GM-6T"] },
        { engine: "opel-2.0-cdti",  label: "2.0 CDTI 170–210 к.с.",      years: [2017, 2022], manual: ["MT6"], auto: ["GM-8T"] }
      ]
    }
  ],

  "Corsa": [
    {
      generation: "D", years: [2006, 2014],
      variants: [
        { engine: "opel-ecotec",   label: "1.0 60–65 к.с.",              years: [2006, 2014], manual: ["MT5"], auto: [] },
        { engine: "opel-ecotec",   label: "1.2 80–85 к.с.",              years: [2006, 2014], manual: ["MT5"], auto: ["OPEL-EASYTRONIC"] },
        { engine: "opel-ecotec",   label: "1.4 90–100 к.с.",             years: [2006, 2014], manual: ["MT5"], auto: ["OPEL-AT4"] },
        { engine: "opel-1.3-cdti", label: "1.3 CDTI 75–95 к.с.",         years: [2006, 2014], manual: ["MT5"], auto: ["OPEL-EASYTRONIC"] },
        { engine: "opel-1.7-cdti", label: "1.7 CDTI 125–130 к.с.",       years: [2006, 2014], manual: ["MT6"], auto: [] }
      ]
    },
    {
      generation: "E", years: [2014, 2019],
      variants: [
        { engine: "opel-ecotec",    label: "1.2 70 к.с.",                years: [2014, 2019], manual: ["MT5"], auto: [] },
        { engine: "opel-ecotec",    label: "1.4 75–100 к.с.",            years: [2014, 2019], manual: ["MT5"], auto: ["OPEL-EASYTRONIC", "OPEL-AT4"] },
        { engine: "opel-sge-turbo", label: "1.0 Turbo 90–115 к.с.",      years: [2014, 2019], manual: ["MT5", "MT6"], auto: ["OPEL-EASYTRONIC"] },
        { engine: "opel-1.3-cdti",  label: "1.3 CDTI 75–95 к.с.",        years: [2014, 2019], manual: ["MT5"], auto: [] }
      ]
    },
    {
      generation: "F", years: [2019, null],
      variants: [
        { engine: "psa-puretech", label: "1.2 75 к.с. (атмосферний)",    years: [2019, null], manual: ["MT5"], auto: [],
          note: "Атмосферна версія PureTech має ланцюг ГРМ — значно надійніша за турбоверсії." },
        { engine: "psa-puretech", label: "1.2 Turbo 100–130 к.с.",       years: [2019, null], manual: ["MT6"], auto: ["PSA-EAT8"] },
        { engine: "psa-dv5",      label: "1.5 Diesel 100 к.с.",          years: [2019, 2022], manual: ["MT6"], auto: [] }
      ]
    }
  ]
};
