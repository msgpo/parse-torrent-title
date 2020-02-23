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

    it("should detect the BD source correctly", () => {
        const releaseName = "[UsifRenegade] Cardcaptor Sakura [BD][Remastered][1080p][HEVC_10Bit][Dual] + Movies";
        expect(parse(releaseName)).to.deep.include({ source: "BDRip" });
    });

    it("should detect the BD-RM source correctly", () => {
        const releaseName = "[UsifRenegade] Cardcaptor Sakura - 54 [BD-RM][1080p][x265_10Bit][Dual_AAC].mkv";
        expect(parse(releaseName)).to.deep.include({ source: "BDRip" });
    });

    it("should detect the UHDrip source correctly", () => {
        const releaseName = "Bohemian Rhapsody 2018.2160p.UHDrip.x265.HDR.DD+.5.1-DTOne";
        expect(parse(releaseName)).to.deep.include({ source: "UHDRip" });
    });

    it("should detect the UltraHD source correctly", () => {
        const releaseName = "Blade.Runner.2049.2017.4K.UltraHD.BluRay.2160p.x264.TrueHD.Atmos";
        expect(parse(releaseName)).to.deep.include({ source: "UHDRip" });
    });

    it("should detect the UHD source correctly", () => {
        const releaseName = "Terminator.Dark.Fate.2019.2160p.UHD.BluRay.X265.10bit.HDR.TrueHD";
        expect(parse(releaseName)).to.deep.include({ source: "UHDRip" });
    });

    it("should detect the HDR source correctly", () => {
        const releaseName = "The.Mandalorian.S01E06.4K.HDR.2160p 4.42GB";
        expect(parse(releaseName)).to.deep.include({ source: "HDRip" });
    });
});

