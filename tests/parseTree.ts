import { HTMLLexer, HTMLParser } from "../";
import { ANTLRInputStream, CommonTokenStream } from "antlr4ts";


export default function parseTree(text : string) {
    const inputStream = new ANTLRInputStream(text);
    const lexer = new HTMLLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new HTMLParser(tokenStream);
    parser.removeErrorListeners();
    return parser.htmlDocument();
}
