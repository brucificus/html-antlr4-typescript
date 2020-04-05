export interface IParserParams {
    getIgnoreSyntaxErrors(): boolean;
}

export class ParserParams implements IParserParams {
    getIgnoreSyntaxErrors(): boolean {
        return false;
    }
}
