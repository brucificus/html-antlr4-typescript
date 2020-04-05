/**
 * VB6 parse runner for Jest tests.
 */

import { createLogger, ILogger } from './infrastructure/Logger';
import { File } from './infrastructure/File';
import { readFileSync } from 'fs';
const readFileToString = (path: string): string => readFileSync(path, {encoding: 'utf8'});
import { HtmlDocumentContext, HTMLParser, HTMLLexer } from '../../index';
import { ANTLRInputStream, CommonTokenStream } from "antlr4ts";
import { cleanFileTree } from './cleanFileTree';
import { IParserParams, ParserParams } from './ParserParams';
import { ThrowingErrorListener } from './ThrowingErrorListener';

export interface IParseTestRunner  {
    parseFile(inputFile: File): void;
}

const LOG: ILogger = createLogger(__filename);

const TREE_SUFFIX: string = ".tree";

export class VbParseTestRunner 
    implements IParseTestRunner {

	protected createDefaultParams(): IParserParams {
		return new ParserParams();
	}

	protected doCompareParseTree(treeFile: File, startRule: HtmlDocumentContext, parser: HTMLParser): void {
		const treeFileData: string = readFileToString(treeFile.getAbsolutePath());

		if (treeFileData && treeFileData.length) {
			LOG.info(`Comparing parse tree with file ${treeFile.getName()}.`);

            it(treeFile.getName(), () => {
                const inputFileTree: string = startRule.toStringTree(parser);
                const cleanedInputFileTree: string = cleanFileTree(inputFileTree);
                const cleanedTreeFileData: string = cleanFileTree(treeFileData);
                
                expect(cleanedInputFileTree).toBe(cleanedTreeFileData);
            });
		} else {
			LOG.info(`Ignoring empty parse tree file ${treeFile.getName()}.`);
		}
	}

	protected doParse(inputFile: File, params: IParserParams): void {
		LOG.info(`Parsing file ${inputFile.getName()}.`);

        const lexer: HTMLLexer = new HTMLLexer(new ANTLRInputStream(readFileToString(inputFile.getAbsolutePath())));

		if (!params.getIgnoreSyntaxErrors()) {
			lexer.removeErrorListeners();
			lexer.addErrorListener(new ThrowingErrorListener());
		}

		const tokens: CommonTokenStream = new CommonTokenStream(lexer);
		const parser: HTMLParser = new HTMLParser(tokens);

		if (!params.getIgnoreSyntaxErrors()) {
			parser.removeErrorListeners();
			parser.addErrorListener(new ThrowingErrorListener());
		}

		const startRule: HtmlDocumentContext = parser.htmlDocument();
		const treeFile: File = new File(inputFile.getAbsolutePath() + TREE_SUFFIX);

		if (treeFile.exists()) {
			this.doCompareParseTree(treeFile, startRule, parser);
		}
	}

    parseFile(inputFile: File): void {
		if (inputFile.getExtension().toLowerCase()!==".html") {
			LOG.info(`Ignoring file ${inputFile.getName()}.`);
		} else {
			this.doParse(inputFile, this.createDefaultParams());
		}
    }
}
