// Hyundai: моделі → покоління → варіанти (двигун + роки + коробки).
// Двигуни й коробки спільні з Kia. Дані попередні, потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["Hyundai"] = {
  "i30": [
    {
      generation: "I (FD)", years: [2007, 2012],
      variants: [
        { engine: "hk-mpi",        label: "1.4 109 к.с.",            years: [2007, 2012], manual: ["MT5"], auto: [] },
        { engine: "hk-mpi",        label: "1.6 122–126 к.с.",        years: [2007, 2012], manual: ["MT5"], auto: ["HK-AT4"] },
        { engine: "hk-nu",         label: "2.0 143 к.с.",            years: [2007, 2012], manual: ["MT5"], auto: ["HK-AT4"] },
        { engine: "hk-crdi-small", label: "1.6 CRDi 90–128 к.с.",    years: [2007, 2012], manual: ["MT5", "MT6"], auto: ["HK-AT4"] }
      ]
    },
    {
      generation: "II (GD)", years: [2012, 2017],
      variants: [
        { engine: "hk-mpi",        label: "1.4 100 к.с.",            years: [2012, 2017], manual: ["MT6"], auto: [] },
        { engine: "hk-mpi",        label: "1.6 MPI 120 к.с.",        years: [2012, 2017], manual: ["MT6"], auto: ["HK-AT6"] },
        { engine: "hk-gdi",        label: "1.6 GDI 135 к.с.",        years: [2012, 2017], manual: ["MT6"], auto: ["HK-AT6", "HK-DCT7"],
          note: "До 2015 р. — 6-ступ. автомат, з 2015 р. — робот DCT-7." },
        { engine: "hk-tgdi-1.6",   label: "1.6 T-GDI Turbo 186 к.с.", years: [2015, 2017], manual: ["MT6"], auto: [] },
        { engine: "hk-crdi-small", label: "1.4 CRDi 90 к.с.",        years: [2012, 2017], manual: ["MT6"], auto: [] },
        { engine: "hk-crdi-small", label: "1.6 CRDi 110–136 к.с.",   years: [2012, 2017], manual: ["MT6"], auto: ["HK-AT6", "HK-DCT7"],
          note: "До 2015 р. — 6-ступ. автомат, з 2015 р. — робот DCT-7." }
      ]
    },
    {
      generation: "III (PD)", years: [2017, 2024],
      variants: [
        { engine: "hk-mpi",         label: "1.4 MPI 100 к.с.",        years: [2017, 2020], manual: ["MT6"], auto: [] },
        { engine: "hk-tgdi-small",  label: "1.0 T-GDI 120 к.с.",      years: [2017, 2024], manual: ["MT6"], auto: ["HK-DCT7"] },
        { engine: "hk-tgdi-small",  label: "1.4 T-GDI 140 к.с.",      years: [2017, 2020], manual: ["MT6"], auto: ["HK-DCT7"] },
        { engine: "hk-smartstream", label: "1.5 T-GDI 160 к.с.",      years: [2020, 2024], manual: ["MT6"], auto: ["HK-DCT7"] },
        { engine: "hk-crdi-small",  label: "1.6 CRDi 95–136 к.с.",    years: [2017, 2024], manual: ["MT6"], auto: ["HK-DCT7"] }
      ]
    }
  ],

  "Tucson": [
    {
      generation: "ix35 (LM)", years: [2010, 2015],
      variants: [
        { engine: "hk-gdi",       label: "1.6 GDI 135 к.с.",           years: [2013, 2015], manual: ["MT6"], auto: [] },
        { engine: "hk-nu",        label: "2.0 MPI / GDI 163–166 к.с.", years: [2010, 2015], manual: ["MT6"], auto: ["HK-AT6"] },
        { engine: "hk-crdi-small", label: "1.7 CRDi 115 к.с.",         years: [2010, 2015], manual: ["MT6"], auto: [] },
        { engine: "hk-crdi-2.0",  label: "2.0 CRDi 136–184 к.с.",      years: [2010, 2015], manual: ["MT6"], auto: ["HK-AT6"] }
      ]
    },
    {
      generation: "III (TL)", years: [2015, 2020],
      variants: [
        { engine: "hk-gdi",        label: "1.6 GDI 132 к.с.",         years: [2015, 2020], manual: ["MT6"], auto: [] },
        { engine: "hk-tgdi-1.6",   label: "1.6 T-GDI 177 к.с.",       years: [2015, 2020], manual: ["MT6"], auto: ["HK-DCT7"] },
        { engine: "hk-crdi-small", label: "1.6 / 1.7 CRDi 115–141 к.с.", years: [2015, 2020], manual: ["MT6"], auto: ["HK-DCT7"] },
        { engine: "hk-crdi-2.0",   label: "2.0 CRDi 136–185 к.с.",    years: [2015, 2020], manual: ["MT6"], auto: ["HK-AT6", "HK-AT8"],
          note: "До 2018 р. — 6-ступ. автомат, з 2018 р. — 8-ступ." }
      ]
    },
    {
      generation: "IV (NX4)", years: [2020, null],
      variants: [
        { engine: "hk-smartstream", label: "1.6 T-GDI 150–180 к.с.",   years: [2020, null], manual: ["MT6"], auto: ["HK-DCT7"] },
        { engine: "hk-hybrid",      label: "1.6 T-GDI Hybrid 230 к.с.", years: [2020, null], manual: [], auto: ["HK-AT6"] },
        { engine: "hk-hybrid",      label: "1.6 T-GDI Plug-in Hybrid 265 к.с.", years: [2021, null], manual: [], auto: ["HK-AT6"] },
        { engine: "hk-crdi-small",  label: "1.6 CRDi 115–136 к.с.",    years: [2020, 2023], manual: ["MT6"], auto: ["HK-DCT7"] }
      ]
    }
  ]
};
