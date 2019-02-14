const { value, integer, boolean, lowercase, range, array } = require("./transformers");

exports.addDefaults = /** @type Parser */ parser => {

    // Year
    parser.addHandler("year", /(?!^)[([]?((?:19[0-9]|20[012])[0-9])[)\]]?/, integer);

    // Resolution
    parser.addHandler("resolution", /([0-9]{3,4}[pi])/i, lowercase);
    parser.addHandler("resolution", /(4k)/i, lowercase);

    // Extended
    parser.addHandler("extended", /EXTENDED/, boolean);

    // Convert
    parser.addHandler("convert", /CONVERT/, boolean);

    // Hardcoded
    parser.addHandler("hardcoded", /HC|HARDCODED/, boolean);

    // Proper
    parser.addHandler("proper", /(?:REAL.)?PROPER/, boolean);

    // Repack
    parser.addHandler("repack", /REPACK|RERIP/, boolean);

    // Retail
    parser.addHandler("retail", /\bRetail\b/i, boolean);

    // Remastered
    parser.addHandler("remastered", /\bRemaster(?:ed)?\b/i, boolean);

    // Unrated
    parser.addHandler("unrated", /\bunrated|uncensored\b/i, boolean);

    // Region
    parser.addHandler("region", /R[0-9]/);

    // Container
    parser.addHandler("container", /\b(MKV|AVI|MP4|WMV|MPG|MPEG)\b/i, lowercase);

    // Source
    parser.addHandler("source", /\b(?:HD-?)?CAM\b/);
    parser.addHandler("source", /\b(?:HD-?)?T(?:ELE)?S(?:YNC)?\b/i);
    parser.addHandler("source", /\bHD-?Rip\b/i);
    parser.addHandler("source", /\bBRRip\b/i, value("BRRip"));
    parser.addHandler("source", /\bBDRip\b/i, value("BDRip"));
    parser.addHandler("source", /\bDVDRip\b/i, value("DVDRip"));
    parser.addHandler("source", /\bDVD(?:R[0-9])?\b/i, value("DVD"));
    parser.addHandler("source", /\bDVD?Scr\b/i, value("DVDScr"));
    parser.addHandler("source", /\b(?:HD-?)?TVRip\b/i);
    parser.addHandler("source", /\bTC\b/, value("TC"));
    parser.addHandler("source", /\bPPVRip\b/i, value("PPVRip"));
    parser.addHandler("source", /\bTVRips?\b/i, value("TVRip"));
    parser.addHandler("source", /\bR5\b/i, value("R5"));
    parser.addHandler("source", /\bVHSScr\b/i, value("VHSScr"));
    parser.addHandler("source", /\bBluRay\b/i, value("BluRay"));
    parser.addHandler("source", /\bWEB-?DL\b/i, value("WEB-DL"));
    parser.addHandler("source", /\bWEB-?Rip\b/i, value("WEBRip"));
    parser.addHandler("source", /\b(?:DL|WEB|BD|BR)MUX\b/i);
    parser.addHandler("source", /\b(DivX|XviD)\b/);
    parser.addHandler("source", /\bHDTV\b/i, value("HDTV"));

    // Codec
    parser.addHandler("codec", /dvix|mpeg2|divx|xvid|[xh][-. ]?26[45]|avc|hevc/i, lowercase);
    parser.addHandler("codec", ({ result }) => {
        if (result.codec) {
            result.codec = result.codec.replace(/[ .-]/, "");
        }
    });

    // Audio
    parser.addHandler("audio", /MD|MP3|mp3|FLAC|Atmos|DTS(?:-HD)?|TrueHD/, lowercase);
    parser.addHandler("audio", /Dual[- ]Audio/i, lowercase);
    parser.addHandler("audio", /AC-?3(?:[.-]5\.1)?/i, value("ac3"));
    parser.addHandler("audio", /DD5[. ]?1/i, value("dd5.1"));
    parser.addHandler("audio", /AAC(?:[. ]?2[. ]0)?/, value("aac"));

    // Group
    parser.addHandler("group", /- ?([^\-. ]+)$/);

    // Season
    parser.addHandler("season", /((?:s\d{1,2}[., +/\\&-]+)+s\d{1,2}\b)/i, range);
    parser.addHandler("season", /(?:\bcomplete\W)?\bseasons?\b[. -]?[([]?((?:\d{1,2}[., /\\&-]+)+\d{1,2}\b)[)\]]?/i, range);
    parser.addHandler("season", /(?:\bcomplete\W)?\bseasons?\b[. -]?(\d{1,2}[. -]?(?:to|thru|and|\+|:)[. -]?\d{1,2})\b/i, range);
    parser.addHandler("season", /(?:\bcomplete\W)?(?:saison|season)[. -]?(\d{1,2})/i, integer);
    parser.addHandler("season", /(?:\bcomplete\W)?s(\d{1,2})(?:[\Wex]|$)/i, integer, { skipIfAlreadyFound: false });
    parser.addHandler("season", /(\d{1,2})x\d{1,2}/, integer);
    parser.addHandler("season", /[[(](\d{1,2})\.\d{1,2}[)\]]/, integer);

    // Episode
    parser.addHandler("episode", /(?:[\W\d]|^)[ex]p?(?:isode)?s?[ .]?[([]?(\d{1,3}(?:[ .-]*[ex&-]p?[ .]?\d{1,3})+)(?:\D|$)/i, range);
    parser.addHandler("episode", /(?:[s .([-]|^)\d{1,2}[. -]*[ex]p?[. ]?(\d{1,2})(?:\D|$)/i, integer);
    parser.addHandler("episode", /(?:[ .([-]|^)(\d{1,3}(?:[ .]?[,&-][ .]?\d{1,3})+)(?:[ .)\]-]|$)/i, range);
    parser.addHandler("episode", /[ée]p(?:isode)?[. -]?(\d{1,3})(?:\D|$)/i, integer);
    parser.addHandler("episode", /[[(]\d{1,2}\.(\d{1,2})[)\]]/, integer);

    // can be both absolute episode and season+episode in format 101
    parser.addHandler("episode", ({ title, result, matched }) => {
        if (!result.season && !result.episode) {
            const indexes = [matched.resolution, matched.source, matched.codec, matched.audio]
                .filter(component => component)
                .map(component => title.indexOf(component))
                .filter(index => index > 0);
            const endIndex = Math.min(...indexes, title.length);
            const match = title.substring(0, endIndex).match(/(?:[ .([-]|^)(\d{1,3})[ab]?(?:[ .(\]-]|$)/g);
            if (match) {
                result.episode = (match.length > 1 ? match.splice(1, match.length) : match)
                    .map(group => group.replace(/\D/g, ""))
                    .map(group => parseInt(group, 10));
                result.episode = result.episode.length === 1 ? result.episode[0] : result.episode;
            }
        }
    });

    parser.addHandler("complete", /\b(?:complete|collection|dvd)?\b[ .]?\bbox[ .-]?set\b/i, boolean);
    parser.addHandler("complete", /\b(?:complete|collection|dvd)?\b[ .]?\bmini[ .-]?series\b/i, boolean);
    parser.addHandler("complete", /\b(?:complete|full|all)\b.*\b(?:series|seasons|collection)\b/i, boolean);
    parser.addHandler("complete", /\bseries\b[ .]\b(?:complete|collection)\b/i, boolean);
    parser.addHandler("complete", /\bseasons\b[ .]\b(?:complete|collection)\b/i, boolean);

    // Language
    parser.addHandler("language", /\bRUS\b/i, lowercase);
    parser.addHandler("language", /\bNL\b/, lowercase);
    parser.addHandler("language", /\bFLEMISH\b/, lowercase);
    parser.addHandler("language", /\bGERMAN\b/, lowercase);
    parser.addHandler("language", /\bDUBBED\b/, lowercase);
    parser.addHandler("language", /\b(ITA(?:LIAN)?|iTALiAN)\b/, value("ita"));
    parser.addHandler("language", /\bFR(?:ENCH)?\b/, lowercase);
    parser.addHandler("language", /\bTruefrench|VF(?:[FI])\b/i, lowercase);
    parser.addHandler("language", /\bVOST(?:(?:F(?:R)?)|A)?|SUBFRENCH\b/i, lowercase);
    parser.addHandler("language", /\bMULTi(?:Lang|-VF2)?\b/i, lowercase);
};
