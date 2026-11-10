// Ford: моделі → покоління → варіанти (двигун + роки + коробки).
// Дані попередні, зібрані з відкритих джерел. Потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["Ford"] = {
  "Focus": [
    {
      generation: "II (Mk2)", years: [2004, 2011],
      variants: [
        { engine: "ford-sigma",      label: "1.4 Duratec 80 к.с.",       years: [2004, 2011], manual: ["MT5"], auto: [] },
        { engine: "ford-sigma",      label: "1.6 Duratec 100 к.с.",      years: [2004, 2011], manual: ["MT5"], auto: ["FORD-4AT"] },
        { engine: "ford-sigma",      label: "1.6 Ti-VCT 115 к.с.",       years: [2005, 2011], manual: ["MT5"], auto: [] },
        { engine: "ford-duratec-he", label: "1.8 Duratec 125 к.с.",      years: [2004, 2011], manual: ["MT5"], auto: [] },
        { engine: "ford-duratec-he", label: "2.0 Duratec 145 к.с.",      years: [2004, 2011], manual: ["MT5"], auto: ["FORD-4AT"] },
        { engine: "mz-cd-1.6",       label: "1.6 TDCi 90–109 к.с.",      years: [2004, 2011], manual: ["MT5"], auto: [] },
        { engine: "psa-dw10",        label: "2.0 TDCi 136 к.с.",         years: [2004, 2011], manual: ["MT6"], auto: ["POWERSHIFT-MPS6"],
          note: "Автомат PowerShift — з 2008 р." }
      ]
    },
    {
      generation: "III (Mk3)", years: [2011, 2018],
      variants: [
        { engine: "ford-ecoboost-1.0", label: "1.0 EcoBoost 100–125 к.с.", years: [2012, 2018], manual: ["MT5", "MT6"], auto: [] },
        { engine: "ford-sigma",        label: "1.6 Ti-VCT 85–125 к.с.",    years: [2011, 2018], manual: ["MT5"], auto: ["POWERSHIFT-DPS6"] },
        { engine: "ford-ecoboost-1.5", label: "1.6 EcoBoost 150–182 к.с.", years: [2011, 2014], manual: ["MT6"], auto: [] },
        { engine: "ford-ecoboost-1.5", label: "1.5 EcoBoost 150–182 к.с.", years: [2014, 2018], manual: ["MT6"], auto: ["FORD-6AT"] },
        { engine: "mz-cd-1.6",         label: "1.6 TDCi 95–115 к.с.",      years: [2011, 2015], manual: ["MT5", "MT6"], auto: [] },
        { engine: "mz-cd-1.6",         label: "1.5 TDCi 95–120 к.с.",      years: [2014, 2018], manual: ["MT6"], auto: ["POWERSHIFT-DPS6"] },
        { engine: "psa-dw10",          label: "2.0 TDCi 115–185 к.с.",     years: [2011, 2018], manual: ["MT6"], auto: ["POWERSHIFT-MPS6"] }
      ]
    },
    {
      generation: "IV (Mk4)", years: [2018, 2025],
      variants: [
        { engine: "ford-ecoboost-1.0", label: "1.0 EcoBoost 85–125 к.с.",       years: [2018, 2025], manual: ["MT6"], auto: ["FORD-8AT", "FORD-7DCT"],
          note: "Автомат: до 2021 р. — 8-ступ. гідромеханічний, з 2021 р. (мілд-гібрид mHEV) — 7-ступ. робот." },
        { engine: "ford-ecoboost-1.5", label: "1.5 EcoBoost 150–182 к.с.",      years: [2018, 2022], manual: ["MT6"], auto: ["FORD-8AT"] },
        { engine: "ford-ecoblue",      label: "1.5 EcoBlue 95–120 к.с.",        years: [2018, 2025], manual: ["MT6"], auto: ["FORD-8AT"] },
        { engine: "ford-ecoblue",      label: "2.0 EcoBlue 150 к.с.",           years: [2018, 2025], manual: ["MT6"], auto: ["FORD-8AT"] }
      ]
    }
  ]
};
