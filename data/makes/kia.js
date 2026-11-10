// Kia: моделі → покоління → варіанти (двигун + роки + коробки).
// Двигуни й коробки спільні з Hyundai. Дані попередні, потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["Kia"] = {
  "Ceed": [
    {
      generation: "I (ED)", years: [2006, 2012],
      variants: [
        { engine: "hk-mpi",        label: "1.4 105–109 к.с.",        years: [2006, 2012], manual: ["MT5"], auto: [] },
        { engine: "hk-mpi",        label: "1.6 122–126 к.с.",        years: [2006, 2012], manual: ["MT5"], auto: ["HK-AT4"] },
        { engine: "hk-nu",         label: "2.0 143 к.с.",            years: [2006, 2012], manual: ["MT5"], auto: ["HK-AT4"] },
        { engine: "hk-crdi-small", label: "1.6 CRDi 90–128 к.с.",    years: [2006, 2012], manual: ["MT5", "MT6"], auto: ["HK-AT4"] }
      ]
    },
    {
      generation: "II (JD)", years: [2012, 2018],
      variants: [
        { engine: "hk-tgdi-small", label: "1.0 T-GDI 100–120 к.с.",  years: [2015, 2018], manual: ["MT6"], auto: [] },
        { engine: "hk-mpi",        label: "1.4 100 к.с.",            years: [2012, 2018], manual: ["MT6"], auto: [] },
        { engine: "hk-mpi",        label: "1.6 MPI 120 к.с.",        years: [2012, 2018], manual: ["MT6"], auto: ["HK-AT6"] },
        { engine: "hk-gdi",        label: "1.6 GDI 135 к.с.",        years: [2012, 2018], manual: ["MT6"], auto: ["HK-AT6", "HK-DCT7"],
          note: "До 2015 р. — 6-ступ. автомат, з 2015 р. — робот DCT-7." },
        { engine: "hk-tgdi-1.6",   label: "GT 1.6 T-GDI 204 к.с.",   years: [2013, 2018], manual: ["MT6"], auto: [] },
        { engine: "hk-crdi-small", label: "1.4 CRDi 90 к.с.",        years: [2012, 2018], manual: ["MT6"], auto: [] },
        { engine: "hk-crdi-small", label: "1.6 CRDi 110–136 к.с.",   years: [2012, 2018], manual: ["MT6"], auto: ["HK-AT6", "HK-DCT7"],
          note: "До 2015 р. — 6-ступ. автомат, з 2015 р. — робот DCT-7." }
      ]
    },
    {
      generation: "III (CD)", years: [2018, null],
      variants: [
        { engine: "hk-mpi",         label: "1.4 MPI 100 к.с.",        years: [2018, 2020], manual: ["MT6"], auto: [] },
        { engine: "hk-mpi",         label: "1.5 MPI 110 к.с.",        years: [2021, null], manual: ["MT6"], auto: [] },
        { engine: "hk-tgdi-small",  label: "1.0 T-GDI 120 к.с.",      years: [2018, null], manual: ["MT6"], auto: ["HK-DCT7"] },
        { engine: "hk-tgdi-small",  label: "1.4 T-GDI 140 к.с.",      years: [2018, 2020], manual: ["MT6"], auto: ["HK-DCT7"] },
        { engine: "hk-smartstream", label: "1.5 T-GDI 160 к.с.",      years: [2020, null], manual: ["MT6"], auto: ["HK-DCT7"] },
        { engine: "hk-tgdi-1.6",    label: "GT 1.6 T-GDI 204 к.с.",   years: [2019, null], manual: ["MT6"], auto: ["HK-DCT7"] },
        { engine: "hk-crdi-small",  label: "1.6 CRDi 115–136 к.с.",   years: [2018, 2023], manual: ["MT6"], auto: ["HK-DCT7"] }
      ]
    }
  ],

  "Sportage": [
    {
      generation: "III (SL)", years: [2010, 2015],
      variants: [
        { engine: "hk-gdi",        label: "1.6 GDI 135 к.с.",           years: [2010, 2015], manual: ["MT6"], auto: [] },
        { engine: "hk-nu",         label: "2.0 MPI / GDI 163–166 к.с.", years: [2010, 2015], manual: ["MT6"], auto: ["HK-AT6"] },
        { engine: "hk-crdi-small", label: "1.7 CRDi 115 к.с.",          years: [2010, 2015], manual: ["MT6"], auto: [] },
        { engine: "hk-crdi-2.0",   label: "2.0 CRDi 136–184 к.с.",      years: [2010, 2015], manual: ["MT6"], auto: ["HK-AT6"] }
      ]
    },
    {
      generation: "IV (QL)", years: [2015, 2021],
      variants: [
        { engine: "hk-gdi",        label: "1.6 GDI 132 к.с.",         years: [2015, 2021], manual: ["MT6"], auto: [] },
        { engine: "hk-tgdi-1.6",   label: "1.6 T-GDI 177 к.с.",       years: [2015, 2021], manual: ["MT6"], auto: ["HK-DCT7"] },
        { engine: "hk-crdi-small", label: "1.6 / 1.7 CRDi 115–141 к.с.", years: [2015, 2021], manual: ["MT6"], auto: ["HK-DCT7"] },
        { engine: "hk-crdi-2.0",   label: "2.0 CRDi 136–185 к.с.",    years: [2015, 2021], manual: ["MT6"], auto: ["HK-AT6", "HK-AT8"],
          note: "До 2018 р. — 6-ступ. автомат, з 2018 р. — 8-ступ." }
      ]
    },
    {
      generation: "V (NQ5)", years: [2021, null],
      variants: [
        { engine: "hk-smartstream", label: "1.6 T-GDI 150–180 к.с.",   years: [2021, null], manual: ["MT6"], auto: ["HK-DCT7"] },
        { engine: "hk-hybrid",      label: "1.6 T-GDI Hybrid 230 к.с.", years: [2021, null], manual: [], auto: ["HK-AT6"] },
        { engine: "hk-hybrid",      label: "1.6 T-GDI Plug-in Hybrid 265 к.с.", years: [2022, null], manual: [], auto: ["HK-AT6"] },
        { engine: "hk-crdi-small",  label: "1.6 CRDi 115–136 к.с.",    years: [2021, 2023], manual: ["MT6"], auto: ["HK-DCT7"] }
      ]
    }
  ]
};
