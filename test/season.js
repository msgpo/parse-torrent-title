const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing season", () => {
    it("should detect regular season correctly", () => {
        const releaseName = "The Simpsons S28E21 720p HDTV x264-AVS";
        expect(parse(releaseName)).to.deep.include({ season: 28 });
    });

    it("should detect regular season with lowercase correctly", () => {
        const releaseName = "breaking.bad.s01e01.720p.bluray.x264-reward";
        expect(parse(releaseName)).to.deep.include({ season: 1 });
    });

    it("should detect regular episode with a space between", () => {
        const releaseName = "Dragon Ball Super S01 E23 French 1080p HDTV H264-Kesni";
        expect(parse(releaseName)).to.deep.include({ season: 1 });
    });

    it("should detect season with SxEE format correctly", () => {
        const releaseName = "Doctor.Who.2005.8x11.Dark.Water.720p.HDTV.x264-FoV";
        expect(parse(releaseName)).to.deep.include({ season: 8 });
    });

    it("should detect season when written as such", () => {
        const releaseName = "Orange Is The New Black Season 5 Episodes 1-10 INCOMPLETE (LEAKED)";
        expect(parse(releaseName)).to.deep.include({ season: 5 });
    });

    it("should detect multiple seasons separated with comma", () => {
        const releaseName = "Game Of Thrones Complete Season 1,2,3,4,5,6,7 406p mkv + Subs";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2, 3, 4, 5, 6, 7] });
    });

    it("should detect multiple seasons separated with space with redundant digit suffix", () => {
        const releaseName = "Futurama Season 1 2 3 4 5 6 7 + 4 Movies - threesixtyp";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2, 3, 4, 5, 6, 7] });
    });

    it("should detect multiple season separated with spaces and comma", () => {
        const releaseName = "Breaking Bad Complete Season 1 , 2 , 3, 4 ,5 ,1080p HEVC";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2, 3, 4, 5] });
    });

    it("should detect multiple season separated with comma. space and and symbol at the end", () => {
        const releaseName = "True Blood Season 1, 2, 3, 4, 5 & 6 + Extras BDRip TSV";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2, 3, 4, 5, 6] });
    });

    it("should detect multiple seasons separated with space", () => {
        const releaseName = "The Simpsons Season 20 21 22 23 24 25 26 27 - threesixtyp";
        expect(parse(releaseName)).to.deep.include({ season: [20, 21, 22, 23, 24, 25, 26, 27] });
    });

    it("should detect multiple seasons with with unequal separators", () => {
        const releaseName = "The Boondocks Season 1, 2 & 3";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2, 3] });
    });

    it("should detect multiple seasons with with space and plus symbol", () => {
        const releaseName = "Boondocks, The - Seasons 1 + 2";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2] });
    });

    it("should detect multiple seasons with implied range without s prefix", () => {
        const releaseName = "The Boondocks Seasons 1-4 MKV";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2, 3, 4] });
    });

    it("should detect multiple seasons separated with space plus and symbol", () => {
        const releaseName = "The Expanse Complete Seasons 01 & 02 1080p";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2] });
    });

    it("should detect multiple seasons with s prefix and implied range", () => {
        const releaseName = "Friends.Complete.Series.S01-S10.720p.BluRay.2CH.x265.HEVC-PSA";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
    });

    it("should detect multiple seasons with s prefix separated with hyphen", () => {
        const releaseName = "Skam.S01-S02-S03.SweSub.720p.WEB-DL.H264";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2, 3] });
    });

    it("should detect detect correct title with multiple season definitions", () => {
        const releaseName = "Seinfeld S02 Season 2 720p WebRip ReEnc-DeeJayAhmed";
        expect(parse(releaseName)).to.deep.include({ title: "Seinfeld", season: 2 });
    });

    it("should detect correct title with multiple season definitions", () => {
        const releaseName = "Seinfeld Season 2 S02 720p AMZN WEBRip x265 HEVC Complete";
        expect(parse(releaseName)).to.deep.include({ title: "Seinfeld", season: 2 });
    });

    it("should detect multiple season when given implied range inside parenthesis without s prefix", () => {
        const releaseName = "House MD All Seasons (1-8) 720p Ultra-Compressed";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2, 3, 4, 5, 6, 7, 8] });
    });


    it("should detect multiple season when given implied range with season prefix", () => {
        const releaseName = "Teen Titans Season 1-5";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2, 3, 4, 5] });
    });

    it("should detect multiple season when given implied range y words with season prefix", () => {
        const releaseName = "Game Of Thrones - Season 1 to 6 (Eng Subs)";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2, 3, 4, 5, 6] });
    });

    it("should detect multiple season with and separator", () => {
        const releaseName = "Travelers - Seasons 1 and 2 - Mp4 x264 AC3 1080p";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2] });
    });

    it("should detect multiple season when given implied range separated with colon", () => {
        const releaseName = "Naruto Shippuden Season 1:11";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] });
    });

    it("should detect multiple season when title is with numbers", () => {
        const releaseName = "24 Season 1-8 Complete with Subtitles";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2, 3, 4, 5, 6, 7, 8] });
    });

    it("should detect complete series with season count in between", () => {
        const releaseName = "[Furi] Avatar - The Last Airbender [720p] (Full 3 Seasons + Extr";
        expect(parse(releaseName)).to.deep.include({ season: [1, 2, 3] });
    });
});

