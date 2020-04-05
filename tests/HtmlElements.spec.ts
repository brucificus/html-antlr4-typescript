import parseTree from "./support/parseTree"
import CountHtmlElementsVisitor from "./support/CountHtmlElementsVisitor"


describe('HtmlElements', function() {
    it('recognizes nested', function() {
        const tree = parseTree("<strong>Hello there, <i>world</i>!</strong>");
        const countHtmlElementsVisitor = new CountHtmlElementsVisitor();

        const result = countHtmlElementsVisitor.visit(tree);

        expect(result).toBe(2);
    });

    it('recognizes consecutive', function() {
        const tree = parseTree("<strong>Hello there, </strong><i>world</i>!");
        const countHtmlElementsVisitor = new CountHtmlElementsVisitor();

        const result = countHtmlElementsVisitor.visit(tree);

        expect(result).toBe(2);
    });

    it('recognizes outer with broken nested', function() {
        const tree = parseTree("<strong>Hello there, <i>world</!</strong>");
        const countHtmlElementsVisitor = new CountHtmlElementsVisitor();

        const result = countHtmlElementsVisitor.visit(tree);

        expect(result).toBe(1);
    });
});
