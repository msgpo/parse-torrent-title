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
});

