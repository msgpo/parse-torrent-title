const { none } = require("./transformers");

function extendOptions(options) {
    options = options || {};

    const defaultOptions = { skipIfAlreadyFound: true };

    if (typeof options.skipIfAlreadyFound === "undefined") {
        options.skipIfAlreadyFound = defaultOptions.skipIfAlreadyFound;
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
            matched[name] = matched[name] || rawMatch;
            result[name] = result[name] || options.value || transformed;
            return transformed && match.index;
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

    cleanedTitle = cleanedTitle.replace(/_/g, " ");
    cleanedTitle = cleanedTitle.replace(/([(_]|- )$/, "").trim();

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
            const matchIndex = handler({ title, result, matched });
            if (matchIndex && matchIndex < endOfTitle) {
                endOfTitle = matchIndex;
            }
        }

        result.title = cleanTitle(title.substr(0, endOfTitle));

        return result;
    }
}

exports.Parser = Parser;
