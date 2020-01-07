declare namespace ParseTorrentTitle {

    interface ParserOptions {
        skipIfAlreadyFound?: boolean;
        remove?: boolean;
    }

    interface ParserResult {
        title: string;
        date?: string;
        year?: number | string;
        resolution?: string;
        extended?: boolean;
        unrated?: boolean;
        proper?: boolean;
        repack?: boolean;
        convert?: boolean;
        hardcoded?: boolean;
        retail?: boolean;
        remastered?: boolean;
        complete?: boolean;
        region?: string;
        container?: string;
        source?: string;
        codec?: string;
        audio?: string;
        group?: string;
        volumes?: Array<number>;
        seasons?: Array<number>;
        season?: number;
        episodes?: Array<number>;
        episode?: number;
        language?: string;
    }

    interface Handler {
        (input: { title: string, result: ParserResult, matched: Array<string> }): void;
        (input: { title: string }): void;
        (input: { result: ParserResult }): void;
    }

    interface ParseFunction {
        (title: string): ParserResult;
    }

    interface Transformer {
        (input: string): any;
    }

    interface AddHandlerFunction {
        (handlerName: string, handler: RegExp, transformer?: Transformer, options?: ParserOptions): void;
        (handlerName: string, handler: RegExp, transformer?: Transformer): void;
        (handlerName: string, handler: RegExp, options?: ParserOptions): void;
        (handlerName: string, handler: Handler): void;
        (handler: Handler): void;
    }

    interface AddDefaultsFunction {
        (parser: Parser): void;
    }

    class Parser {

        constructor();

        addHandler: AddHandlerFunction;
        parse: ParseFunction;
    }
}

declare module "parse-torrent-title" {

    export class Parser extends ParseTorrentTitle.Parser { }
    export const parse: ParseTorrentTitle.ParseFunction;
    export const addHandler: ParseTorrentTitle.AddHandlerFunction;
    export const addDefaults: ParseTorrentTitle.AddDefaultsFunction;
}
