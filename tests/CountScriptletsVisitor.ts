import { HTMLParserVisitor, ScriptletContext } from "../";
import { AbstractParseTreeVisitor } from "antlr4ts/tree";

export default class CountScriptletsVisitor
  extends AbstractParseTreeVisitor<number>
  implements HTMLParserVisitor<number> {

  defaultResult() {
    return 0;
  }

  aggregateResult(aggregate: number, nextResult: number) {
    return aggregate + nextResult;
  }

  visitScriptlet(context: ScriptletContext): number {
    return 1 + super.visitChildren(context);
  }
}
