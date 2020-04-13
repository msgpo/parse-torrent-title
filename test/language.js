const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing language", () => {
    it("should detect the russian language correctly", () => {
        const releaseName = "Deadpool 2016 1080p BluRay DTS Rus Ukr 3xEng HDCL";

        expect(parse(releaseName)).to.deep.include({ language: "russian" });
    });

    it("should detect the netherlands language correctly", () => {
        const releaseName = "VAIANA: MOANA (2017) NL-Retail [2D] EAGLE";

        expect(parse(releaseName)).to.deep.include({ language: "dutch" });
    });

    it("should detect the flemish language correctly", () => {
        const releaseName = "De Noodcentrale S02E05 FLEMISH 540p WEBRip AAC H 264";

        expect(parse(releaseName)).to.deep.include({ language: "flemish" });
    });

    it("should detect the english dubbed language correctly", () => {
        const releaseName = "Yo-Kai Watch S01E71 DUBBED 720p HDTV x264-W4F";

        expect(parse(releaseName)).to.deep.include({ language: "dubbed" });
    });

    it("should detect the truefrench language correctly", () => {
        const releaseName = "The Intern 2015 TRUEFRENCH 720p BluRay x264-PiNKPANTERS";

        expect(parse(releaseName)).to.deep.include({ language: "french" });
    });

    it("should detect the vff language correctly", () => {
        const releaseName = "After Earth 2013 VFF BDrip x264 YJ";

        expect(parse(releaseName)).to.deep.include({ language: "french" });
    });

    it("should detect the french language correctly", () => {
        const releaseName = "127.Heures.FRENCH.DVDRip.AC3.XViD-DVDFR";

        expect(parse(releaseName)).to.deep.include({ language: "french" });
    });

    it("should detect the vostfr language with lowercase correctly", () => {
        const releaseName = "Color.Of.Night.Unrated.DC.VostFR.BRrip.x264";

        expect(parse(releaseName)).to.deep.include({ language: "french" });
    });

    it("should detect the multi language correctly", () => {
        const releaseName = "Le Labyrinthe 2014 Multi-VF2 1080p BluRay x264-PopHD";

        expect(parse(releaseName)).to.deep.include({ language: "multi" });
    });

    it("should detect the VFI language correctly", () => {
        const releaseName = "Maman, j'ai raté l'avion 1990 VFI 1080p BluRay DTS x265-HTG";

        expect(parse(releaseName)).to.deep.include({ language: "french" });
    });

    it("should detect the italian language correctly", () => {
        const releaseName = "South.Park.S21E10.iTALiAN.FiNAL.AHDTV.x264-NTROPiC";

        expect(parse(releaseName)).to.deep.include({ language: "italian" });
    });

    it("should detect dub correctly", () => {
        const releaseName = "[Golumpa] Kochoki - 11 (Kochoki - Wakaki Nobunaga) [English Dub] [FuniDub 720p x264 AAC] [MKV] [4FA0D898]";

        expect(parse(releaseName)).to.deep.include({ language: "dubbed" });
    });

    it("should detect dub correctly", () => {
        const releaseName = "[Golumpa] Kochoki - 11 (Kochoki - Wakaki Nobunaga) [English Dub] [FuniDub 720p x264 AAC] [MKV] [4FA0D898]";

        expect(parse(releaseName)).to.deep.include({ language: "dubbed" });
    });

    it("should detect dubs correctly", () => {
        const releaseName = "[Aomori-Raws] Juushinki Pandora (01-13) [Dubs & Subs]";

        expect(parse(releaseName)).to.deep.include({ language: "dubbed" });
    });

    it("should detect dual audio correctly", () => {
        const releaseName = "[LostYears] Tsuredure Children (WEB 720p Hi10 AAC) [Dual-Audio]";

        expect(parse(releaseName)).to.deep.include({ language: "dubbed" });
    });

    it("should detect dual-audio correctly", () => {
        const releaseName = "[DB] Gamers! [Dual Audio 10bit 720p][HEVC-x265]";

        expect(parse(releaseName)).to.deep.include({ language: "dubbed" });
    });
});
