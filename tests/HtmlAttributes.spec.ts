import parseTree from "./support/parseTree"
import CountHtmlAttributesVisitor from "./support/CountHtmlAttributesVisitor"


describe('HtmlAttributes', function() {
    it('recognizes nested', function() {
        const tree = parseTree("<a href=\"xyz\" style=\"abc\">Hello there!</a>");
        const countHtmlAttributesVisitor = new CountHtmlAttributesVisitor();

        const result = countHtmlAttributesVisitor.visit(tree);

        expect(result).toBe(2);
    });
});
