const { value, integer, boolean, lowercase, date, range, yearRange, array } = require("./transformers");

exports.addDefaults = /** @type Parser */ parser => {

    // Resolution
    parser.addHandler("resolution", /\b[([]?4k[)\]]?\b/i, value("4k"), { remove: true });
    parser.addHandler("resolution", /2160[pi]/i, value("4k"), { skipIfAlreadyFound: false, remove: true });
    parser.addHandler("resolution", /[([]?3840x2160[)\]]?/i, value("4k"), { remove: true });
    parser.addHandler("resolution", /[([]?\d{3,4}x(\d{3,4})[)\]]?/i, value("$1p"), { remove: true });
    parser.addHandler("resolution", /([0-9]{3,4})[pi]/i, value("$1p"), { remove: true });

    // Year
    parser.addHandler("date", /(?<=\W|^)([([]?(?:19[6-9]|20[012])[0-9][. -/\\](?:0[1-9]|1[012])[. -/\\](?:0[1-9]|[12][0-9]|3[01])[)\]]?)(?=\W|$)/, date("YYYY MM DD"), { remove: true });
    parser.addHandler("date", /(?<=\W|^)([([]?(?:0[1-9]|[12][0-9]|3[01])[. -/\\](?:0[1-9]|1[012])[. -/\\](?:19[6-9]|20[012])[0-9][)\]]?)(?=\W|$)/, date("DD MM YYYY"), { remove: true });
    parser.addHandler("date", /(?<=\W|^)([([]?(?:0[1-9]|1[012])[. -/\\](?:0[1-9]|[12][0-9]|3[01])[. -/\\](?:[0][1-9]|[0126789][0-9])[)\]]?)(?=\W|$)/, date("MM DD YY"), { remove: true });
    parser.addHandler("date", /(?<=\W|^)([([]?(?:0?[1-9]|[12][0-9]|3[01])[. ]?(?:st|nd|rd|th)?[. -/\\](?:feb|jan|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[. -/\\](?:19[7-9]|20[012])[0-9][)\]]?)(?=\W|$)/i, date("DD MMM YYYY"), { remove: true });
    parser.addHandler("date", /(?<=\W|^)([([]?(?:0?[1-9]|[12][0-9]|3[01])[. ]?(?:st|nd|rd|th)?[. -/\\](?:feb|jan|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[. -/\\](?:[0][1-9]|[0126789][0-9])[)\]]?)(?=\W|$)/i, date("DD MMM YY"), { remove: true });

    // Year
    parser.addHandler("year", /[([]?[ .]?((?:19[0-9]|20[012])[0-9][ .]?-[ .]?(?:19[0-9]|20[012])[0-9])[ .]?[)\]]?/, yearRange, { remove: true });
    parser.addHandler("year", /[([][ .]?((?:19[0-9]|20[012])[0-9][ .]?-[ .]?(?:[0-9]{2}))[ .]?[)\]]/, yearRange, { remove: true });
    parser.addHandler("year", /[([]?(?!^)((?:19[0-9]|20[012])[0-9])[)\]]?/, integer, { remove: true });
    parser.addHandler("year", /[([]?((?:19[0-9]|20[012])[0-9])[)\]]?/, integer, { remove: true });

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

    // Source
    parser.addHandler("source", /\b(?:HD-?)?CAM\b/, { remove: true });
    parser.addHandler("source", /\b(?:HD-?)?T(?:ELE)?S(?:YNC)?\b/i, { remove: true });
    parser.addHandler("source", /\bUltraHD\b/i, value("UHDRip"), { remove: true });
    parser.addHandler("source", /\bUHD-?(?:Rip)?\b/i, value("UHDRip"), { remove: true });
    parser.addHandler("source", /\bHD-?Rip\b/i, value("HDRip"), { remove: true });
    parser.addHandler("source", /\bHDR\b/i, value("HDRip"), { remove: true });
    parser.addHandler("source", /\bBRRip\b/i, value("BRRip"), { remove: true });
    parser.addHandler("source", /\bBDRip\b|\bBD-RM\b|[[(]BD[\]) .,-]/i, value("BDRip"), { remove: true });
    parser.addHandler("source", /\bDVDRip\b/i, value("DVDRip"), { remove: true });
    parser.addHandler("source", /\bDVD(?:R[0-9])?\b/i, value("DVD"), { remove: true });
    parser.addHandler("source", /\bDVD?Scr\b/i, value("DVDScr"), { remove: true });
    parser.addHandler("source", /\b(?:HD-?)?TVRip\b/i, { remove: true });
    parser.addHandler("source", /\bTC\b/, value("TC"), { remove: true });
    parser.addHandler("source", /\bPPVRip\b/i, value("PPVRip"), { remove: true });
    parser.addHandler("source", /\bTVRips?\b/i, value("TVRip"), { remove: true });
    parser.addHandler("source", /\bR5\b/i, value("R5"), { remove: true });
    parser.addHandler("source", /\bVHSScr\b/i, value("VHSScr"), { remove: true });
    parser.addHandler("source", /\bBlu-?Ray\b/i, value("BluRay"), { remove: true });
    parser.addHandler("source", /\bWEB-?DL\b/i, value("WEB-DL"), { remove: true });
    parser.addHandler("source", /\bWEB-?Rip\b/i, value("WEBRip"), { remove: true });
    parser.addHandler("source", /\b(?:DL|WEB|BD|BR)(?:RE)?MUX\b/i, { remove: true });
    parser.addHandler("source", /\b(DivX|XviD)\b/, { remove: true });
    parser.addHandler("source", /\bHDTV\b/i, value("HDTV"), { remove: true });

    // Video depth
    parser.addHandler("bitDepth", /(?:8|10|12)-?bit/i, lowercase, { remove: true });

    // Codec
    parser.addHandler("codec", /[xh][-. ]?26[45]/i, lowercase, { remove: true });
    parser.addHandler("codec", /dvix|mpeg2|divx|xvid|avc|hevc/i, lowercase, { remove: true });
    parser.addHandler("codec", ({ result }) => {
        if (result.codec) {
            result.codec = result.codec.replace(/[ .-]/, "");
        }
    });

    // Audio
    parser.addHandler("audio", /\bMP3|mp3|FLAC|Atmos|DTS(?:-HD)?|TrueHD\b/, lowercase);
    parser.addHandler("audio", /Dual[- ]Audio/i, lowercase);
    parser.addHandler("audio", /AC-?3(?:[.-]5\.1)?/i, value("ac3"), { remove: true });
    parser.addHandler("audio", /\b5\.1ch\b/i, value("ac3"), { remove: true });
    parser.addHandler("audio", /DD5[. ]?1/i, value("dd5.1"), { remove: true });
    parser.addHandler("audio", /AAC(?:[. ]?2[. ]0)?/, value("aac"), { remove: true });

    // Group
    parser.addHandler("group", /- ?(?!\d+$|S\d+|\d+x|ep?\d+)([^\-. ]+)$/i, { remove: true });

    // Container
    parser.addHandler("container", /(?:\.)?[[(]?\b(MKV|AVI|MP4|WMV|MPG|MPEG)\b[\])]?/i, lowercase, { remove: true });
    parser.addHandler("container", /\[[A-Z0-9]{8}](?:\.([a-zA-Z0-9]{1,5}))?/, lowercase, { skipIfAlreadyFound: false, remove: true });

    // Volumes
    parser.addHandler("volumes", /vol(?:s|umes?)?[. -]*(?:\d{1,2}[., +/\\&-]+)+\d{1,2}\b/i, range, { remove: true });
    parser.addHandler("volumes", ({ title, result, matched }) => {
        const startIndex = matched.year && matched.year.matchIndex || 0;
        const match = title.slice(startIndex).match(/vol(?:ume)?[. -]*(\d{1,2})/i);

        if (match) {
            matched.volumes = { match: match[0], matchIndex: match.index };
            result.volumes = array(integer)(match[1]);
            return { matchIndex: match.index, remove: true };
        }
        return null;
    });

    // Season
    parser.addHandler("seasons", /(?:complete\W|seasons?\W|\W|^)((?:s\d{1,2}[., +/\\&-]+)+s\d{1,2}\b)/i, range, { remove: true });
    parser.addHandler("seasons", /(?:complete\W|seasons?\W|\W|^)[([]?(s\d{2,}-\d{2,}\b)[)\]]?/i, range, { remove: true });
    parser.addHandler("seasons", /(?:complete\W|seasons?\W|\W|^)[([]?(s[1-9]-[2-9]\b)[)\]]?/i, range, { remove: true });
    parser.addHandler("seasons", /(?:(?:\bthe\W)?\bcomplete\W)?(?:seasons?|[Сс]езони?)[. ]?[-:]?[. ]?[([]?((?:\d{1,2}[., /\\&]+)+\d{1,2}\b)[)\]]?/i, range, { remove: true });
    parser.addHandler("seasons", /(?:(?:\bthe\W)?\bcomplete\W)?(?:seasons?|[Сс]езони?)[. ]?[-:]?[. ]?[([]?((?:\d{1,2}[. -]+)+[1-9]\d?\b)[)\]]?/i, range, { remove: true });
    parser.addHandler("seasons", /(?:(?:\bthe\W)?\bcomplete\W)?\bseasons?\b[. -]?(\d{1,2}[. -]?(?:to|thru|and|\+|:)[. -]?\d{1,2})\b/i, range, { remove: true });
    parser.addHandler("seasons", /(?:(?:\bthe\W)?\bcomplete\W)?(?:saison|season|series|[Сс]езон|temporada):?[. ]?(\d{1,2})/i, array(integer));
    parser.addHandler("seasons", /(?:\D|^)(\d{1,2})Â?[°ºªa]?[. ]*(?:temporada)/i, array(integer), { remove: true });
    parser.addHandler("seasons", /(?:(?:\bthe\W)?\bcomplete)?(?:\W|^)s(\d{1,2})(?:[\Wex]|$)/i, array(integer), { skipIfAlreadyFound: false });
    parser.addHandler("seasons", /(?:(?:\bthe\W)?\bcomplete\W)?(?:\W|^)(\d{1,2})[. ]?(?:st|nd|rd|th)[. ]*season/i, array(integer));
    parser.addHandler("seasons", /(?:\D|^)(\d{1,2})x\d{1,3}(?:\D|$)/, array(integer));
    parser.addHandler("seasons", /[[(](\d{1,2})\.\d{1,2}[)\]]/, array(integer));
    parser.addHandler("seasons", /-\s?(\d{1,2})\.\d{1,2}\s?-/, array(integer));

    // adds single season info if its there"s only single season
    parser.addHandler("season", ({ result }) => {
        if (result.seasons && result.seasons.length === 1) {
            result.season = result.seasons[0];
        }
    });

    // Episode
    parser.addHandler("episodes", /(?:[\W\d]|^)ep?[ .]?[([]?(\d{1,3}(?:[ .]?(?:[&+]|ep?){1,2}[ .]?\d{1,3})+)(?:\W|$)/i, range);
    parser.addHandler("episodes", /(?:[\W\d]|^)\d+x[ .]?[([]?(\d{1,3}(?:[ .]?[x][ .]?\d{1,3})+)(?:\W|$)/i, range);
    parser.addHandler("episodes", /(?:[\W\d]|^)(?:episodes?|[Сс]ерии:?)[ .]?[([]?(\d{1,3}(?:[ .+]*[&+][ .]?\d{1,3})+)(?:\W|$)/i, range);
    parser.addHandler("episodes", /[([]?(?:\D|^)(\d{1,3}[ .]?ao[ .]?\d{1,3})[)\]]?(?:\W|$)/i, range);
    parser.addHandler("episodes", /(?:[\W\d]|^)(?:e|ep|episodes?|[Сс]ерии:?|\d+x)[ .]?[([]?(\d{1,3}(?:-?\d{1,3})+)(?:\W|$)/i, range);
    parser.addHandler("episodes", /(?:\W|^)s\d{1,2}[. ]?[x-]?[. ]?(?:e|x|ep|-)[. ]?(\d{1,3})(?:[ab]|\W|$)/i, array(integer));
    parser.addHandler("episodes", /(?<!(?:seasons?|[Сс]езони?)\W*)(?:[ .([-]|^)(\d{1,3}(?:[ .]?[,&+~][ .]?\d{1,3})+)(?:[ .)\]-]|$)/i, range);
    parser.addHandler("episodes", /(?<!(?:seasons?|[Сс]езони?)\W*)(?:[ .([-]|^)(\d{1,3}(?:-\d{1,3})+)(?:[ .)(\]-]|$)/i, range);
    parser.addHandler("episodes", /(?:[ée]p(?:isode)?|[Сс]ерии|capitulo)[. ]?[-:]?[. ]?(\d{1,3})(?:[ab]|\W|$)/i, array(integer));
    parser.addHandler("episodes", /(?:\W|^)\d{1,2}[. ]?x[. ]?(\d{1,2})(?:[ab]|\W|$)/, array(integer));
    parser.addHandler("episodes", /[[(]\d{1,2}\.(\d{1,2})[)\]]/, array(integer));
    parser.addHandler("episodes", /-\s?\d{1,2}\.(\d{1,2})\s?-/, array(integer));
    parser.addHandler("episodes", /(?:\W|^)(\d{1,2})[. ]?(?:of|из)[. ]?\d{1,2}(?:\W|$)/, array(integer));

    // can be both absolute episode and season+episode in format 101
    parser.addHandler("episodes", ({ title, result, matched }) => {
        if (!result.episodes) {
            const startIndexes = [matched.year, matched.seasons]
                .filter(component => component)
                .map(component => component.matchIndex)
                .filter(index => index > 0);
            const endIndexes = [matched.resolution, matched.source, matched.codec, matched.audio]
                .filter(component => component)
                .map(component => component.matchIndex)
                .filter(index => index > 0);
            const startIndex = startIndexes.length ? Math.min(...startIndexes) : 0;
            const endIndex = Math.min(...endIndexes, title.length);
            const partTitle = title.slice(startIndex, endIndex);

            // try to match the episode inside the title with a separator, if not found include the start of the title as well
            const matches = partTitle.match(/(?<!movie\W*|film\W*)[ .]?[([-][ .]?(\d{1,4})(?:a|b|v\d)?(?:\W|$)(?!movie|film)/i) ||
                partTitle.match(/^[ .]?(\d{1,4})(?:a|b|v\d)?(?:\W|$)(?!movie|film)/i);

            if (matches) {
                result.episodes = [matches[matches.length - 1]]
                    .map(group => group.replace(/\D/g, ""))
                    .map(group => parseInt(group, 10));
                return { matchIndex: title.indexOf(matches[0]) };
            }
        }
    });

    // adds single season info if its there's only single season
    parser.addHandler("episode", ({ result }) => {
        if (result.episodes && result.episodes.length === 1) {
            result.episode = result.episodes[0];
        }
    });

    parser.addHandler("complete", /(?:\bthe\W)?(?:\bcomplete|collection|dvd)?\b[ .]?\bbox[ .-]?set\b/i, boolean);
    parser.addHandler("complete", /(?:\bthe\W)?(?:\bcomplete|collection|dvd)?\b[ .]?\bmini[ .-]?series\b/i, boolean);
    parser.addHandler("complete", /(?:\bthe\W)?(?:\bcomplete|full|all)\b.*\b(?:series|seasons|collection|episodes|set|pack|movies)\b/i, boolean);
    parser.addHandler("complete", /\b(?:series|seasons|movies?)\b.*\b(?:complete|collection)\b/i, boolean);
    parser.addHandler("complete", /(?:\bthe\W)?\bultimate\b[ .]\bcollection\b/i, boolean, { skipIfAlreadyFound: false });
    parser.addHandler("complete", /\bcollection\b.*\b(?:set|pack|movies)?\b/i, boolean);
    parser.addHandler("complete", /duology|trilogy|quadr[oi]logy|tetralogy|pentalogy|hexalogy|heptalogy|anthology|saga/i, boolean, { skipIfAlreadyFound: false });

    // Language
    parser.addHandler("language", /\bRUS\b/i, value("russian"));
    parser.addHandler("language", /\bNL\b/, value("dutch"));
    parser.addHandler("language", /\bFLEMISH\b/, value("flemish"));
    parser.addHandler("language", /\bGERMAN\b/, value("german"));
    parser.addHandler("language", /\b(ITA(?:LIAN)?|iTALiAN)\b/, value("italian"));
    parser.addHandler("language", /\bFR(?:ENCH)?\b/, value("french"));
    parser.addHandler("language", /\bTruefrench|VF(?:[FI])\b/i, value("french"));
    parser.addHandler("language", /\bVOST(?:(?:F(?:R)?)|A)?|SUBFRENCH\b/i, value("french"));
    parser.addHandler("language", /\b(?:DUBBED|DUBS?|DUAL[- ]+AUDIO)\b/i, value("dubbed"));
    parser.addHandler("language", /\bMULTi(?:Lang|-VF2)?\b/i, value("multi"));
};
