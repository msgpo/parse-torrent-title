const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing language", () => {
    it("should detect the russian language correctly", () => {
        const releaseName = "Deadpool 2016 1080p BluRay DTS Rus Ukr 3xEng HDCL";

        expect(parse(releaseName)).to.deep.include({ languages: ["russian"] });
    });

    it("should detect the netherlands language correctly", () => {
        const releaseName = "VAIANA: MOANA (2017) NL-Retail [2D] EAGLE";

        expect(parse(releaseName)).to.deep.include({ languages: ["dutch"] });
    });

    it("should detect the flemish language correctly", () => {
        const releaseName = "De Noodcentrale S02E05 FLEMISH 540p WEBRip AAC H 264";

        expect(parse(releaseName)).to.deep.include({ languages: ["dutch"] });
    });

    it("should detect the truefrench language correctly", () => {
        const releaseName = "The Intern 2015 TRUEFRENCH 720p BluRay x264-PiNKPANTERS";

        expect(parse(releaseName)).to.deep.include({ languages: ["french"] });
    });

    it("should detect the vff language correctly", () => {
        const releaseName = "After Earth 2013 VFF BDrip x264 YJ";

        expect(parse(releaseName)).to.deep.include({ languages: ["french"] });
    });

    it("should detect the french language correctly", () => {
        const releaseName = "127.Heures.FRENCH.DVDRip.AC3.XViD-DVDFR";

        expect(parse(releaseName)).to.deep.include({ languages: ["french"] });
    });

    it("should detect the vostfr language with lowercase correctly", () => {
        const releaseName = "Color.Of.Night.Unrated.DC.VostFR.BRrip.x264";

        expect(parse(releaseName)).to.deep.include({ languages: ["french"] });
    });

    it("should detect the multi language correctly", () => {
        const releaseName = "Le Labyrinthe 2014 Multi-VF2 1080p BluRay x264-PopHD";

        expect(parse(releaseName)).to.deep.include({ languages: ["multi"] });
    });

    it("should detect the VFI language correctly", () => {
        const releaseName = "Maman, j'ai raté l'avion 1990 VFI 1080p BluRay DTS x265-HTG";

        expect(parse(releaseName)).to.deep.include({ languages: ["french"] });
    });

    it("should detect the italian language correctly", () => {
        const releaseName = "South.Park.S21E10.iTALiAN.FiNAL.AHDTV.x264-NTROPiC";

        expect(parse(releaseName)).to.deep.include({ languages: ["italian"] });
    });

    it("House S 1 CD 1-6 svensk, danska, norsk, finsk sub", () => {
        const releaseName = "House S 1 CD 1-6 svensk, danska, norsk, finsk sub";

        expect(parse(releaseName)).to.deep.include({ languages: ["danish", "finnish", "swedish", "norwegian"] });
    });

    it("Svein.Og.Rotta.NORSK.Nordic.Subs.2006", () => {
        const releaseName = "Svein.Og.Rotta.NORSK.Nordic.Subs.2006";

        expect(parse(releaseName)).to.deep.include({ languages: ["danish", "finnish", "swedish", "norwegian"] });
    });

    it("Borat med Norsk Undertekst", () => {
        const releaseName = "Borat med Norsk Undertekst";

        expect(parse(releaseName)).to.deep.include({ languages: ["norwegian"] });
    });

    it("Curious.George.2.Follow.That.Monkey.2009.DK.SWE.UK.PAL.DVDR-CATC", () => {
        const releaseName = "Curious.George.2.Follow.That.Monkey.2009.DK.SWE.UK.PAL.DVDR-CATC";

        expect(parse(releaseName)).to.deep.include({ languages: ["danish", "swedish"] });
    });

    it("Yes.Man.Dk-Subs.2009.dingel", () => {
        const releaseName = "Yes.Man.Dk-Subs.2009.dingel";

        expect(parse(releaseName)).to.deep.include({ languages: ["danish"] });
    });

    it("Red Riding 1974 [2009 PAL DVD][En Subs[Sv.No.Fi]", () => {
        const releaseName = "Red Riding 1974 [2009 PAL DVD][En Subs[Sv.No.Fi]";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "finnish", "swedish"] }); // @TODO does not include no
    });

    it("Comme une Image (Look at Me) [2004 PAL DVD][Fr Subs[Sv.Da.No]", () => {
        const releaseName = "Comme une Image (Look at Me) [2004 PAL DVD][Fr Subs[Sv.Da.No]";

        expect(parse(releaseName)).to.deep.include({ languages: ["french", "swedish"] }); // @TODO does not include da,no
    });

    it("A.Good.Day.To.Die.Hard.2013.SWESUB.DANSUB.FiNSUB.720p.WEB-DL.-Ro", () => {
        const releaseName = "A.Good.Day.To.Die.Hard.2013.SWESUB.DANSUB.FiNSUB.720p.WEB-DL.-Ro";

        expect(parse(releaseName)).to.deep.include({ languages: ["danish", "finnish", "swedish"] });
    });

    it("The.Prisoner.1967-1968.Complete.Series.Subs.English+Nordic", () => {
        const releaseName = "The.Prisoner.1967-1968.Complete.Series.Subs.English+Nordic";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "danish", "finnish", "swedish", "norwegian"] });
    });

    it("Royal.Pains.S05E02.HDTV.subtitulado.esp.sc.avi", () => {
        const releaseName = "Royal.Pains.S05E02.HDTV.subtitulado.esp.sc.avi";

        expect(parse(releaseName)).to.deep.include({ languages: ["spanish"] });
    });

    it("Patriot Games [1992] Eng, Ger, Cze, Hun, Pol + multisub  DVDrip", () => {
        const releaseName = "Patriot Games [1992] Eng, Ger, Cze, Hun, Pol + multisub  DVDrip";

        expect(parse(releaseName)).to.deep.include({ languages: ["multi", "english", "german", "polish", "czech", "hungarian"] });
    });

    it("Elvis Presley - La via del Male (King creole) - IT EN FR DE ES", () => {
        const releaseName = "Elvis Presley - La via del Male (King creole) - IT EN FR DE ES";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "french", "spanish", "italian", "german"] });
    });

    it("FernGully [H264 - Ita Dut Fre Ger Eng Spa Aac - MultiSub]", () => {
        const releaseName = "FernGully [H264 - Ita Dut Fre Ger Eng Spa Aac - MultiSub]";

        expect(parse(releaseName)).to.deep.include({ languages: ["multi", "english", "french", "spanish", "italian", "german", "dutch"] });
    });

    it("Jesus de Montreal / Jesus of Montreal - subtitulos espanol", () => {
        const releaseName = "Jesus de Montreal / Jesus of Montreal - subtitulos espanol";

        expect(parse(releaseName)).to.deep.include({ languages: ["spanish"] });
    });

    it("Los.Vengadores.DVDR español ingles clon", () => {
        const releaseName = "Los.Vengadores.DVDR español ingles clon";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "spanish"] });
    });

    it("EMPIRE STATE 2013 DVDRip TRNC English and Española Latin", () => {
        const releaseName = "EMPIRE STATE 2013 DVDRip TRNC English and Española Latin";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "spanish"] });
    });

    it("Mary Poppins Returns 2019 DVDRip LATINO-1XBET", () => {
        const releaseName = "Mary Poppins Returns 2019 DVDRip LATINO-1XBET";

        expect(parse(releaseName)).to.deep.include({ languages: ["spanish"] });
    });

    it("Los Simpsons S18 E01 Latino", () => {
        const releaseName = "Los Simpsons S18 E01 Latino";

        expect(parse(releaseName)).to.deep.include({ languages: ["spanish"] });
    });

    it("Spider-Man (2002) Blu-Ray [720p] Dual Ingles-Español", () => {
        const releaseName = "Spider-Man (2002) Blu-Ray [720p] Dual Ingles-Español";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "spanish"] });
    });

    it("Abuela (2015) 1080p BluRay x264 AC3 Dual Latino-Inglés", () => {
        const releaseName = "Abuela (2015) 1080p BluRay x264 AC3 Dual Latino-Inglés";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "spanish"] });
    });

    it("Men in Black International 2019 (inglês português)", () => {
        const releaseName = "Men in Black International 2019 (inglês português)";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "portuguese"] });
    });

    it("Assassins (1995) Sylvester Stallone.DVDrip.XviD - Italian Englis", () => {
        const releaseName = "Assassins (1995) Sylvester Stallone.DVDrip.XviD - Italian Englis";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "italian"] });
    });

    it("El Club de la Lucha[dvdrip][spanish]", () => {
        const releaseName = "El Club de la Lucha[dvdrip][spanish]";

        expect(parse(releaseName)).to.deep.include({ languages: ["spanish"] });
    });

    it("The Curse Of The Weeping Woman 2019 BluRay 1080p Tel+Tam+hin+eng", () => {
        const releaseName = "The Curse Of The Weeping Woman 2019 BluRay 1080p Tel+Tam+hin+eng";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "hindi", "telugu", "tamil"] });
    });

    it("Inception 2010 1080p BRRIP[dual-audio][eng-hindi]", () => {
        const releaseName = "Inception 2010 1080p BRRIP[dual-audio][eng-hindi]";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "hindi"] });
    });

    it("Inception (2010) 720p BDRip Tamil+Telugu+Hindi+Eng", () => {
        const releaseName = "Inception (2010) 720p BDRip Tamil+Telugu+Hindi+Eng";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "hindi", "telugu", "tamil"] });
    });

    it("Dabangg 3 2019 AMZN WebRip Hindi 720p x264", () => {
        const releaseName = "Dabangg 3 2019 AMZN WebRip Hindi 720p x264";

        expect(parse(releaseName)).to.deep.include({ languages: ["hindi"] });
    });

    it("Quarantine [2008] [DVDRiP.XviD-M14CH0] [Lektor PL] [Arx]", () => {
        const releaseName = "Quarantine [2008] [DVDRiP.XviD-M14CH0] [Lektor PL] [Arx]";

        expect(parse(releaseName)).to.deep.include({ languages: ["polish"] });
    });

    it("The Mandalorian S01E06 POLISH WEBRip x264-FLAME", () => {
        const releaseName = "The Mandalorian S01E06 POLISH WEBRip x264-FLAME";

        expect(parse(releaseName)).to.deep.include({ languages: ["polish"] });
    });

    it("Carros 2 Dublado - Portugues BR (2011)", () => {
        const releaseName = "Carros 2 Dublado - Portugues BR (2011)";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("A.Simple.Plan.1998.720p.BDRIP.X264.dublado.portugues.BR.gmenezes", () => {
        const releaseName = "A.Simple.Plan.1998.720p.BDRIP.X264.dublado.portugues.BR.gmenezes";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("American.Horror.Story.S01E01.720p. PORTUGUÊS BR", () => {
        const releaseName = "American.Horror.Story.S01E01.720p. PORTUGUÊS BR";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("Angel.S05E19.legendado.br.rmvb", () => {
        const releaseName = "Angel.S05E19.legendado.br.rmvb";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("Grimm S01E11 Dublado BR [ kickUploader ]", () => {
        const releaseName = "Grimm S01E11 Dublado BR [ kickUploader ]";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("InuYasha.EP161.ptBR.subtitles.[inuplace.com.br].avi", () => {
        const releaseName = "InuYasha.EP161.ptBR.subtitles.[inuplace.com.br].avi";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("Ghost.Rider.DivX_Gamonet(Ingles-Port.BR)-AC3.avi", () => {
        const releaseName = "Ghost.Rider.DivX_Gamonet(Ingles-Port.BR)-AC3.avi";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "portuguese"] });
    });

    it("I Am David  legendado pt/br", () => {
        const releaseName = "I Am David  legendado pt/br";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("Lone Wolf and Cub 6 movies - legendas BR", () => {
        const releaseName = "Lone Wolf and Cub 6 movies - legendas BR";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("Wonder Woman Season 3 (H.264 1080p; English/Portuguese-BR)", () => {
        const releaseName = "Wonder Woman Season 3 (H.264 1080p; English/Portuguese-BR)";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "portuguese"] });
    });

    it("MIB 3 - Homens de Preto 2012 ( Audio EN-BR - Leg BR  Mkv 1280x69", () => {
        const releaseName = "MIB 3 - Homens de Preto 2012 ( Audio EN-BR - Leg BR  Mkv 1280x69";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "portuguese"] });
    });

    it("my wife is a gangster 3 legendado em PT(BR)", () => {
        const releaseName = "my wife is a gangster 3 legendado em PT(BR)";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("A.Clockwork.Orange.1971.BRDRIP.1080p.DUAL.PORT-BR.ENG.gmenezes.m", () => {
        const releaseName = "A.Clockwork.Orange.1971.BRDRIP.1080p.DUAL.PORT-BR.ENG.gmenezes.m";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "portuguese"] });
    });

    it("Superman I - O Filme 1978 Leg. BR - Mkv 1280x528", () => {
        const releaseName = "Superman I - O Filme 1978 Leg. BR - Mkv 1280x528";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("The Hit List (2011) DVD NTSC WS (eng-fre-pt-spa) [Sk]", () => {
        const releaseName = "The Hit List (2011) DVD NTSC WS (eng-fre-pt-spa) [Sk]";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "french", "spanish"] }); // @TODO does not include pt
    });

    it("[POPAS] Neon Genesis Evangelion: The End of Evangelion [jp_PT-pt", () => {
        const releaseName = "[POPAS] Neon Genesis Evangelion: The End of Evangelion [jp_PT-pt";

        expect(parse(releaseName)).to.deep.include({ languages: ["japanese", "portuguese"] });
    });

    it("Zola Maseko - Drum (2004) PT subs", () => {
        const releaseName = "Zola Maseko - Drum (2004) PT subs";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("Idrissa Ouedraogo - Yaaba (1989) EN ES FR PT", () => {
        const releaseName = "Idrissa Ouedraogo - Yaaba (1989) EN ES FR PT";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "french", "spanish"] }); // @TODO does not include pt
    });

    it("Metallica.Through.The.Never.2013 O Filme(leg.pt-pt)", () => {
        const releaseName = "Metallica.Through.The.Never.2013 O Filme(leg.pt-pt)";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("Dinossauro (2000) --[ Ing / Pt / Esp ]", () => {
        const releaseName = "Dinossauro (2000) --[ Ing / Pt / Esp ]";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "spanish"] }); // @TODO does not include pt
    });

    it("Mulan 1 (1998) Versão Portuguesa", () => {
        const releaseName = "Mulan 1 (1998) Versão Portuguesa";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("The Guard 2011.DK.EN.ES.HR.NL.PT.RO.Subtitles", () => {
        const releaseName = "The Guard 2011.DK.EN.ES.HR.NL.PT.RO.Subtitles";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "spanish", "romanian", "croatian", "dutch", "danish"] });
    });

    it("Titan.A.E.2000 720p  HDTV DTS Eng Fra Hun Rom Rus multisub", () => {
        const releaseName = "Titan.A.E.2000 720p  HDTV DTS Eng Fra Hun Rom Rus multisub";

        expect(parse(releaseName)).to.deep.include({ languages: ["multi", "english", "french", "russian", "hungarian", "romanian"] });
    });

    it("Miami.Bici.2020.1080p.NETFLIX.WEB-DL.DDP5.1.H.264.EN-ROSub-ExtremlymTorrents", () => {
        const releaseName = "Miami.Bici.2020.1080p.NETFLIX.WEB-DL.DDP5.1.H.264.EN-ROSub-ExtremlymTorrents";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "romanian"] });
    });

    it("Aranyelet.S01.HUNGARIAN.1080p.WEBRip.DDP5.1.x264-SbR[rartv]", () => {
        const releaseName = "Aranyelet.S01.HUNGARIAN.1080p.WEBRip.DDP5.1.x264-SbR[rartv]";

        expect(parse(releaseName)).to.deep.include({ languages: ["hungarian"] });
    });

    it("Ponyo[2008]DvDrip-H264 Quad Audio[Eng Jap Fre Spa]AC3 5.1[DXO]", () => {
        const releaseName = "Ponyo[2008]DvDrip-H264 Quad Audio[Eng Jap Fre Spa]AC3 5.1[DXO]";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "japanese", "french", "spanish"] });
    });

    it("The Mechanic [1972] Eng,Deu,Fra,Esp,Rus + multisub DVDrip", () => {
        const releaseName = "The Mechanic [1972] Eng,Deu,Fra,Esp,Rus + multisub DVDrip";

        expect(parse(releaseName)).to.deep.include({ languages: ["multi", "english", "french", "spanish", "german", "russian"] });
    });

    it("Mommie Dearest [1981 PAL DVD][En.De.Fr.It.Es Multisubs[18]", () => {
        const releaseName = "Mommie Dearest [1981 PAL DVD][En.De.Fr.It.Es Multisubs[18]";

        expect(parse(releaseName)).to.deep.include({ languages: ["multi", "english", "french", "spanish", "german"] }); // @TODO does not include it
    });

    it("Pasienio sargyba S01E03 (2016 WEBRip LT)", () => {
        const releaseName = "Pasienio sargyba S01E03 (2016 WEBRip LT)";

        expect(parse(releaseName)).to.deep.include({ languages: ["lithuanian"] });
    });

    it("Ip.Man.4.The.Finale.2019.CHINESE.1080p.BluRay.x264.TrueHD.7.1.Atmos-HDC", () => {
        const releaseName = "Ip.Man.4.The.Finale.2019.CHINESE.1080p.BluRay.x264.TrueHD.7.1.Atmos-HDC";

        expect(parse(releaseName)).to.deep.include({ languages: ["chinese"] });
    });

    it("Inuyasha_TV+Finale+OVA+Film+CD+Manga+Other; dub jpn,chn,eng sub chs (2019-09-21)", () => {
        const releaseName = "Inuyasha_TV+Finale+OVA+Film+CD+Manga+Other; dub jpn,chn,eng sub chs (2019-09-21)";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "japanese", "chinese"] });
    });

    it("Initial D Live Action 2005 ENG/CHI", () => {
        const releaseName = "Initial D Live Action 2005 ENG/CHI";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "chinese"] });
    });

    it("Wolf.Warrior.2015.720p.BluRay.x264.Mandarin.AAC-ETRG", () => {
        const releaseName = "Wolf.Warrior.2015.720p.BluRay.x264.Mandarin.AAC-ETRG";

        expect(parse(releaseName)).to.deep.include({ languages: ["chinese"] });
    });

    it("Berserk 01-25 [dual audio JP,EN] MKV", () => {
        const releaseName = "Berserk 01-25 [dual audio JP,EN] MKV";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "japanese"] });
    });

    it("Shinjuku Swan 2015 JAP 1080p BluRay x264 DTS-JYK", () => {
        const releaseName = "Shinjuku Swan 2015 JAP 1080p BluRay x264 DTS-JYK";

        expect(parse(releaseName)).to.deep.include({ languages: ["japanese"] });
    });

    it("Wet.Woman.in.the.Wind.2016.JAPANESE.1080p.BluRay.x264-iKiW", () => {
        const releaseName = "Wet.Woman.in.the.Wind.2016.JAPANESE.1080p.BluRay.x264-iKiW";

        expect(parse(releaseName)).to.deep.include({ languages: ["japanese"] });
    });

    it("All.Love.E146.KOR.HDTV.XViD-DeBTV", () => {
        const releaseName = "All.Love.E146.KOR.HDTV.XViD-DeBTV";

        expect(parse(releaseName)).to.deep.include({ languages: ["korean"] });
    });

    it("The.Nun.2018.KORSUB.HDRip.XviD.MP3-STUTTERSHIT", () => {
        const releaseName = "The.Nun.2018.KORSUB.HDRip.XviD.MP3-STUTTERSHIT";

        expect(parse(releaseName)).to.deep.include({ languages: ["korean"] });
    });

    it("Burning.2018.KOREAN.720p.BluRay.H264.AAC-VXT", () => {
        const releaseName = "Burning.2018.KOREAN.720p.BluRay.H264.AAC-VXT";

        expect(parse(releaseName)).to.deep.include({ languages: ["korean"] });
    });

    it("A Freira (2018) Dublado HD-TS 720p", () => {
        const releaseName = "A Freira (2018) Dublado HD-TS 720p";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("Castlevania 2017 1º temporada completa 1080p", () => {
        const releaseName = "Castlevania 2017 1º temporada completa 1080p";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("Escobar El Patron Del Mal Capitulo 91 SD (2012-10-10) [SiRaDuDe]", () => {
        const releaseName = "Escobar El Patron Del Mal Capitulo 91 SD (2012-10-10) [SiRaDuDe]";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("Bleach - 215 ao 220 - [DB-BR]", () => {
        const releaseName = "Bleach - 215 ao 220 - [DB-BR]";

        expect(parse(releaseName)).to.deep.include({ languages: ["portuguese"] });
    });

    it("Joker.2019.MULTi.Bluray.1080p.Atmos.7.1.En.Fr.Sp.Pt-DDR[EtHD]", () => {
        const releaseName = "Joker.2019.MULTi.Bluray.1080p.Atmos.7.1.En.Fr.Sp.Pt-DDR[EtHD]";

        expect(parse(releaseName)).to.deep.include({ languages: ["multi", "english", "french"] }); // @TODO does not include sp,pt
    });

    it("Dilbert complete series + en subs", () => {
        const releaseName = "Dilbert complete series + en subs";

        expect(parse(releaseName)).to.deep.include({ languages: ["english"] });
    });

    it("Un.Homme.Et.Une.Femme.1966.DVDRip.XviD.AR [PT ENG ESP]", () => {
        const releaseName = "Un.Homme.Et.Une.Femme.1966.DVDRip.XviD.AR [PT ENG ESP]";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "spanish", "portuguese"] });
    });

    it("Geminis.2005.Argentina.ESP.ENG.PT.SUBS", () => {
        const releaseName = "Geminis.2005.Argentina.ESP.ENG.PT.SUBS";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "spanish", "portuguese"] });
    });

    it("1917 2019 1080p Bluray x264-Sexmeup [Greek Subs] [Braveheart]", () => {
        const releaseName = "1917 2019 1080p Bluray x264-Sexmeup [Greek Subs] [Braveheart]";

        expect(parse(releaseName)).to.deep.include({ languages: ["greek"] });
    });

    it("The Lion King 1,2,3 Greek Language", () => {
        const releaseName = "The Lion King 1,2,3 Greek Language";

        expect(parse(releaseName)).to.deep.include({ languages: ["greek"] });
    });

    it("The Adams Family (1991) (Greek Subs integratet)", () => {
        const releaseName = "The Adams Family (1991) (Greek Subs integratet)";

        expect(parse(releaseName)).to.deep.include({ languages: ["greek"] });
    });

    it("The Insult (2017) [BluRay] [720p] Arabic", () => {
        const releaseName = "The Insult (2017) [BluRay] [720p] Arabic";

        expect(parse(releaseName)).to.deep.include({ languages: ["arabic"] });
    });

    it("The.Mexican.2001 - Arabic Subs Hardcoded", () => {
        const releaseName = "The.Mexican.2001 - Arabic Subs Hardcoded";

        expect(parse(releaseName)).to.deep.include({ languages: ["arabic"] });
    });

    it("Much Loved (2015) - DVDRip x265 HEVC - ARAB-ITA-FRE AUDIO (ENG S", () => {
        const releaseName = "Much Loved (2015) - DVDRip x265 HEVC - ARAB-ITA-FRE AUDIO (ENG S";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "french", "italian", "arabic"] });
    });

    it("42.2013.720p.BluRay.x264.HD4Ar Arab subtitle", () => {
        const releaseName = "42.2013.720p.BluRay.x264.HD4Ar Arab subtitle";

        expect(parse(releaseName)).to.deep.include({ languages: ["arabic"] });
    });

    it("Fauda.S01.HEBREW.1080p.NF.WEBRip.DD5.1.x264-TrollHD[rartv]", () => {
        const releaseName = "Fauda.S01.HEBREW.1080p.NF.WEBRip.DD5.1.x264-TrollHD[rartv]";

        expect(parse(releaseName)).to.deep.include({ languages: ["hebrew"] });
    });

    it("madagascar 720p hebrew dubbed.mkv", () => {
        const releaseName = "madagascar 720p hebrew dubbed.mkv";

        expect(parse(releaseName)).to.deep.include({ languages: ["hebrew"] });
    });

    it("The.Protector.2018.S03.TURKISH.WEBRip.x264-ION10", () => {
        const releaseName = "The.Protector.2018.S03.TURKISH.WEBRip.x264-ION10";

        expect(parse(releaseName)).to.deep.include({ languages: ["turkish"] });
    });

    it("Recep Ivedik 6 (2020) NETFLIX 720p WEBDL (Turkish) - ExtremlymTorrents", () => {
        const releaseName = "Recep Ivedik 6 (2020) NETFLIX 720p WEBDL (Turkish) - ExtremlymTorrents";

        expect(parse(releaseName)).to.deep.include({ languages: ["turkish"] });
    });

    it("The Insider*1999*[DVD5][PAL][ENG, POL, sub. ROM, TUR]", () => {
        const releaseName = "The Insider*1999*[DVD5][PAL][ENG, POL, sub. ROM, TUR]";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "polish", "romanian", "turkish"] });
    });

    it("Divorzio allitaliana [XviD - Ita Mp3 - Sub Eng Esp Tur]", () => {
        const releaseName = "Divorzio allitaliana [XviD - Ita Mp3 - Sub Eng Esp Tur]";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "spanish", "italian", "turkish"] });
    });

    it("2007 Saturno Contro [Saturn In Opposition] (ITA-FRA-TUR) [EngSub", () => {
        const releaseName = "2007 Saturno Contro [Saturn In Opposition] (ITA-FRA-TUR) [EngSub";

        expect(parse(releaseName)).to.deep.include({ languages: ["english", "french", "italian", "turkish"] });
    });

    it("My Big Fat Greek Wedding (2002) 720p BrRip x264 - YIFY", () => {
        const releaseName = "My Big Fat Greek Wedding (2002) 720p BrRip x264 - YIFY";

        expect(parse(releaseName)).to.not.have.property("languages");
    });

    it("Get Him to the Greek 2010 720p BluRay", () => {
        const releaseName = "Get Him to the Greek 2010 720p BluRay";

        expect(parse(releaseName)).to.not.have.property("languages");
    });
});
