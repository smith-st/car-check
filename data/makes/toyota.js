// Toyota: моделі → покоління → варіанти (двигун + роки + коробки).
// Дані попередні, зібрані з відкритих джерел. Потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["Toyota"] = {
  "Corolla": [
    {
      generation: "X (E15)", years: [2007, 2013],
      variants: [
        { engine: "toy-zz-nz", label: "1.4 VVT-i 97 к.с.",         years: [2007, 2009], manual: ["MT5"], auto: ["TOY-MMT"] },
        { engine: "toy-1nr",   label: "1.33 Dual VVT-i 101 к.с.",  years: [2009, 2013], manual: ["MT6"], auto: [] },
        { engine: "toy-zr",    label: "1.6 Dual VVT-i 124–132 к.с.", years: [2007, 2013], manual: ["MT5", "MT6"], auto: ["TOY-MMT", "TOY-CVT"],
          note: "Автомат: до 2009 р. — робот MMT, з 2009 р. — варіатор Multidrive S." },
        { engine: "toy-1nd",   label: "1.4 D-4D 90 к.с.",          years: [2007, 2013], manual: ["MT5"], auto: ["TOY-MMT"] },
        { engine: "toy-ad",    label: "2.0 D-4D 126 к.с.",         years: [2007, 2010], manual: ["MT6"], auto: [] }
      ]
    },
    {
      generation: "XI (E18)", years: [2013, 2019],
      variants: [
        { engine: "toy-1nr", label: "1.33 Dual VVT-i 99 к.с.",   years: [2013, 2019], manual: ["MT6"], auto: [] },
        { engine: "toy-zr",  label: "1.6 Valvematic 132 к.с.",   years: [2013, 2019], manual: ["MT6"], auto: ["TOY-CVT"] },
        { engine: "toy-1nd", label: "1.4 D-4D 90 к.с.",          years: [2013, 2018], manual: ["MT6"], auto: [] }
      ]
    },
    {
      generation: "XII (E21)", years: [2019, null],
      variants: [
        { engine: "toy-8nr",           label: "1.2 Turbo 116 к.с.",         years: [2019, 2020], manual: ["MT6"], auto: ["TOY-CVT"] },
        { engine: "toy-dynamic-force", label: "1.5 Dynamic Force 125 к.с.", years: [2020, 2023], manual: ["MT6"], auto: ["TOY-CVT"] },
        { engine: "toy-hybrid",        label: "1.8 Hybrid 122–140 к.с.",    years: [2019, null], manual: [], auto: ["TOY-ECVT"] },
        { engine: "toy-hybrid",        label: "2.0 Hybrid 180–196 к.с.",    years: [2019, null], manual: [], auto: ["TOY-ECVT"] }
      ]
    }
  ],

  "Auris": [
    {
      generation: "I (E15)", years: [2007, 2012],
      variants: [
        { engine: "toy-zz-nz",  label: "1.4 VVT-i 97 к.с.",           years: [2007, 2009], manual: ["MT5"], auto: ["TOY-MMT"] },
        { engine: "toy-1nr",    label: "1.33 Dual VVT-i 101 к.с.",    years: [2009, 2012], manual: ["MT6"], auto: [] },
        { engine: "toy-zr",     label: "1.6 Dual VVT-i / Valvematic 124–132 к.с.", years: [2007, 2012], manual: ["MT5", "MT6"], auto: ["TOY-MMT"] },
        { engine: "toy-hybrid", label: "1.8 Hybrid 136 к.с.",         years: [2010, 2012], manual: [], auto: ["TOY-ECVT"] },
        { engine: "toy-1nd",    label: "1.4 D-4D 90 к.с.",            years: [2007, 2012], manual: ["MT5", "MT6"], auto: ["TOY-MMT"] },
        { engine: "toy-ad",     label: "2.0 D-4D 126 к.с.",           years: [2007, 2012], manual: ["MT6"], auto: [] },
        { engine: "toy-ad",     label: "2.2 D-4D D-CAT 177 к.с.",     years: [2007, 2009], manual: ["MT6"], auto: [] }
      ]
    },
    {
      generation: "II (E18)", years: [2012, 2018],
      variants: [
        { engine: "toy-1nr",    label: "1.33 Dual VVT-i 99 к.с.",     years: [2012, 2018], manual: ["MT6"], auto: [] },
        { engine: "toy-8nr",    label: "1.2 Turbo 116 к.с.",          years: [2015, 2018], manual: ["MT6"], auto: ["TOY-CVT"] },
        { engine: "toy-zr",     label: "1.6 Valvematic 132 к.с.",     years: [2012, 2018], manual: ["MT6"], auto: ["TOY-CVT"] },
        { engine: "toy-hybrid", label: "1.8 Hybrid 136 к.с.",         years: [2012, 2018], manual: [], auto: ["TOY-ECVT"] },
        { engine: "toy-1nd",    label: "1.4 D-4D 90 к.с.",            years: [2012, 2018], manual: ["MT6"], auto: [] },
        { engine: "toy-1ww",    label: "1.6 D-4D 112 к.с.",           years: [2015, 2018], manual: ["MT6"], auto: [] },
        { engine: "toy-ad",     label: "2.0 D-4D 124 к.с.",           years: [2012, 2015], manual: ["MT6"], auto: [] }
      ]
    }
  ],

  "Yaris": [
    {
      generation: "II (XP90)", years: [2005, 2011],
      variants: [
        { engine: "toy-1kr",   label: "1.0 VVT-i 69 к.с.",         years: [2005, 2011], manual: ["MT5"], auto: ["TOY-MMT"] },
        { engine: "toy-zz-nz", label: "1.3 VVT-i 87 к.с.",         years: [2005, 2008], manual: ["MT5"], auto: ["TOY-MMT"] },
        { engine: "toy-1nr",   label: "1.33 Dual VVT-i 101 к.с.",  years: [2008, 2011], manual: ["MT6"], auto: ["TOY-MMT"] },
        { engine: "toy-1nd",   label: "1.4 D-4D 90 к.с.",          years: [2005, 2011], manual: ["MT5"], auto: ["TOY-MMT"] }
      ]
    },
    {
      generation: "III (XP130)", years: [2011, 2020],
      variants: [
        { engine: "toy-1kr",           label: "1.0 VVT-i 69–72 к.с.",     years: [2011, 2020], manual: ["MT5"], auto: [] },
        { engine: "toy-1nr",           label: "1.33 Dual VVT-i 99 к.с.",  years: [2011, 2017], manual: ["MT6"], auto: ["TOY-CVT"] },
        { engine: "toy-dynamic-force", label: "1.5 Dual VVT-iE 111 к.с.", years: [2017, 2020], manual: ["MT6"], auto: ["TOY-CVT"] },
        { engine: "toy-hybrid",        label: "1.5 Hybrid 100 к.с.",      years: [2012, 2020], manual: [], auto: ["TOY-ECVT"] },
        { engine: "toy-1nd",           label: "1.4 D-4D 90 к.с.",         years: [2011, 2017], manual: ["MT6"], auto: [] }
      ]
    },
    {
      generation: "IV (XP210)", years: [2020, null],
      variants: [
        { engine: "toy-1kr",           label: "1.0 VVT-i 72 к.с.",          years: [2020, 2023], manual: ["MT5"], auto: [] },
        { engine: "toy-dynamic-force", label: "1.5 Dynamic Force 125 к.с.", years: [2020, null], manual: ["MT6"], auto: ["TOY-CVT"] },
        { engine: "toy-hybrid",        label: "1.5 Hybrid 116–130 к.с.",    years: [2020, null], manual: [], auto: ["TOY-ECVT"] }
      ]
    }
  ],

  "RAV4": [
    {
      generation: "III (XA30)", years: [2006, 2012],
      variants: [
        { engine: "toy-zr", label: "2.0 VVT-i 152–158 к.с.",  years: [2006, 2012], manual: ["MT5", "MT6"], auto: ["TOY-AT", "TOY-CVT"],
          note: "До 2009 р. — 4-ступ. автомат, з 2009 р. — варіатор Multidrive S." },
        { engine: "toy-ad", label: "2.2 D-4D 136–150 к.с.",   years: [2006, 2012], manual: ["MT6"], auto: ["TOY-AT"] },
        { engine: "toy-ad", label: "2.2 D-CAT 177 к.с.",      years: [2006, 2012], manual: ["MT6"], auto: [] }
      ]
    },
    {
      generation: "IV (XA40)", years: [2013, 2018],
      variants: [
        { engine: "toy-zr",     label: "2.0 Valvematic 151 к.с.", years: [2013, 2018], manual: ["MT6"], auto: ["TOY-CVT"] },
        { engine: "toy-hybrid", label: "2.5 Hybrid 197 к.с.",     years: [2015, 2018], manual: [], auto: ["TOY-ECVT"] },
        { engine: "toy-ad",     label: "2.0 D-4D 124 к.с.",       years: [2013, 2016], manual: ["MT6"], auto: [] },
        { engine: "toy-ad",     label: "2.2 D-4D 150 к.с.",       years: [2013, 2016], manual: ["MT6"], auto: ["TOY-AT"] }
      ]
    },
    {
      generation: "V (XA50)", years: [2019, null],
      variants: [
        { engine: "toy-dynamic-force", label: "2.0 Dynamic Force 175 к.с.", years: [2019, null], manual: ["MT6"], auto: ["TOY-CVT"] },
        { engine: "toy-hybrid",        label: "2.5 Hybrid 218–222 к.с.",    years: [2019, null], manual: [], auto: ["TOY-ECVT"] },
        { engine: "toy-hybrid-phev",   label: "2.5 Plug-in Hybrid 306 к.с.", years: [2020, null], manual: [], auto: ["TOY-ECVT"] }
      ]
    }
  ]
};
