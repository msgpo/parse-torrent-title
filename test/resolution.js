const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing resolution", () => {
    it("should detect the 1080p resolution correctly", () => {
        const releaseName = "Annabelle.2014.1080p.PROPER.HC.WEBRip.x264.AAC.2.0-RARBG";

        expect(parse(releaseName)).to.deep.include({ resolution: "1080p" });
    });

    it("should detect the 720p resolution correctly", () => {
        const releaseName = "doctor_who_2005.8x12.death_in_heaven.720p_hdtv_x264-fov";

        expect(parse(releaseName)).to.deep.include({ resolution: "720p" });
    });

    it("should detect the 720p resolution with uppercase correctly", () => {
        const releaseName = "UFC 187 PPV 720P HDTV X264-KYR";

        expect(parse(releaseName)).to.deep.include({ resolution: "720p" });
    });

    it("should detect the 4k resolution correctly", () => {
        const releaseName = "The Smurfs 2 2013 COMPLETE FULL BLURAY UHD (4K) - IPT EXCLUSIVE";

        expect(parse(releaseName)).to.deep.include({ resolution: "4k" });
    });

    it("should detect the 2160p as 4k", () => {
        const releaseName = "Joker.2019.2160p.4K.BluRay.x265.10bit.HDR.AAC5.1";

        expect(parse(releaseName)).to.deep.include({ resolution: "4k" });
    });

    it("should detect custom resolution correctly", () => {
        const releaseName = "[JacobSwaggedUp] Kizumonogatari I: Tekketsu-hen (BD 1280x544) [MP4 Movie]";

        expect(parse(releaseName)).to.deep.include({ resolution: "544p" });
    });

    it("should detect 720i resolution and format as 720p", () => {
        const releaseName = "UFC 187 PPV 720i HDTV X264-KYR";

        expect(parse(releaseName)).to.deep.include({ resolution: "720p" });
    });

    it("should detect typo in 720p", () => {
        const releaseName = "IT Chapter Two.2019.7200p.AMZN WEB-DL.H264.[Eng Hin Tam Tel]DDP 5.1.MSubs.D0T.Telly";

        expect(parse(releaseName)).to.deep.include({ resolution: "720p" });
    });

    it("should detect typo in 1080p", () => {
        const releaseName = "Dumbo (1941) BRRip XvidHD 10800p-NPW";

        expect(parse(releaseName)).to.deep.include({ resolution: "1080p" });
    });
});
