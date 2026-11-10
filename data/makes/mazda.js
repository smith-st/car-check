// Mazda: моделі → покоління → варіанти (двигун + роки + коробки).
// Формат такий самий, як у skoda.js. Дані попередні, зібрані з відкритих джерел. Потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["Mazda"] = {
  "3": [
    {
      generation: "I (BK)", years: [2003, 2009],
      variants: [
        { engine: "mzr-z",          label: "1.4 MZR 84 к.с.",        years: [2003, 2009], manual: ["MT5"], auto: [] },
        { engine: "mzr-z",          label: "1.6 MZR 105 к.с.",       years: [2003, 2009], manual: ["MT5"], auto: ["AT4-MAZDA"] },
        { engine: "mzr-l",          label: "2.0 MZR 150 к.с.",       years: [2003, 2009], manual: ["MT5"], auto: ["AT4-MAZDA"] },
        { engine: "mzr-disi-turbo", label: "MPS 2.3 Turbo 260 к.с.", years: [2006, 2009], manual: ["MT6"], auto: [] },
        { engine: "mz-cd-1.6",      label: "1.6 MZ-CD 109 к.с.",     years: [2003, 2009], manual: ["MT5"], auto: [] },
        { engine: "mzr-cd-2.0",     label: "2.0 MZR-CD 143 к.с.",    years: [2006, 2009], manual: ["MT6"], auto: [] }
      ]
    },
    {
      generation: "II (BL)", years: [2009, 2013],
      variants: [
        { engine: "mzr-z",          label: "1.6 MZR 105 к.с.",       years: [2009, 2013], manual: ["MT5"], auto: ["AT4-MAZDA"] },
        { engine: "mzr-l",          label: "2.0 MZR 150 к.с.",       years: [2009, 2013], manual: ["MT6"], auto: ["AT5-MAZDA"],
          note: "З механікою — версія 2.0 DISI з безпосереднім вприском і start-stop, з автоматом — звичайний 2.0 MZR." },
        { engine: "mzr-disi-turbo", label: "MPS 2.3 Turbo 260 к.с.", years: [2009, 2013], manual: ["MT6"], auto: [] },
        { engine: "mz-cd-1.6",      label: "1.6 MZ-CD 109–115 к.с.", years: [2009, 2013], manual: ["MT5"], auto: [] },
        { engine: "mzr-cd-2.2",     label: "2.2 MZR-CD 150–185 к.с.", years: [2009, 2013], manual: ["MT6"], auto: [] }
      ]
    },
    {
      generation: "III (BM/BN)", years: [2013, 2019],
      variants: [
        { engine: "skyactiv-g",       label: "1.5 Skyactiv-G 100 к.с.", years: [2013, 2019], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-g",       label: "2.0 Skyactiv-G 120 к.с.", years: [2013, 2019], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-g",       label: "2.0 Skyactiv-G 165 к.с.", years: [2013, 2019], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-d-small", label: "1.5 Skyactiv-D 105 к.с.", years: [2016, 2019], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-d-2.2",   label: "2.2 Skyactiv-D 150 к.с.", years: [2013, 2019], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] }
      ]
    },
    {
      generation: "IV (BP)", years: [2019, null],
      variants: [
        { engine: "skyactiv-g",       label: "2.0 e-Skyactiv G 122 к.с.",   years: [2019, null], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-g",       label: "2.0 e-Skyactiv G 150 к.с.",   years: [2022, null], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-x",       label: "2.0 Skyactiv-X 180–186 к.с.", years: [2019, null], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-d-small", label: "1.8 Skyactiv-D 116 к.с.",     years: [2019, 2021], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] }
      ]
    }
  ],

  "6": [
    {
      generation: "I (GG/GY)", years: [2002, 2008],
      variants: [
        { engine: "mzr-l",          label: "1.8 MZR 120 к.с.",        years: [2002, 2008], manual: ["MT5"], auto: [] },
        { engine: "mzr-l",          label: "2.0 MZR 141–147 к.с.",    years: [2002, 2008], manual: ["MT5"], auto: ["AT4-MAZDA"] },
        { engine: "mzr-l",          label: "2.3 MZR 166 к.с.",        years: [2002, 2008], manual: ["MT5"], auto: ["AT4-MAZDA", "AT5-MAZDA"],
          note: "Ранні авто — 4-ступ. автомат, після рестайлінгу (2005+) — 5-ступ." },
        { engine: "mzr-disi-turbo", label: "MPS 2.3 Turbo 260 к.с.",  years: [2005, 2008], manual: ["MT6"], auto: [] },
        { engine: "mzr-cd-2.0",     label: "2.0 MZR-CD 121–143 к.с.", years: [2002, 2008], manual: ["MT5", "MT6"], auto: [],
          note: "Версії до 136 к.с. — 5-ступ. механіка, 143 к.с. — 6-ступ." }
      ]
    },
    {
      generation: "II (GH)", years: [2008, 2012],
      variants: [
        { engine: "mzr-l",      label: "1.8 MZR 120 к.с.",        years: [2008, 2012], manual: ["MT5"], auto: [] },
        { engine: "mzr-l",      label: "2.0 MZR 147–155 к.с.",    years: [2008, 2012], manual: ["MT6"], auto: ["AT5-MAZDA"] },
        { engine: "mzr-l",      label: "2.5 MZR 170 к.с.",        years: [2008, 2012], manual: ["MT6"], auto: ["AT5-MAZDA"] },
        { engine: "mzr-cd-2.0", label: "2.0 MZR-CD 140 к.с.",     years: [2008, 2009], manual: ["MT6"], auto: [] },
        { engine: "mzr-cd-2.2", label: "2.2 MZR-CD 125–180 к.с.", years: [2009, 2012], manual: ["MT6"], auto: [] }
      ]
    },
    {
      generation: "III (GJ/GL)", years: [2012, 2024],
      variants: [
        { engine: "skyactiv-g",     label: "2.0 Skyactiv-G 145–165 к.с.", years: [2012, 2024], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-g",     label: "2.5 Skyactiv-G 192–194 к.с.", years: [2012, 2024], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"],
          note: "Механіка з 2.5 зустрічається рідко; з 2018 р. мотор має відключення циліндрів." },
        { engine: "skyactiv-d-2.2", label: "2.2 Skyactiv-D 150–184 к.с.", years: [2012, 2021], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] }
      ]
    }
  ],

  "CX-5": [
    {
      generation: "I (KE)", years: [2012, 2017],
      variants: [
        { engine: "skyactiv-g",     label: "2.0 Skyactiv-G 160–165 к.с.", years: [2012, 2017], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-g",     label: "2.5 Skyactiv-G 192 к.с. AWD", years: [2014, 2017], manual: [], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-d-2.2", label: "2.2 Skyactiv-D 150 к.с.",     years: [2012, 2017], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-d-2.2", label: "2.2 Skyactiv-D 175 к.с. AWD", years: [2012, 2017], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] }
      ]
    },
    {
      generation: "II (KF)", years: [2017, 2025],
      variants: [
        { engine: "skyactiv-g",     label: "2.0 Skyactiv-G 165 к.с.",     years: [2017, 2025], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-g",     label: "2.5 Skyactiv-G 194 к.с. AWD", years: [2017, 2025], manual: [], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-d-2.2", label: "2.2 Skyactiv-D 150 к.с.",     years: [2017, 2025], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-d-2.2", label: "2.2 Skyactiv-D 175–184 к.с. AWD", years: [2017, 2025], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] }
      ]
    }
  ],

  "CX-30": [
    {
      generation: "I (DM)", years: [2019, null],
      variants: [
        { engine: "skyactiv-g",       label: "2.0 e-Skyactiv G 122 к.с.",   years: [2019, null], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-g",       label: "2.0 e-Skyactiv G 150 к.с.",   years: [2022, null], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-x",       label: "2.0 Skyactiv-X 180–186 к.с.", years: [2019, null], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] },
        { engine: "skyactiv-d-small", label: "1.8 Skyactiv-D 116 к.с.",     years: [2019, 2021], manual: ["MT6"], auto: ["SKYACTIV-DRIVE"] }
      ]
    }
  ]
};
