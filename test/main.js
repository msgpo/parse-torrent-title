const { expect } = require("chai");
const parse = require("../index").parse;

describe("Random releases", () => {
    it("sons.of.anarchy.s05e10.480p.BluRay.x264-GAnGSteR", () => {
        const releaseName = "sons.of.anarchy.s05e10.480p.BluRay.x264-GAnGSteR";

        expect(parse(releaseName)).to.deep.equal({
            title: "sons of anarchy",
            resolution: "480p",
            season: 5,
            episode: 10,
            source: "BluRay",
            codec: "x264",
            group: "GAnGSteR",
        });
    });

    it("Color.Of.Night.Unrated.DC.VostFR.BRrip.x264", () => {
        const releaseName = "Color.Of.Night.Unrated.DC.VostFR.BRrip.x264";

        expect(parse(releaseName)).to.deep.equal({
            title: "Color Of Night",
            unrated: true,
            language: "vostfr",
            source: "BRRip",
            codec: "x264",
        });
    });

    it("Da Vinci Code DVDRip", () => {
        const releaseName = "Da Vinci Code DVDRip";

        expect(parse(releaseName)).to.deep.equal({
            title: "Da Vinci Code",
            source: "DVDRip",
        });
    });

    it("Some.girls.1998.DVDRip", () => {
        const releaseName = "Some.girls.1998.DVDRip";

        expect(parse(releaseName)).to.deep.equal({
            title: "Some girls",
            source: "DVDRip",
            year: 1998,
        });
    });

    it("Ecrit.Dans.Le.Ciel.1954.MULTI.DVDRIP.x264.AC3-gismo65", () => {
        const releaseName = "Ecrit.Dans.Le.Ciel.1954.MULTI.DVDRIP.x264.AC3-gismo65";

        expect(parse(releaseName)).to.deep.equal({
            title: "Ecrit Dans Le Ciel",
            source: "DVDRip",
            year: 1954,
            language: "multi",
            codec: "x264",
            audio: "ac3",
            group: "gismo65",
        });
    });

    it("2019 After The Fall Of New York 1983 REMASTERED BDRip x264-GHOULS", () => {
        const releaseName = "2019 After The Fall Of New York 1983 REMASTERED BDRip x264-GHOULS";

        expect(parse(releaseName)).to.deep.equal({
            title: "2019 After The Fall Of New York",
            source: "BDRip",
            remastered: true,
            year: 1983,
            codec: "x264",
            group: "GHOULS",
        });
    });

    it("Ghost In The Shell 2017 720p HC HDRip X264 AC3-EVO", () => {
        const releaseName = "Ghost In The Shell 2017 720p HC HDRip X264 AC3-EVO";

        expect(parse(releaseName)).to.deep.equal({
            title: "Ghost In The Shell",
            source: "HDRip",
            hardcoded: true,
            year: 2017,
            resolution: "720p",
            codec: "x264",
            audio: "ac3",
            group: "EVO",
        });
    });

    it("Rogue One 2016 1080p BluRay x264-SPARKS", () => {
        const releaseName = "Rogue One 2016 1080p BluRay x264-SPARKS";

        expect(parse(releaseName)).to.deep.equal({
            title: "Rogue One",
            source: "BluRay",
            year: 2016,
            resolution: "1080p",
            codec: "x264",
            group: "SPARKS",
        });
    });

    it("Desperation 2006 Multi Pal DvdR9-TBW1973", () => {
        const releaseName = "Desperation 2006 Multi Pal DvdR9-TBW1973";

        expect(parse(releaseName)).to.deep.equal({
            title: "Desperation",
            source: "DVD",
            year: 2006,
            language: "multi",
            region: "R9",
            group: "TBW1973",
        });
    });

    it("Maman, j'ai raté l'avion 1990 VFI 1080p BluRay DTS x265-HTG", () => {
        const releaseName = "Maman, j'ai raté l'avion 1990 VFI 1080p BluRay DTS x265-HTG";

        expect(parse(releaseName)).to.deep.equal({
            title: "Maman, j'ai raté l'avion",
            source: "BluRay",
            year: 1990,
            audio: "dts",
            resolution: "1080p",
            language: "vfi",
            codec: "x265",
            group: "HTG",
        });
    });
});
