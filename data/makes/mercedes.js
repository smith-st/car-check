// Mercedes-Benz: моделі → покоління → варіанти (двигун + роки + коробки).
// Дані попередні, зібрані з відкритих джерел. Потребують звірки.
window.CarCheck = window.CarCheck || { makes: {}, engines: {}, gearboxes: {} };

window.CarCheck.makes["Mercedes-Benz"] = {
  "A-Class": [
    {
      generation: "III (W176)", years: [2012, 2018],
      variants: [
        { engine: "merc-m270",   label: "1.6 A160/A180/A200 102–156 к.с.", years: [2012, 2018], manual: ["MT6"], auto: ["MB-7DCT"] },
        { engine: "merc-m270",   label: "2.0 A220/A250 184–218 к.с.",      years: [2012, 2018], manual: [], auto: ["MB-7DCT"] },
        { engine: "ren-dci-1.5", label: "1.5 A160d/A180 CDI 90–109 к.с.",  years: [2012, 2018], manual: ["MT6"], auto: ["MB-7DCT"],
          note: "Мотор Renault 1.5 dCi (OM607)." },
        { engine: "merc-om651",  label: "1.8 / 2.1 A200/A220 CDI 136–177 к.с.", years: [2012, 2018], manual: ["MT6"], auto: ["MB-7DCT"] }
      ]
    },
    {
      generation: "IV (W177)", years: [2018, null],
      variants: [
        { engine: "ren-tce-1.3", label: "1.3 A160/A180/A200 109–163 к.с.", years: [2018, null], manual: ["MT6"], auto: ["MB-7DCT"],
          note: "Мотор M282, спільний з Renault 1.3 TCe." },
        { engine: "merc-m270",   label: "2.0 A220/A250 190–224 к.с.",      years: [2018, null], manual: [], auto: ["MB-8DCT"],
          note: "Мотор M260." },
        { engine: "ren-dci-1.5", label: "1.5 A180d 116 к.с.",              years: [2018, null], manual: ["MT6"], auto: ["MB-7DCT"],
          note: "Мотор Renault 1.5 dCi (OM608)." },
        { engine: "merc-om654",  label: "2.0 A200d/A220d 150–190 к.с.",    years: [2018, null], manual: [], auto: ["MB-8DCT"] },
        { engine: "merc-phev",   label: "1.3 A250e PHEV 218 к.с.",         years: [2019, null], manual: [], auto: ["MB-8DCT"] }
      ]
    }
  ],
  "C-Class": [
    {
      generation: "III (W204)", years: [2007, 2014],
      variants: [
        { engine: "merc-m271",      label: "1.6 / 1.8 C180/C200/C250 156–204 к.с.", years: [2007, 2014], manual: ["MT6"], auto: ["MB-5G", "MB-7G"],
          note: "Автомат: до ~2011 р. — переважно 5G-Tronic, потім 7G-Tronic Plus." },
        { engine: "merc-m274",      label: "2.0 C250 211 к.с.",                   years: [2013, 2014], manual: [], auto: ["MB-7G"] },
        { engine: "merc-v6-petrol", label: "2.5 / 3.0 / 3.5 C230–C350 204–306 к.с.", years: [2007, 2014], manual: ["MT6"], auto: ["MB-7G"],
          note: "До 2011 р. — M272, потім M276 (C350 CGI)." },
        { engine: "merc-om646",     label: "2.1 C200/C220 CDI 136–170 к.с.",      years: [2007, 2009], manual: ["MT6"], auto: ["MB-5G"] },
        { engine: "merc-om651",     label: "2.1 C180–C250 CDI 120–204 к.с.",      years: [2009, 2014], manual: ["MT6"], auto: ["MB-5G", "MB-7G"],
          note: "Автомат: до ~2011 р. — переважно 5G-Tronic, потім 7G-Tronic Plus." },
        { engine: "merc-om642",     label: "3.0 C320/C350 CDI 224–265 к.с.",      years: [2007, 2014], manual: [], auto: ["MB-7G"] }
      ]
    },
    {
      generation: "IV (W205)", years: [2014, 2021],
      variants: [
        { engine: "merc-m274",   label: "1.6 C160/C180/C200 129–156 к.с.",  years: [2014, 2018], manual: ["MT6"], auto: ["MB-7G", "MB-9G"],
          note: "Автомат: до 2016 р. — 7G-Tronic Plus, потім 9G-Tronic." },
        { engine: "merc-m274",   label: "2.0 C200/C250/C300 184–245 к.с.",  years: [2014, 2018], manual: ["MT6"], auto: ["MB-7G", "MB-9G"],
          note: "Автомат: до 2016 р. — 7G-Tronic Plus, потім 9G-Tronic." },
        { engine: "merc-m264",   label: "1.5 C180/C200 156–184 к.с.",       years: [2018, 2021], manual: ["MT6"], auto: ["MB-9G"] },
        { engine: "merc-m264",   label: "2.0 C200 4MATIC/C300 197–258 к.с.", years: [2018, 2021], manual: [], auto: ["MB-9G"] },
        { engine: "ren-dci-1.6", label: "1.6 C180d/C200d 116–136 к.с.",     years: [2014, 2018], manual: ["MT6"], auto: ["MB-7G", "MB-9G"],
          note: "Мотор Renault 1.6 dCi (OM626)." },
        { engine: "merc-om651",  label: "2.1 C220d/C250d 170–204 к.с.",     years: [2014, 2018], manual: ["MT6"], auto: ["MB-7G", "MB-9G"],
          note: "Автомат: до 2016 р. — 7G-Tronic Plus, потім 9G-Tronic." },
        { engine: "merc-om654",  label: "1.6 / 2.0 C180d–C300d 122–245 к.с.", years: [2018, 2021], manual: ["MT6"], auto: ["MB-9G"],
          note: "Механіка — лише окремі слабші версії." },
        { engine: "merc-phev",   label: "2.0 C350e/C300e/C300de PHEV 279–320 к.с.", years: [2015, 2021], manual: [], auto: ["MB-7G", "MB-9G"] }
      ]
    },
    {
      generation: "V (W206)", years: [2021, null],
      variants: [
        { engine: "merc-m254",  label: "1.5 / 2.0 C180/C200/C300 170–258 к.с.", years: [2021, null], manual: [], auto: ["MB-9G"] },
        { engine: "merc-om654", label: "2.0 C200d/C220d/C300d 163–265 к.с.",    years: [2021, null], manual: [], auto: ["MB-9G"],
          note: "Мілд-гібрид 48 В (OM654M)." },
        { engine: "merc-phev",  label: "2.0 C300e/C300de PHEV 313 к.с.",        years: [2022, null], manual: [], auto: ["MB-9G"] }
      ]
    }
  ],
  "E-Class": [
    {
      generation: "IV (W212)", years: [2009, 2016],
      variants: [
        { engine: "merc-m271",      label: "1.8 E200/E250 CGI 184–204 к.с.",     years: [2009, 2013], manual: ["MT6"], auto: ["MB-5G", "MB-7G"] },
        { engine: "merc-m274",      label: "2.0 E200/E250 184–211 к.с.",         years: [2013, 2016], manual: ["MT6"], auto: ["MB-7G"] },
        { engine: "merc-v6-petrol", label: "3.0 / 3.5 E300/E350 231–306 к.с.",   years: [2009, 2016], manual: [], auto: ["MB-7G"] },
        { engine: "merc-om651",     label: "2.1 E200–E250 CDI 136–204 к.с.",     years: [2009, 2016], manual: ["MT6"], auto: ["MB-5G", "MB-7G"],
          note: "Автомат: ранні слабші версії — 5G-Tronic, решта — 7G-Tronic Plus." },
        { engine: "merc-om642",     label: "3.0 E300/E350 CDI/BlueTEC 204–265 к.с.", years: [2009, 2016], manual: [], auto: ["MB-7G"] }
      ]
    },
    {
      generation: "V (W213)", years: [2016, 2023],
      variants: [
        { engine: "merc-m274",  label: "2.0 E200/E250/E300 184–245 к.с.",    years: [2016, 2019], manual: [], auto: ["MB-9G"] },
        { engine: "merc-m264",  label: "1.5 / 2.0 E200/E300 197–258 к.с.",   years: [2018, 2023], manual: [], auto: ["MB-9G"] },
        { engine: "merc-om654", label: "2.0 E200d/E220d 150–194 к.с.",       years: [2016, 2023], manual: [], auto: ["MB-9G"] },
        { engine: "merc-om642", label: "3.0 E350d 258 к.с.",                 years: [2016, 2018], manual: [], auto: ["MB-9G"] },
        { engine: "merc-om656", label: "2.9 E350d/E400d 286–340 к.с.",       years: [2018, 2023], manual: [], auto: ["MB-9G"] },
        { engine: "merc-phev",  label: "2.0 E300e/E300de PHEV 306–320 к.с.", years: [2019, 2023], manual: [], auto: ["MB-9G"] }
      ]
    }
  ]
};

// Як ці моделі називаються на Otomoto та в оголошеннях
window.CarCheck.aliases = Object.assign(window.CarCheck.aliases || {}, {
  "Mercedes-Benz|A-Class": ["Klasa A", "A-Klasa", "A Klasse"],
  "Mercedes-Benz|C-Class": ["Klasa C", "C-Klasa", "C Klasse"],
  "Mercedes-Benz|E-Class": ["Klasa E", "E-Klasa", "E Klasse"]
});
