const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing title", () => {
    it("should return the title", () => {
        const releaseName = "La famille bélier";

        expect(parse(releaseName)).to.deep.include({ title: "La famille bélier" });
    });

    it("should remove dots", () => {
        const releaseName = "La.famille.bélier";

        expect(parse(releaseName)).to.deep.include({ title: "La famille bélier" });
    });

    it("should not remove dots when they are part of the title", () => {
        const releaseName = "Mr. Nobody";

        expect(parse(releaseName)).to.deep.include({ title: "Mr. Nobody" });
    });

    it("should remove underscores", () => {
        const releaseName = "doctor_who_2005.8x12.death_in_heaven.720p_hdtv_x264-fov";

        expect(parse(releaseName)).to.deep.include({ title: "doctor who" });
    });

    it("should remove unnecessary translations", () => {
        const releaseName = "[GM-Team][国漫][太乙仙魔录 灵飞纪 第3季][Magical Legend of Rise to immortality Ⅲ][01-26][AVC][GB][1080P]";
        expect(parse(releaseName)).to.deep.include({ title: "Magical Legend of Rise to immortality Ⅲ" });
    });

    it("should remove unnecessary translations not included in brackets", () => {
        const releaseName = "【喵萌奶茶屋】★01月新番★[Rebirth][01][720p][简体][招募翻译]";
        expect(parse(releaseName)).to.deep.include({ title: "Rebirth" });
    });

    it("should remove japanese alt titles", () => {
        const releaseName = "【喵萌奶茶屋】★01月新番★[別對映像研出手！/映像研には手を出すな！/Eizouken ni wa Te wo Dasu na!][01][1080p][繁體]";
        expect(parse(releaseName)).to.deep.include({ title: "Eizouken ni wa Te wo Dasu na!" });
    });

    it("should remove japanese alt titles when the main one is in the middle", () => {
        const releaseName = "【喵萌奶茶屋】★01月新番★[別對映像研出手！/Eizouken ni wa Te wo Dasu na!/映像研には手を出すな！][01][1080p][繁體]";
        expect(parse(releaseName)).to.deep.include({ title: "Eizouken ni wa Te wo Dasu na!" });
    });

    it("should remove japanese alt titles without separators", () => {
        const releaseName = "[Seed-Raws] 劇場版 ペンギン・ハイウェイ Penguin Highway The Movie (BD 1280x720 AVC AACx4 [5.1+2.0+2.0+2.0]).mp4";
        expect(parse(releaseName)).to.deep.include({ title: "Penguin Highway The Movie" });
    });

    it("should not split slash separated title", () => {
        const releaseName = "[SweetSub][Mutafukaz / MFKZ][Movie][BDRip][1080P][AVC 8bit][简体内嵌]";
        expect(parse(releaseName)).to.deep.include({ title: "Mutafukaz / MFKZ" });
    });

    it("should clean release group tag title", () => {
        const releaseName = "[Erai-raws] Kingdom 3rd Season - 02 [1080p].mkv";
        expect(parse(releaseName)).to.deep.include({ title: "Kingdom" });
    });

    it("should detect remove russian alt title", () => {
        const releaseName = "Голубая волна / Blue Crush (2002) DVDRip";
        expect(parse(releaseName)).to.deep.include({ title: "Blue Crush" });
    });

    it("should detect remove non english title if its the only thing left", () => {
        const releaseName = "Жихарка (2007) DVDRip";
        expect(parse(releaseName)).to.deep.include({ title: "Жихарка" });
    });

    it("should clear russian cast info from title", () => {
        const releaseName = "Американские животные / American Animals (Барт Лэйтон / Bart Layton) [2018, Великобритания, США, драма, криминал, BDRip] MVO (СВ Студия)";
        expect(parse(releaseName)).to.deep.include({ title: "American Animals" });
    });

    it("should detect title even when year is in beginning with paranthesis", () => {
        const releaseName = "(2000) Le follie dell'imperatore - The Emperor's New Groove (DvdRip Ita Eng AC3 5.1).avi";
        expect(parse(releaseName)).to.deep.include({ title: "Le follie dell'imperatore - The Emperor's New Groove" });
    });
});
