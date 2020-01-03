const { none } = require("./transformers");

function extendOptions(options) {
    options = options || {};

    const defaultOptions = {
        skipIfAlreadyFound: true,
        remove: false
    };

    if (typeof options.skipIfAlreadyFound === "undefined") {
        options.skipIfAlreadyFound = defaultOptions.skipIfAlreadyFound;
    }
    if (typeof options.remove === "undefined") {
        options.remove = defaultOptions.remove;
    }

    return options;
}

function createHandlerFromRegExp(name, regExp, transformer, options) {
    function handler({ title, result, matched }) {
        if (result[name] && options.skipIfAlreadyFound) {
            return null;
        }

        const match = title.match(regExp);
        const [rawMatch, cleanMatch] = match || [];

        if (rawMatch) {
            const transformed = transformer(cleanMatch || rawMatch);
            if (transformed) {
                matched[name] = matched[name] || { rawMatch, matchIndex: match.index };
                result[name] = result[name] || options.value || transformed;
                return {
                    matchIndex: match.index,
                    remove: options.remove
                };
            }
        }

        return null;
    }

    handler.handlerName = name;

    return handler;
}

function cleanTitle(rawTitle) {
    let cleanedTitle = rawTitle;

    if (cleanedTitle.indexOf(" ") === -1 && cleanedTitle.indexOf(".") !== -1) {
        cleanedTitle = cleanedTitle.replace(/\./g, " ");
    }

    cleanedTitle = cleanedTitle
        .replace(/_/g, " ")
        .replace(/([^\w!?%+~')\]]+)$/, "")
        .replace(/^[[【].*[\]】][ .]?(.+)/, "$1")
        .replace(/(.+)[ .]?\[.*]$/, "$1")
        .replace(/(^\[|]$)/g, "")
        .trim();

    return cleanedTitle;
}

class Parser {

    constructor() {
        this.handlers = [];
    }

    addHandler(handlerName, handler, transformer, options) {
        if (typeof handler === "undefined" && typeof handlerName === "function") {

            // If no name is provided and a function handler is directly given
            handler = handlerName;
            handler.handlerName = "unknown";

        } else if (typeof handlerName === "string" && handler instanceof RegExp) {

            // If the handler provided is a regular expression
            transformer = typeof transformer === "function" ? transformer : none;
            options = extendOptions(typeof transformer === "object" ? transformer : options);
            handler = createHandlerFromRegExp(handlerName, handler, transformer, options);

        } else if (typeof handler === "function") {

            // If the handler is a function
            handler.handlerName = handlerName;

        } else {

            // If the handler is neither a function nor a regular expression, throw an error
            throw new Error(`Handler for ${handlerName} should be a RegExp or a function. Got: ${typeof handler}`);

        }

        this.handlers.push(handler);
    }

    parse(title) {
        title = title.replace(/_+/g, " ");
        const result = {};
        const matched = {};
        let endOfTitle = title.length;

        for (const handler of this.handlers) {
            const matchResult = handler({ title, result, matched });
            if (matchResult && matchResult.remove) {
                title = title.replace(matched[handler.handlerName].rawMatch, "");
            }
            if (matchResult && matchResult.matchIndex && matchResult.matchIndex < endOfTitle) {
                endOfTitle = matchResult.matchIndex;
            }
        }

        result.title = cleanTitle(title.substr(0, endOfTitle));

        return result;
    }
}

exports.Parser = Parser;
