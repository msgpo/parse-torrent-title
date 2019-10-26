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
});

