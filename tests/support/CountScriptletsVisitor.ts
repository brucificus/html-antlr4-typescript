import { HTMLParserVisitor, ScriptletOrSeaWsContext } from "../../lib";
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

  visitScriptletOrSeaWs(context: ScriptletOrSeaWsContext) {
    if (context.SCRIPTLET()) {
      return 1;
    }
    return 0;
  }
}
