const { none, value, integer, boolean, lowercase, date, range, yearRange, array, uniqConcat } = require("./transformers");

exports.addDefaults = /** @type Parser */ parser => {

    // Resolution
    parser.addHandler("resolution", /\b[([]?4k[)\]]?\b/i, value("4k"), { remove: true });
    parser.addHandler("resolution", /21600?[pi]/i, value("4k"), { skipIfAlreadyFound: false, remove: true });
    parser.addHandler("resolution", /[([]?3840x2160[)\]]?/i, value("4k"), { remove: true });
    parser.addHandler("resolution", /[([]?\d{3,4}x(\d{3,4})[)\]]?/i, value("$1p"), { remove: true });
    parser.addHandler("resolution", /((?:480|720|1080))0[pi]/i, value("$1p"), { remove: true });
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
    parser.addHandler("year", /[([]?(?!^)(?<!\d)((?:19[0-9]|20[012])[0-9])(?!\d)[)\]]?/, integer, { remove: true });
    parser.addHandler("year", /[([]?(?<=\D|^)((?:19[0-9]|20[012])[0-9])(?!\d)[)\]]?/, integer, { remove: true });

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
    parser.addHandler("source", /\b(?:HD[ .-]*)?CAM(?:[ .-]*Rip)?\b/i, value("CAM"), { remove: true });
    parser.addHandler("source", /\b(?:HD[ .-]*)?T(?:ELE)?S(?:YNC)?\b/i, value("TeleSync"), { remove: true });
    parser.addHandler("source", /\b(?:HD[ .-]*)?T(?:ELE)?C(?:INE)?\b/, value("TeleCine"), { remove: true });
    parser.addHandler("source", /\bUltraHD\b/i, value("UHDRip"), { remove: true });
    parser.addHandler("source", /\bUHD(?:[ .-]*Rip)?\b/i, value("UHDRip"), { remove: true });
    parser.addHandler("source", /\bHD[ .-]*Rip\b/i, value("HDRip"), { remove: true });
    parser.addHandler("source", /\bHDR\b/i, value("HDRip"), { remove: true });
    parser.addHandler("source", /\bBR[ .-]*Rip\b/i, value("BRRip"), { remove: true });
    parser.addHandler("source", /\bBD[ .-]*Rip\b|\bBDR\b|\bBD-RM\b|[[(]BD[\]) .,-]/i, value("BDRip"), { remove: true });
    parser.addHandler("source", /\bDVD[ .-]*Rip\b/i, value("DVDRip"), { remove: true });
    parser.addHandler("source", /\b(?:DVD?|BD|BR)?[ .-]*Scr(?:eener)?\b/i, value("SCR"), { remove: true });
    parser.addHandler("source", /\bDVD(?:R[0-9]?)?\b/i, value("DVD"), { remove: true });
    parser.addHandler("source", /\bPPVRip\b/i, value("PPVRip"), { remove: true });
    parser.addHandler("source", /\bHD[ .-]*TV(?:Rip)?\b/i, value("HDTV"), { remove: true });
    parser.addHandler("source", /\bTVRips?\b/i, value("TVRip"), { remove: true });
    parser.addHandler("source", /\bR5\b/i, value("R5"), { remove: true });
    parser.addHandler("source", /\bBlu[ .-]*Ray\b/i, value("BluRay"), { remove: true });
    parser.addHandler("source", /\bWEB[ .-]*DL\b/i, value("WEB-DL"), { remove: true });
    parser.addHandler("source", /\bWEB[ .-]*Rip\b/i, value("WEBRip"), { remove: true });
    parser.addHandler("source", /\b(?:DL|WEB|BD|BR)(?:RE)?MUX\b/i, { remove: true });
    parser.addHandler("source", /\b(DivX|XviD)\b/, { remove: true });

    // Video depth
    parser.addHandler("bitDepth", /(?:8|10|12)-?bit/i, lowercase, { remove: true });

    // Codec
    parser.addHandler("codec", /[xh][-. ]?26[45]/i, lowercase, { remove: true });
    parser.addHandler("codec", /dvix|mpeg2|divx|xvid|avc|hevc/i, lowercase, { remove: true, skipIfAlreadyFound: false });
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

    // Episode code
    parser.addHandler("episodeCode", /[[(]([A-Z0-9]{8})[\])](?:\.[a-zA-Z0-9]{1,5}|$)/, none, { remove: true });

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
    parser.addHandler("seasons", /\bSn([1-9])(?:\D|$)/, array(integer));
    parser.addHandler("seasons", /[[(](\d{1,2})\.\d{1,2}[)\]]/, array(integer));
    parser.addHandler("seasons", /-\s?(\d{1,2})\.\d{1,2}\s?-/, array(integer));

    // adds single season info if its there"s only single season
    parser.addHandler("season", ({ result }) => {
        if (result.seasons && result.seasons.length === 1) {
            result.season = result.seasons[0];
        }
    });

    // Episode
    parser.addHandler("episodes", /(?:[\W\d]|^)e[ .]?[([]?(\d{1,3}(?:[ .-]*(?:[&+]|e){1,2}[ .]?\d{1,3})+)(?:\W|$)/i, range);
    parser.addHandler("episodes", /(?:[\W\d]|^)ep[ .]?[([]?(\d{1,3}(?:[ .-]*(?:[&+]|ep){1,2}[ .]?\d{1,3})+)(?:\W|$)/i, range);
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
    parser.addHandler("languages", /\bmulti(?:ple)?[ .-]*(?:su?$|sub\w*)\b|msub/i, uniqConcat(value("multi subs")), { skipIfAlreadyFound: false, remove: true });
    parser.addHandler("languages", /\bmulti(?:ple)?[ .-]*(?:lang(?:uages?)?|audio|VF2)?\b/i, uniqConcat(value("multi audio")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bdual[ .-]*(?:au?$|[aá]udio|line)\b/i, uniqConcat(value("dual audio")));
    parser.addHandler("languages", /\bdual\b(?![ .-]*sub)/i, uniqConcat(value("dual audio")));
    parser.addHandler("languages", /\bengl?(?:sub[a-zA-Z]*)?\b/i, uniqConcat(value("english")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\beng?(?:sub[a-zA-Z]*)\b/i, uniqConcat(value("english")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bing(?:l[eéê]s)?\b/i, uniqConcat(value("english")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bEN\b/i, uniqConcat(value("english")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\benglish?\b/i, uniqConcat(value("english")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:JP|JAP|JPN)\b/i, uniqConcat(value("japanese")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bjapanese\b/i, uniqConcat(value("japanese")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:KOR|kor[ .-]?sub)\b/i, uniqConcat(value("korean")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bkorean\b/i, uniqConcat(value("korean")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:mand[ae]rin|ch[sn])\b/i, uniqConcat(value("chinese")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bCHI\b/, uniqConcat(value("chinese")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bchinese\b/i, uniqConcat(value("chinese")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bFR(?:ench|a|e)?\b/i, uniqConcat(value("french")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bTruefrench|VF(?:[FI])\b/i, uniqConcat(value("french")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bVOST(?:(?:F(?:R)?)|A)?|SUBFRENCH\b/i, uniqConcat(value("french")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:ESP|spa|(en[ .]+)?espa[nñ]ola?|castellano|lat(?:ino)?)\b/i, uniqConcat(value("spanish")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bes(?=[ .,/-]+(?:[a-zA-Z]{2}[ .,/-]+){2,})\b/i, uniqConcat(value("spanish")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?<=[ .,/-]+(?:[a-zA-Z]{2}[ .,/-]+){2,})es\b/i, uniqConcat(value("spanish")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?<=[ .,/-]+(?:[a-zA-Z]{2}[ .,/-]+))es(?=[ .,/-]+(?:[a-zA-Z]{2}[ .,/-]+))\b/i, uniqConcat(value("spanish")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bspanish\b/i, uniqConcat(value("spanish")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:p[rt]|en|port)[. (\\/-]*BR\b/i, uniqConcat(value("portuguese")), { skipIfAlreadyFound: false, remove: true });
    parser.addHandler("languages", /\b(?:leg(?:endado|endas?)?|dub(?:lado)|portugu[eèê]se?)[. -]*BR\b/i, uniqConcat(value("portuguese")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bleg(?:endado|endas?)\b/i, uniqConcat(value("portuguese")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bportugu[eèê]s[ea]?\b/i, uniqConcat(value("portuguese")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bPT[. -]*(?:PT|ENG?|sub(?:s|titles?))\b/i, uniqConcat(value("portuguese")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bpor\b/i, uniqConcat(value("portuguese")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bITA\b/i, uniqConcat(value("italian")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bIT(?=[ .,/-]+(?:[a-zA-Z]{2}[ .,/-]+){2,})\b/, uniqConcat(value("italian")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\biTALiAN\b/i, uniqConcat(value("italian")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bitalian\b/i, uniqConcat(value("italian")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bgreek[ .-]*(?:audio|lang(?:uage)?|sub(?:s|titles?)?)\b/i, uniqConcat(value("greek")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:GER|DEU)\b/i, uniqConcat(value("german")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bde(?=[ .,/-]+(?:[a-zA-Z]{2}[ .,/-]+){2,})\b/i, uniqConcat(value("german")), { sskipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?<=[ .,/-]+(?:[a-zA-Z]{2}[ .,/-]+){2,})de\b/i, uniqConcat(value("german")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?<=[ .,/-]+(?:[a-zA-Z]{2}[ .,/-]+))de(?=[ .,/-]+(?:[a-zA-Z]{2}[ .,/-]+))\b/i, uniqConcat(value("german")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bgerman\b/i, uniqConcat(value("german")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bRUS?\b/i, uniqConcat(value("russian")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\brussian\b/i, uniqConcat(value("russian")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bhin(?:di)?\b/i, uniqConcat(value("hindi")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:tel(?!\W*aviv)|telugu)\b/i, uniqConcat(value("telugu")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\btam(?:il)?\b/i, uniqConcat(value("tamil")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bLT\b/, uniqConcat(value("lithuanian")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:PL|pol)\b/i, uniqConcat(value("polish")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bpolish\b/i, uniqConcat(value("polish")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bCZ[EH]?\b/i, uniqConcat(value("czech")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bczech\b/i, uniqConcat(value("czech")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bHU\b/, uniqConcat(value("hungarian")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bHUN(?:garian)?\b/i, uniqConcat(value("hungarian")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bROM(?:manian)?\b/i, uniqConcat(value("romanian")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bRO(?=[ .,/-]*(?:[a-zA-Z]{2}[ .,/-]+)*sub)/i, uniqConcat(value("romanian")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:HRV|croatian|HR(?=[ .,/-]*(?:[a-zA-Z]{2}[ .,/-]+)*sub))\b/i, uniqConcat(value("croatian")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:NL|dut)\b/i, uniqConcat(value("dutch")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bdutch\b/i, uniqConcat(value("dutch")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bflemish\b/i, uniqConcat(value("dutch")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:DK|danska|dansub|nordic)\b/i, uniqConcat(value("danish")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bdanish\b/i, uniqConcat(value("danish")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:FI|finsk|finsub|nordic)\b/i, uniqConcat(value("finnish")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bfinnish\b/i, uniqConcat(value("finnish")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:SE|swe|swesubs?|sv(?:ensk)?|nordic)\b/i, uniqConcat(value("swedish")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bswedish\b/i, uniqConcat(value("swedish")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:NOR|norsk|norsub|nordic)\b/i, uniqConcat(value("norwegian")), { skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bnorwegian\b/i, uniqConcat(value("norwegian")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:arabic|arab.*(?:audio|lang(?:uage)?|sub(?:s|titles?)?))\b/i, uniqConcat(value("arabic")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\b(?:turkish|tur)\b/i, uniqConcat(value("turkish")), { skipFromTitle: true, skipIfAlreadyFound: false });
    parser.addHandler("languages", /\bheb(?:rew)?\b/i, uniqConcat(value("hebrew")), { skipFromTitle: true, skipIfAlreadyFound: false });

    // infer pt language based on season/episode naming
    parser.addHandler("languages", ({ title, result, matched }) => {
        if (!result.languages || ["portuguese", "spanish"].every(l => !result.languages.includes(l))) {
            if ((matched.seasons && matched.seasons.rawMatch.match(/temporada/i)) ||
                (matched.episodes && matched.episodes.rawMatch.match(/capitulo|ao/i)) ||
                title.match(/dublado/i)) {
                result.languages = (result.languages || []).concat("portuguese");
            }
        }
        return { matchIndex: 0 };
    });

    // Dubbed
    parser.addHandler("dubbed", /\b(?:DUBBED|dublado|dubbing|DUBS?)\b/i, boolean);
    parser.addHandler("dubbed", ({ result }) => {
        if (result.languages && ["multi audio", "dual audio"].some(l => result.languages.includes(l))) {
            result.dubbed = true;
        }
        return { matchIndex: 0 };
    });
};
