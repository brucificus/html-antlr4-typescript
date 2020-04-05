import { HTMLParserVisitor, HtmlAttributeContext } from "../../lib";
import { AbstractParseTreeVisitor } from "antlr4ts/tree";

export default class CountHtmlAttributesVisitor
  extends AbstractParseTreeVisitor<number>
  implements HTMLParserVisitor<number> {

  defaultResult() {
    return 0;
  }

  aggregateResult(aggregate: number, nextResult: number) {
    return aggregate + nextResult;
  }

  visitHtmlAttribute(context: HtmlAttributeContext): number {
    return 1 + super.visitChildren(context);
  }
}
