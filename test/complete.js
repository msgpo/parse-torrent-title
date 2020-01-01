const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing complete collection", () => {
    it("should detect complete series with full seasons", () => {
        const releaseName = "[Furi] Avatar - The Last Airbender [720p] (Full 3 Seasons + Extr";
        expect(parse(releaseName)).to.deep.include({ complete: true });
    });

    it("should detect complete collection", () => {
        const releaseName = "Harry.Potter.Complete.Collection.2001-2011.1080p.BluRay.DTS-ETRG";
        expect(parse(releaseName)).to.deep.include({ complete: true });
    });

    it("should detect complete collection with all seasons", () => {
        const releaseName = "Game of Thrones All 7 Seasons 1080p ~∞~ .HakunaMaKoko";
        expect(parse(releaseName)).to.deep.include({ complete: true });
    });

    it("should detect complete collection with full series", () => {
        const releaseName = "Avatar: The Last Airbender Full Series 720p";
        expect(parse(releaseName)).to.deep.include({ complete: true });
    });

    it("should detect complete collection with ultimate collection", () => {
        const releaseName = "Dora the Explorer - Ultimate Collection";
        expect(parse(releaseName)).to.deep.include({ complete: true });
    });

    it("should detect complete collection with complete pack", () => {
        const releaseName = "Mr Bean Complete Pack (Animated, Tv series, 2 Movies) DVDRIP (WA";
        expect(parse(releaseName)).to.deep.include({ complete: true });
    });

    it("should detect complete collection with complete set", () => {
        const releaseName = "American Pie - Complete set (8 movies) 720p mkv - YIFY";
        expect(parse(releaseName)).to.deep.include({ complete: true });
    });

    it("should detect complete collection with complete filmography", () => {
        const releaseName = "Charlie Chaplin - Complete Filmography (87 movies)";
        expect(parse(releaseName)).to.deep.include({ complete: true });
    });

    it("should detect complete collection with movies complete", () => {
        const releaseName = "Monster High Movies Complete 2014";
        expect(parse(releaseName)).to.deep.include({ complete: true });
    });

    it("should detect complete collection all movies", () => {
        const releaseName = "Harry Potter All Movies Collection 2001-2011 720p Dual KartiKing";
        expect(parse(releaseName)).to.deep.include({ complete: true });
    });
});

