const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing source", () => {
    it("should detect the Bluray source correctly", () => {
        const releaseName = "Nocturnal Animals 2016 VFF 1080p BluRay DTS HEVC-HD2";
        expect(parse(releaseName)).to.deep.include({ source: "BluRay" });
    });

    it("should detect the HDTV source correctly", () => {
        const releaseName = "doctor_who_2005.8x12.death_in_heaven.720p_hdtv_x264-fov";
        expect(parse(releaseName)).to.deep.include({ source: "HDTV" });
    });

    it("should detect the DVDRip source correctly", () => {
        const releaseName = "A Stable Life S01E01 DVDRip x264-Ltu";
        expect(parse(releaseName)).to.deep.include({ source: "DVDRip" });
    });

    it("should detect the Web-DL source correctly", () => {
        const releaseName = "The Vet Life S02E01 Dunk-A-Doctor 1080p ANPL WEB-DL AAC2 0 H 264-RTN";
        expect(parse(releaseName)).to.deep.include({ source: "WEB-DL" });
    });

    it("should detect the WebRip source correctly", () => {
        const releaseName = "Brown Nation S01E05 1080p WEBRip x264-JAWN";
        expect(parse(releaseName)).to.deep.include({ source: "WEBRip" });
    });

    it("should detect the TeleSync source correctly", () => {
        const releaseName = "Star Wars The Last Jedi 2017 TeleSync AAC x264-MiniMe";
        expect(parse(releaseName)).to.deep.include({ source: "TeleSync" });
    });

    it("should detect the DVDScr source correctly", () => {
        const releaseName = "The.Shape.of.Water.2017.DVDScr.XVID.AC3.HQ.Hive-CM8";
        expect(parse(releaseName)).to.deep.include({ source: "DVDScr" });
    });

    it("should detect the PPVRip source correctly", () => {
        const releaseName = "Cloudy With A Chance Of Meatballs 2 2013 720p PPVRip x264 AAC-FooKaS";
        expect(parse(releaseName)).to.deep.include({ source: "PPVRip" });
    });

    it("should detect the WEBMux source correctly", () => {
        const releaseName = "The.OA.1x08.L.Io.Invisibile.ITA.WEBMux.x264-UBi.mkv";
        expect(parse(releaseName)).to.deep.include({ source: "WEBMux" });
    });
});

