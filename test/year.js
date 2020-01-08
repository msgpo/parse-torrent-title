const { expect } = require("chai");
const parse = require("../index").parse;

describe("Paring year", () => {
    it("should detect the year correctly", () => {
        const releaseName = "Dawn.of.the.Planet.of.the.Apes.2014.HDRip.XViD-EVO";

        expect(parse(releaseName)).to.deep.include({ year: 2014 });
    });

    it("should detect the year within braces correctly", () => {
        const releaseName = "Hercules (2014) 1080p BrRip H264 - YIFY";

        expect(parse(releaseName)).to.deep.include({ year: 2014 });
    });

    it("should detect the year within brackets correctly", () => {
        const releaseName = "One Shot [2014] DVDRip XViD-ViCKY";

        expect(parse(releaseName)).to.deep.include({ year: 2014 });
    });

    it("should detect the year but not the title if the title is a year", () => {
        const releaseName = "2012 2009 1080p BluRay x264 REPACK-METiS";

        expect(parse(releaseName)).to.deep.include({ year: 2009 });
    });

    it("should detect the year at the beginning if there is none", () => {
        const releaseName = "2008 The Incredible Hulk Feature Film.mp4'";
        expect(parse(releaseName)).to.deep.include({ year: 2008 });
    });

    it("should detect the year range", () => {
        const releaseName = "Harry Potter All Movies Collection 2001-2011 720p Dual KartiKing'";
        expect(parse(releaseName)).to.deep.include({ year: "2001-2011" });
    });

    it("should detect year range with simplified end year", () => {
        const releaseName = "Empty Nest Season 1 (1988 - 89) fiveofseven";
        expect(parse(releaseName)).to.deep.include({ year: "1988-1989" });
    });
});
