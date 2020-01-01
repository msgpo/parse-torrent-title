const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing episode", () => {
    it("should detect regular episode correctly", () => {
        const releaseName = "The Simpsons S28E21 720p HDTV x264-AVS";
        expect(parse(releaseName)).to.deep.include({ episode: 21 });
    });

    it("should detect regular episode with lowercase correctly", () => {
        const releaseName = "breaking.bad.s01e01.720p.bluray.x264-reward";
        expect(parse(releaseName)).to.deep.include({ episode: 1 });
    });

    it("should detect regular episode with a space between", () => {
        const releaseName = "Dragon Ball Super S01 E23 French 1080p HDTV H264-Kesni";
        expect(parse(releaseName)).to.deep.include({ episode: 23 });
    });

    it("should detect episode with SxEE format correctly", () => {
        const releaseName = "Doctor.Who.2005.8x11.Dark.Water.720p.HDTV.x264-FoV";
        expect(parse(releaseName)).to.deep.include({ episode: 11 });
    });

    it("should detect episode when written as such", () => {
        const releaseName = "Anubis saison 01 episode 38 tvrip FR";
        expect(parse(releaseName)).to.deep.include({ episode: 38 });
    });

    it("should detect episode when written as such shortened", () => {
        const releaseName = "Le Monde Incroyable de Gumball - Saison 5 Ep 14 - L'extérieur";
        expect(parse(releaseName)).to.deep.include({ episode: 14 });
    });

    it("should detect episode with parenthesis prefix and x separator", () => {
        const releaseName = "Smallville (1x02 Metamorphosis).avi";
        expect(parse(releaseName)).to.deep.include({ episode: 2 });
    });

    it("should detect episode when similar digits included", () => {
        const releaseName = "Friends.S07E20.The.One.With.Rachel's.Big.Kiss.720p.BluRay.2CH.x265.HEVC-PSA.mkv";
        expect(parse(releaseName)).to.deep.include({ season: 7, episode: 20 });
    });

    it("should detect episode when separated with x and inside brackets", () => {
        const releaseName = "Friends - [8x18] - The One In Massapequa.mkv";
        expect(parse(releaseName)).to.deep.include({ season: 8, episode: 18 });
    });

    it("should detect multiple episodes with x prefix and hyphen separator", () => {
        const releaseName = "Friends - [7x23-24] - The One with Monica and Chandler's Wedding + Audio Commentary.mkv";
        expect(parse(releaseName)).to.deep.include({ season: 7, episodes: [23, 24] });
    });

    it("should detect multiple episodes with episodes prefix and hyphen separator", () => {
        const releaseName = "Orange Is The New Black Season 5 Episodes 1-10 INCOMPLETE (LEAKED)";
        expect(parse(releaseName)).to.deep.include({ episodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
    });

    it("should detect multiple episodes with ep prefix and hyphen separator inside parentheses", () => {
        const releaseName = "Vikings.Season.05.Ep(01-10).720p.WebRip.2Ch.x265.PSA";
        expect(parse(releaseName)).to.deep.include({ episodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
    });

    it("should detect multiple episodes with e prefix and hyphen separator", () => {
        const releaseName = "Marvel's.Agents.of.S.H.I.E.L.D.S02E01-03.Shadows.1080p.WEB-DL.DD5.1";
        expect(parse(releaseName)).to.deep.include({ episodes: [1, 2, 3] });
    });

    it("should detect absolute episode with ep prefix", () => {
        const releaseName = "Naruto Shippuden Ep 107 - Strange Bedfellows.mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 107 });
    });

    it("should detect absolute episode in middle with hyphen dividers", () => {
        const releaseName = "Naruto Shippuden - 107 - Strange Bedfellows.mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 107 });
    });

    it("should detect absolute episode in middle with similar resolution value", () => {
        const releaseName = "[AnimeRG] Naruto Shippuden - 107 [720p] [x265] [pseudo].mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 107 });
    });

    it("should detect multiple absolute episodes separated by hyphen", () => {
        const releaseName = "Naruto Shippuuden - 006-007.mkv";
        expect(parse(releaseName)).to.deep.include({ episodes: [6, 7] });
    });

    it("should detect absolute episode correctly not hindered by title digits with hashtag", () => {
        const releaseName = "321 - Family Guy Viewer Mail #1.avi";
        expect(parse(releaseName)).to.deep.include({ episode: 321 });
    });

    it("should detect absolute episode correctly not hindered by title digits with apostrophe", () => {
        const releaseName = "512 - Airport '07.avi";
        expect(parse(releaseName)).to.deep.include({ episode: 512 });
    });

    it("should detect absolute episode at the begining even though its mixed with season", () => {
        const releaseName = "102 - The Invitation.avi";
        expect(parse(releaseName)).to.deep.include({ episode: 102 });
    });

    it("should detect absolute episode double digit at the beginning", () => {
        const releaseName = "02 The Invitation.mp4";
        expect(parse(releaseName)).to.deep.include({ episode: 2 });
    });

    it("should detect absolute episode triple digit at the beginning with zero padded", () => {
        const releaseName = "004 - Male Unbonding - [DVD].avi";
        expect(parse(releaseName)).to.deep.include({ episode: 4 });
    });

    it("should detect multiple absolute episodes separated by comma", () => {
        const releaseName = "The Amazing World of Gumball - 103, 104 - The Third - The Debt.mkv";
        expect(parse(releaseName)).to.deep.include({ episodes: [103, 104] });
    });

    it("should detect absolute episode with a possible match at the end", () => {
        const releaseName = "The Amazing World of Gumball - 103 - The End - The Dress (720p.x264.ac3-5.1) [449].mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 103 });
    });

    it("should detect absolute episode with a divided episode into a part", () => {
        const releaseName = "The Amazing World of Gumball - 107a - The Mystery (720p.x264.ac3-5.1) [449].mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 107 });
    });

    it("should detect absolute episode with a divided episode into b part", () => {
        const releaseName = "The Amazing World of Gumball - 107b - The Mystery (720p.x264.ac3-5.1) [449].mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 107 });
    });

    it("should detect episode withing brackets with dot separator", () => {
        const releaseName = "[5.01] Weight Loss.avi";
        expect(parse(releaseName)).to.deep.include({ episode: 1 });
    });

    it("should detect episode with spaces and hyphen separator", () => {
        const releaseName = "S01 - E03 - Fifty-Fifty.mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 3 });
    });

    it("should detect multiple episodes separated with plus", () => {
        const releaseName = "The Office S07E25+E26 Search Committee.mp4";
        expect(parse(releaseName)).to.deep.include({ episodes: [25, 26] });
    });

    it("[animeawake] Naruto Shippuden - 124 - Art_2.mkv", () => {
        const releaseName = "[animeawake] Naruto Shippuden - 124 - Art_2.mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 124 });
    });

    it("[animeawake] Naruto Shippuden - 072 - The Quietly Approaching Threat_2.mkv", () => {
        const releaseName = "[animeawake] Naruto Shippuden - 072 - The Quietly Approaching Threat_2.mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 72 });
    });

    it("[animeawake] Naruto Shippuden - 120 - Kakashi Chronicles. Boys' Life on the Battlefield. Part 2.mkv", () => {
        const releaseName = "[animeawake] Naruto Shippuden - 120 - Kakashi Chronicles. Boys' Life on the Battlefield. Part 2.mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 120 });
    });

    it("should detect single episode even when a possible range identifier hyphen is present", () => {
        const releaseName = "Supernatural - S03E01 - 720p BluRay x264-Belex - Dual Audio + Legenda.mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 1 });
    });

    it("should detect detect episodes when the range is for season", () => {
        const releaseName = "[F-D] Fairy Tail Season 1 -6 + Extras [480P][Dual-Audio]";
        expect(parse(releaseName)).to.not.have.property("episodes");
    });

    it("should detect detect episodes when the range is for seasons", () => {
        const releaseName = "House MD All Seasons (1-8) 720p Ultra-Compressed";
        expect(parse(releaseName)).to.not.have.property("episodes");
    });

    it("should detect detect episode with x separator and e prefix", () => {
        const releaseName = "24 - S01xE03.mp4";
        expect(parse(releaseName)).to.deep.include({ season: 1, episode: 3 });
    });

    it("should detect detect episode correctly and not episode range ", () => {
        const releaseName = "24 - S01E04 - x264 - dilpill.mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 4 });
    });

    it("should detect detect episode correctly and not episode range with two codecs", () => {
        const releaseName = "24.Legacy.S01E05.720p.HEVC.x265-MeGusta";
        expect(parse(releaseName)).to.deep.include({ episode: 5 });
    });

    it("should detect detect absolute episode with a version", () => {
        const releaseName = "[F-D] Fairy.Tail.-.004v2.-. [480P][Dual-Audio].mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 4 });
    });

    it("should detect detect absolute episode and not detect any season modifier", () => {
        const releaseName = "[a-s]_fairy_tail_-_003_-_infiltrate_the_everlue_mansion__rs2_[1080p_bd-rip][4CB16872].mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 3 });
        expect(parse(releaseName)).to.not.have.property("seasons");
    });

    it("should detect episode after season with separator", () => {
        const releaseName = "Food Wars! Shokugeki No Souma S4 - 11 (1080p)(HEVC x265 10bit)";
        expect(parse(releaseName)).to.deep.include({ episode: 11 });
    });

    it("should not detect episode range for mismatch episode marker e vs ep", () => {
        const releaseName = "Dragon Ball Super S05E53 - Ep.129.mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 53 });
    });

    it("should not detect episode range with other parameter ending", () => {
        const releaseName = "DShaun.Micallefs.MAD.AS.HELL.S10E03.576p.x642-YADNUM.mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 3 });
    });

    it("should episode with a dot and hyphen separator", () => {
        const releaseName = "My Little Pony FiM - 6.01 - No Second Prances.mkv";
        expect(parse(releaseName)).to.deep.include({ episode: 1 });
    });
});

