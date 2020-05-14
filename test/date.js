const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing date", () => {
    it("Stephen Colbert 2019 10 25 Eddie Murphy 480p x264-mSD [eztv]", () => {
        const releaseName = "Stephen Colbert 2019 10 25 Eddie Murphy 480p x264-mSD [eztv]";

        expect(parse(releaseName)).to.deep.include({ date: "2019-10-25" });
    });

    it("Stephen Colbert 25/10/2019 Eddie Murphy 480p x264-mSD [eztv]", () => {
        const releaseName = "Stephen Colbert 2019 10 25 Eddie Murphy 480p x264-mSD [eztv]";

        expect(parse(releaseName)).to.deep.include({ date: "2019-10-25" });
    });

    it("Jimmy.Fallon.2020.02.14.Steve.Buscemi.WEB.x264-XLF[TGx]", () => {
        const releaseName = "Jimmy.Fallon.2020.02.14.Steve.Buscemi.WEB.x264-XLF[TGx]";

        expect(parse(releaseName)).to.deep.include({ date: "2020-02-14" });
    });

    it("The Young And The Restless - S43 E10986 - 2016-08-12", () => {
        const releaseName = "The Young And The Restless - S43 E10986 - 2016-08-12";

        expect(parse(releaseName)).to.deep.include({ date: "2016-08-12" });
    });

    it("Indias Best Dramebaaz 2 Ep 19 (13 Feb 2016) HDTV x264-AquoTube", () => {
        const releaseName = "Indias Best Dramebaaz 2 Ep 19 (13 Feb 2016) HDTV x264-AquoTube";

        expect(parse(releaseName)).to.deep.include({ date: "2016-02-13" });
    });

    it("07 2015 YR/YR 07-06-15.mp4", () => {
        const releaseName = "07 2015 YR/YR 07-06-15.mp4";

        expect(parse(releaseName)).to.deep.include({ date: "2015-07-06" });
    });

    it("SIX.S01E05.400p.229mb.hdtv.x264-][ Collateral ][ 16-Feb-2017 mp4", () => {
        const releaseName = "SIX.S01E05.400p.229mb.hdtv.x264-][ Collateral ][ 16-Feb-2017 mp4";

        expect(parse(releaseName)).to.deep.include({ date: "2017-02-16" });
    });

    it("SIX.S01E05.400p.229mb.hdtv.x264-][ Collateral ][ 16-Feb-17 mp4", () => {
        const releaseName = "SIX.S01E05.400p.229mb.hdtv.x264-][ Collateral ][ 16-Feb-17 mp4";

        expect(parse(releaseName)).to.deep.include({ date: "2017-02-16" });
    });

    it("WWE Smackdown - 11/21/17 - 21st November 2017 - Full Show", () => {
        const releaseName = "WWE Smackdown - 11/21/17 - 21st November 2017 - Full Show";

        expect(parse(releaseName)).to.deep.include({ date: "2017-11-21" });
    });

    it("WWE Smackdown - 11/21/17 - 21st November 2017 - Full Show", () => {
        const releaseName = "WWE Smackdown - 11/21/17 - 21st November 2017 - Full Show";

        expect(parse(releaseName)).to.deep.include({ date: "2017-11-21" });
    });

    it("WWE RAW 9th Dec 2019 WEBRip h264-TJ [TJET]", () => {
        const releaseName = "WWE RAW 9th Dec 2019 WEBRip h264-TJ [TJET]";

        expect(parse(releaseName)).to.deep.include({ date: "2019-12-09" });
    });

    it("WWE RAW 1st Dec 2019 WEBRip h264-TJ [TJET]", () => {
        const releaseName = "WWE RAW 1st Dec 2019 WEBRip h264-TJ [TJET]";

        expect(parse(releaseName)).to.deep.include({ date: "2019-12-01" });
    });

    it("WWE RAW 2nd Dec 2019 WEBRip h264-TJ [TJET]", () => {
        const releaseName = "WWE RAW 2nd Dec 2019 WEBRip h264-TJ [TJET]";

        expect(parse(releaseName)).to.deep.include({ date: "2019-12-02" });
    });

    it("WWE RAW 3rd Dec 2019 WEBRip h264-TJ [TJET]", () => {
        const releaseName = "WWE RAW 3rd Dec 2019 WEBRip h264-TJ [TJET]";

        expect(parse(releaseName)).to.deep.include({ date: "2019-12-03" });
    });

    it("EastEnders_20200116_19302000.mp4", () => {
        const releaseName = "EastEnders_20200116_19302000.mp4";

        expect(parse(releaseName)).to.deep.include({ date: "2020-01-16" });
    });
});
