exports.addDefaults = /** @type Parser */ parser => {

    // Year
    parser.addHandler("year", /(?!^)[([]?((?:19[0-9]|20[012])[0-9])[)\]]?/, { type: "integer" });

    // Resolution
    parser.addHandler("resolution", /([0-9]{3,4}[pi])/i, { type: "lowercase" });
    parser.addHandler("resolution", /(4k)/i, { type: "lowercase" });

    // Extended
    parser.addHandler("extended", /EXTENDED/, { type: "boolean" });

    // Convert
    parser.addHandler("convert", /CONVERT/, { type: "boolean" });

    // Hardcoded
    parser.addHandler("hardcoded", /HC|HARDCODED/, { type: "boolean" });

    // Proper
    parser.addHandler("proper", /(?:REAL.)?PROPER/, { type: "boolean" });

    // Repack
    parser.addHandler("repack", /REPACK|RERIP/, { type: "boolean" });

    // Retail
    parser.addHandler("retail", /\bRetail\b/i, { type: "boolean" });

    // Remastered
    parser.addHandler("remastered", /\bRemaster(?:ed)?\b/i, { type: "boolean" });

    // Unrated
    parser.addHandler("unrated", /\bunrated|uncensored\b/i, { type: "boolean" });

    // Region
    parser.addHandler("region", /R[0-9]/);

    // Container
    parser.addHandler("container", /\b(MKV|AVI|MP4|WMV|MPG|MPEG)\b/i, { type: "lowercase" });

    // Source
    parser.addHandler("source", /\b(?:HD-?)?CAM\b/);
    parser.addHandler("source", /\b(?:HD-?)?T(?:ELE)?S(?:YNC)?\b/i);
    parser.addHandler("source", /\bHD-?Rip\b/i);
    parser.addHandler("source", /\bBRRip\b/i, { value: "BRRip" });
    parser.addHandler("source", /\bBDRip\b/i, { value: "BDRip" });
    parser.addHandler("source", /\bDVDRip\b/i, { value: "DVDRip" });
    parser.addHandler("source", /\bDVD(?:R[0-9])?\b/i, { value: "DVD" });
    parser.addHandler("source", /\bDVD?Scr\b/i, { value: "DVDScr" });
    parser.addHandler("source", /\b(?:HD-?)?TVRip\b/i);
    parser.addHandler("source", /\bTC\b/, { value: "TC" });
    parser.addHandler("source", /\bPPVRip\b/i, { value: "PPVRip" });
    parser.addHandler("source", /\bR5\b/i, { value: "R5" });
    parser.addHandler("source", /\bVHSScr\b/i, { value: "VHSScr" });
    parser.addHandler("source", /\bBluRay\b/i, { value: "BluRay" });
    parser.addHandler("source", /\bWEB-?DL\b/i, { value: "WEB-DL" });
    parser.addHandler("source", /\bWEB-?Rip\b/i, { value: "WEBRip" });
    parser.addHandler("source", /\b(?:DL|WEB|BD|BR)MUX\b/i);
    parser.addHandler("source", /\b(DivX|XviD)\b/);
    parser.addHandler("source", /\bHDTV\b/i, { value: "HDTV" });

    // Codec
    parser.addHandler("codec", /dvix|mpeg2|divx|xvid|[xh][-. ]?26[45]|avc|hevc/i, { type: "lowercase" });
    parser.addHandler("codec", ({ result }) => {
        if (result.codec) {
            result.codec = result.codec.replace(/[ .-]/, "");
        }
    });

    // Audio
    parser.addHandler("audio", /MD|MP3|mp3|FLAC|Atmos|DTS(?:-HD)?|TrueHD/, { type: "lowercase" });
    parser.addHandler("audio", /Dual[- ]Audio/i, { type: "lowercase" });
    parser.addHandler("audio", /AC-?3(?:\.5\.1)?/i, { value: "ac3" });
    parser.addHandler("audio", /DD5[. ]?1/i, { value: "dd5.1" });
    parser.addHandler("audio", /AAC(?:[. ]?2[. ]0)?/, { value: "aac" });

    // Group
    parser.addHandler("group", /- ?([^\-. ]+)$/);

    // Season
    parser.addHandler("season", /((?:s\d{1,2}[., +/\\&-]+)+s\d{1,2}\b)/i, { type: "range" });
    parser.addHandler("season", /(?:\bcomplete\W)?\bseasons?\b[. -]?[([]?((?:\d{1,2}[., /\\&-]+)+\d{1,2}\b)[)\]]?/i, { type: "range" });
    parser.addHandler("season", /(?:\bcomplete\W)?\bseasons?\b[. -]?(\d{1,2}[. -]?(?:to|thru|and|\+|:)[. -]?\d{1,2})\b/i, { type: "range" });
    parser.addHandler("season", /(?:\bcomplete\W)?(?:saison|season)[. -]?(\d{1,2})/i, { type: "integer" });
    parser.addHandler("season", /(?:\bcomplete\W)?s(\d{1,2})(?:[\Wex]|$)/i, { type: "integer", skipIfAlreadyFound: false });
    parser.addHandler("season", /(\d{1,2})x\d{1,2}/, { type: "integer" });
    parser.addHandler("season", /[[(](\d{1,2})\.\d{1,2}[)\]]/, { type: "integer" });

    // Episode
    parser.addHandler("episode", /s[0-9]{1,2}[. -]?e[. ]?([0-9]{1,2})/i, { type: "integer" });
    parser.addHandler("episode", /[0-9]{1,2}x([0-9]{1,2})/, { type: "integer" });
    parser.addHandler("episode", /[ée]p(?:isode)?[. -]?([0-9]{1,3})/i, { type: "integer" });

    // Language
    parser.addHandler("language", /\bRUS\b/i, { type: "lowercase" });
    parser.addHandler("language", /\bNL\b/, { type: "lowercase" });
    parser.addHandler("language", /\bFLEMISH\b/, { type: "lowercase" });
    parser.addHandler("language", /\bGERMAN\b/, { type: "lowercase" });
    parser.addHandler("language", /\bDUBBED\b/, { type: "lowercase" });
    parser.addHandler("language", /\b(ITA(?:LIAN)?|iTALiAN)\b/, { value: "ita" });
    parser.addHandler("language", /\bFR(?:ENCH)?\b/, { type: "lowercase" });
    parser.addHandler("language", /\bTruefrench|VF(?:[FI])\b/i, { type: "lowercase" });
    parser.addHandler("language", /\bVOST(?:(?:F(?:R)?)|A)?|SUBFRENCH\b/i, { type: "lowercase" });
    parser.addHandler("language", /\bMULTi(?:Lang|-VF2)?\b/i, { type: "lowercase" });
};
