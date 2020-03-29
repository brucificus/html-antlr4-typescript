import { HTMLParserVisitor, HtmlElementContext } from "../";
import { AbstractParseTreeVisitor } from "antlr4ts/tree";

export default class CountHtmlElementsVisitor
  extends AbstractParseTreeVisitor<number>
  implements HTMLParserVisitor<number> {

  defaultResult() {
    return 0;
  }

  aggregateResult(aggregate: number, nextResult: number) {
    return aggregate + nextResult;
  }

  visitHtmlElement(context: HtmlElementContext): number {
    return 1 + super.visitChildren(context);
  }
}
