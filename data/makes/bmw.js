// BMW: моделі → покоління → варіанти (двигун + роки + коробки).
// Дані попередні, зібрані з відкритих джерел. Потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["BMW"] = {
  "1 Series": [
    {
      generation: "II (F20/F21)", years: [2011, 2019],
      variants: [
        { engine: "bmw-n13",     label: "1.6 116i/118i 136–170 к.с.",  years: [2011, 2015], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-n13",     label: "1.6 120i 177 к.с.",           years: [2012, 2015], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-b38",     label: "1.5 116i/118i 109–136 к.с.",  years: [2015, 2019], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-b48",     label: "2.0 120i/125i 184–224 к.с.",  years: [2015, 2019], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-n20",     label: "2.0 125i 218 к.с.",           years: [2012, 2015], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-n54-n55", label: "3.0 M135i 320–326 к.с.",      years: [2012, 2016], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-b58",     label: "3.0 M140i 340 к.с.",          years: [2016, 2019], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-n47",     label: "2.0 114d–120d 95–184 к.с.",   years: [2011, 2015], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-b47",     label: "1.5 116d 116 к.с.",           years: [2015, 2019], manual: ["MT6"], auto: ["ZF-8HP"],
          note: "Трициліндровий B37." },
        { engine: "bmw-b47",     label: "2.0 118d/120d/125d 150–224 к.с.", years: [2015, 2019], manual: ["MT6"], auto: ["ZF-8HP"] }
      ]
    },
    {
      generation: "III (F40)", years: [2019, null],
      variants: [
        { engine: "bmw-b38", label: "1.5 116i/118i 109–140 к.с.", years: [2019, null], manual: ["MT6"], auto: ["BMW-7DCT"] },
        { engine: "bmw-b48", label: "2.0 120i/128ti 178–265 к.с.", years: [2019, null], manual: [], auto: ["BMW-7DCT", "BMW-AISIN8"],
          note: "120i — робот 7DCT, 128ti — автомат Aisin." },
        { engine: "bmw-b48", label: "2.0 M135i 306 к.с.",          years: [2019, null], manual: [], auto: ["BMW-AISIN8"] },
        { engine: "bmw-b47", label: "1.5 / 2.0 116d–120d 116–190 к.с.", years: [2019, null], manual: ["MT6"], auto: ["BMW-7DCT", "BMW-AISIN8"],
          note: "116d — робот 7DCT, 118d/120d — автомат Aisin." }
      ]
    }
  ],
  "3 Series": [
    {
      generation: "V (E90/E91/E92/E93)", years: [2005, 2013],
      variants: [
        { engine: "bmw-n4x",     label: "1.6 316i 115–122 к.с.",          years: [2005, 2011], manual: ["MT6"], auto: ["ZF-6HP"] },
        { engine: "bmw-n4x",     label: "2.0 318i/320i 129–170 к.с.",      years: [2005, 2012], manual: ["MT6"], auto: ["ZF-6HP"] },
        { engine: "bmw-n52",     label: "2.5 / 3.0 323i–330i 177–272 к.с.", years: [2005, 2012], manual: ["MT6"], auto: ["ZF-6HP"] },
        { engine: "bmw-n54-n55", label: "3.0 335i 306 к.с.",              years: [2006, 2013], manual: ["MT6"], auto: ["ZF-6HP"],
          note: "До 2010 р. — N54 (два турбо), потім N55." },
        { engine: "bmw-m47",     label: "2.0 318d/320d 122–163 к.с.",      years: [2005, 2007], manual: ["MT6"], auto: ["ZF-6HP"] },
        { engine: "bmw-n47",     label: "2.0 316d–320d 116–184 к.с.",      years: [2007, 2012], manual: ["MT6"], auto: ["ZF-6HP"] },
        { engine: "bmw-m57",     label: "3.0 325d/330d/335d 197–286 к.с.", years: [2005, 2008], manual: ["MT6"], auto: ["ZF-6HP"] },
        { engine: "bmw-n57",     label: "3.0 325d/330d 204–245 к.с.",      years: [2008, 2012], manual: ["MT6"], auto: ["ZF-6HP"] },
        { engine: "bmw-m57",     label: "3.0 335d 286 к.с.",               years: [2008, 2012], manual: [], auto: ["ZF-6HP"] }
      ]
    },
    {
      generation: "VI (F30/F31/F34)", years: [2012, 2019],
      variants: [
        { engine: "bmw-n13",     label: "1.6 316i 136 к.с.",               years: [2012, 2015], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-b38",     label: "1.5 318i 136 к.с.",               years: [2015, 2019], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-n20",     label: "2.0 320i/328i 156–245 к.с.",      years: [2012, 2016], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-b48",     label: "2.0 320i/330i 184–252 к.с.",      years: [2015, 2019], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-n54-n55", label: "3.0 335i 306 к.с.",               years: [2012, 2015], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-b58",     label: "3.0 340i 326 к.с.",               years: [2015, 2019], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-n47",     label: "2.0 316d–325d 116–218 к.с.",      years: [2012, 2015], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-b47",     label: "2.0 316d–325d 116–224 к.с.",      years: [2015, 2019], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-n57",     label: "3.0 330d/335d 258–313 к.с.",      years: [2012, 2019], manual: ["MT6"], auto: ["ZF-8HP"],
          note: "335d — тільки автомат і xDrive." },
        { engine: "bmw-phev",    label: "2.0 330e PHEV 252 к.с.",          years: [2016, 2019], manual: [], auto: ["ZF-8HP"] }
      ]
    },
    {
      generation: "VII (G20/G21)", years: [2019, null],
      variants: [
        { engine: "bmw-b48",  label: "2.0 318i/320i 156–184 к.с.",  years: [2019, null], manual: ["MT6"], auto: ["ZF-8HP"],
          note: "Механіка трапляється рідко, лише в перші роки випуску." },
        { engine: "bmw-b48",  label: "2.0 330i 245–258 к.с.",       years: [2019, null], manual: [], auto: ["ZF-8HP"] },
        { engine: "bmw-b58",  label: "3.0 M340i 374 к.с.",          years: [2019, null], manual: [], auto: ["ZF-8HP"] },
        { engine: "bmw-b47",  label: "2.0 316d–320d 122–190 к.с.",  years: [2019, null], manual: ["MT6"], auto: ["ZF-8HP"],
          note: "З 2020 р. — мілд-гібрид 48 В; механіка трапляється рідко." },
        { engine: "bmw-b57",  label: "3.0 330d/M340d 265–340 к.с.", years: [2019, null], manual: [], auto: ["ZF-8HP"] },
        { engine: "bmw-phev", label: "2.0 330e PHEV 292 к.с.",      years: [2019, null], manual: [], auto: ["ZF-8HP"] }
      ]
    }
  ],
  "5 Series": [
    {
      generation: "V (E60/E61)", years: [2003, 2010],
      variants: [
        { engine: "bmw-n4x",     label: "2.0 520i 170 к.с.",               years: [2007, 2010], manual: ["MT6"], auto: ["ZF-6HP"] },
        { engine: "bmw-n52",     label: "2.5 / 3.0 523i–530i 177–272 к.с.", years: [2005, 2010], manual: ["MT6"], auto: ["ZF-6HP"] },
        { engine: "bmw-n54-n55", label: "3.0 535i 306 к.с.",               years: [2007, 2010], manual: ["MT6"], auto: ["ZF-6HP"] },
        { engine: "bmw-m47",     label: "2.0 520d 163 к.с.",               years: [2005, 2007], manual: ["MT6"], auto: ["ZF-6HP"] },
        { engine: "bmw-n47",     label: "2.0 520d 177 к.с.",               years: [2007, 2010], manual: ["MT6"], auto: ["ZF-6HP"] },
        { engine: "bmw-m57",     label: "2.5 / 3.0 525d/530d/535d 177–286 к.с.", years: [2003, 2010], manual: ["MT6"], auto: ["ZF-6HP"] }
      ]
    },
    {
      generation: "VI (F10/F11)", years: [2010, 2017],
      variants: [
        { engine: "bmw-n52",     label: "2.5 / 3.0 523i/528i 204–258 к.с.", years: [2010, 2011], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-n20",     label: "2.0 520i/528i 184–245 к.с.",      years: [2011, 2017], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-n54-n55", label: "3.0 535i 306 к.с.",               years: [2010, 2016], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-n47",     label: "2.0 518d/520d/525d 143–218 к.с.", years: [2010, 2014], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-b47",     label: "2.0 518d/520d 150–190 к.с.",      years: [2014, 2017], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-n57",     label: "3.0 525d/530d/535d 204–313 к.с.", years: [2010, 2017], manual: ["MT6"], auto: ["ZF-8HP"] }
      ]
    },
    {
      generation: "VII (G30/G31)", years: [2017, 2023],
      variants: [
        { engine: "bmw-b48",  label: "2.0 520i/530i 184–252 к.с.",       years: [2017, 2023], manual: [], auto: ["ZF-8HP"] },
        { engine: "bmw-b58",  label: "3.0 540i 340 к.с.",                years: [2017, 2023], manual: [], auto: ["ZF-8HP"] },
        { engine: "bmw-b47",  label: "2.0 518d/520d 150–190 к.с.",       years: [2017, 2023], manual: ["MT6"], auto: ["ZF-8HP"],
          note: "Механіка — рідкість, переважно автомат; з 2020 р. — мілд-гібрид 48 В." },
        { engine: "bmw-b57",  label: "3.0 530d/540d 265–340 к.с.",       years: [2017, 2023], manual: [], auto: ["ZF-8HP"] },
        { engine: "bmw-phev", label: "2.0 530e PHEV 252–292 к.с.",       years: [2017, 2023], manual: [], auto: ["ZF-8HP"] }
      ]
    }
  ],
  "X3": [
    {
      generation: "II (F25)", years: [2010, 2017],
      variants: [
        { engine: "bmw-n20",     label: "2.0 xDrive20i/28i 184–245 к.с.", years: [2011, 2017], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-n52",     label: "3.0 xDrive28i 258 к.с.",         years: [2010, 2011], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-n54-n55", label: "3.0 xDrive35i 306 к.с.",         years: [2010, 2017], manual: [], auto: ["ZF-8HP"] },
        { engine: "bmw-n47",     label: "2.0 sDrive18d/xDrive20d 143–184 к.с.", years: [2010, 2014], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-b47",     label: "2.0 sDrive18d/xDrive20d 150–190 к.с.", years: [2014, 2017], manual: ["MT6"], auto: ["ZF-8HP"] },
        { engine: "bmw-n57",     label: "3.0 xDrive30d/35d 258–313 к.с.",  years: [2010, 2017], manual: [], auto: ["ZF-8HP"] }
      ]
    },
    {
      generation: "III (G01)", years: [2017, 2024],
      variants: [
        { engine: "bmw-b48",  label: "2.0 xDrive20i/30i 184–252 к.с.", years: [2017, 2024], manual: [], auto: ["ZF-8HP"] },
        { engine: "bmw-b58",  label: "3.0 M40i 360–387 к.с.",          years: [2018, 2024], manual: [], auto: ["ZF-8HP"] },
        { engine: "bmw-b47",  label: "2.0 xDrive20d 190 к.с.",         years: [2017, 2024], manual: [], auto: ["ZF-8HP"],
          note: "З 2020 р. — мілд-гібрид 48 В." },
        { engine: "bmw-b57",  label: "3.0 xDrive30d/M40d 265–340 к.с.", years: [2017, 2024], manual: [], auto: ["ZF-8HP"] },
        { engine: "bmw-phev", label: "2.0 xDrive30e PHEV 292 к.с.",    years: [2019, 2024], manual: [], auto: ["ZF-8HP"] }
      ]
    }
  ]
};

// Як ці моделі називаються на Otomoto та в оголошеннях
window.CarCheck.aliases = Object.assign(window.CarCheck.aliases || {}, {
  "BMW|1 Series": ["Seria 1", "1er"],
  "BMW|3 Series": ["Seria 3", "3er"],
  "BMW|5 Series": ["Seria 5", "5er"]
});
