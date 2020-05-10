const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing audio", () => {
    it("should detect the dts audio correctly", () => {
        const releaseName = "Nocturnal Animals 2016 VFF 1080p BluRay DTS HEVC-HD2";

        expect(parse(releaseName)).to.deep.include({ audio: "dts" });
    });

    it("should detect the DTS-HD audio correctly", () => {
        const releaseName = "Gold 2016 1080p BluRay DTS-HD MA 5 1 x264-HDH";

        expect(parse(releaseName)).to.deep.include({ audio: "dts-hd" });
    });

    it("should detect the AAC audio correctly", () => {
        const releaseName = "Rain Man 1988 REMASTERED 1080p BRRip x264 AAC-m2g";

        expect(parse(releaseName)).to.deep.include({ audio: "aac" });
    });

    it("should convert the AAC2.0 audio to AAC", () => {
        const releaseName = "The Vet Life S02E01 Dunk-A-Doctor 1080p ANPL WEB-DL AAC2 0 H 264-RTN";

        expect(parse(releaseName)).to.deep.include({ audio: "aac" });
    });

    it("should detect the dd5 audio correctly", () => {
        const releaseName = "Jimmy Kimmel 2017 05 03 720p HDTV DD5 1 MPEG2-CTL";

        expect(parse(releaseName)).to.deep.include({ audio: "dd5.1" });
    });

    it("should detect the AC3 audio correctly", () => {
        const releaseName = "A Dog's Purpose 2016 BDRip 720p X265 Ac3-GANJAMAN";

        expect(parse(releaseName)).to.deep.include({ audio: "ac3" });
    });

    it("should convert the AC-3 audio to AC3", () => {
        const releaseName = "Retroactive 1997 BluRay 1080p AC-3 HEVC-d3g";

        expect(parse(releaseName)).to.deep.include({ audio: "ac3" });
    });

    it("should detect the mp3 audio correctly", () => {
        const releaseName = "Tempete 2016-TrueFRENCH-TVrip-H264-mp3";

        expect(parse(releaseName)).to.deep.include({ audio: "mp3" });
    });

    xit("should detect the MD audio correctly", () => {
        const releaseName = "Detroit.2017.BDRip.MD.GERMAN.x264-SPECTRE";

        expect(parse(releaseName)).to.deep.include({ audio: "md" });
    });

    it("should detect the eac3 5.1 audio correctly", () => {
        const releaseName = "The Blacklist S07E04 (1080p AMZN WEB-DL x265 HEVC 10bit EAC-3 5.1)[Bandi]";

        expect(parse(releaseName)).to.deep.include({ audio: "eac3" });
    });

    it("should detect the eac3 6.0 audio correctly", () => {
        const releaseName = "Condor.S01E03.1080p.WEB-DL.x265.10bit.EAC3.6.0-Qman[UTR].mkv";

        expect(parse(releaseName)).to.deep.include({ audio: "eac3" });
    });

    it("should detect the eac3 2.0 audio correctly 2", () => {
        const releaseName = "The 13 Ghosts of Scooby-Doo (1985) S01 (1080p AMZN Webrip x265 10bit EAC-3 2.0 - Frys) [TAoE]";

        expect(parse(releaseName)).to.deep.include({ audio: "eac3" });
    });
});
