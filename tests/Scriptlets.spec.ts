import parseTree from "./parseTree"
import CountScriptletsVisitor from "./CountScriptletsVisitor"


describe('Scriptlets', function() {
    it('recognizes single', function() {
        const tree = parseTree("<% Response.Write \"Hello, world!\" %>");
        const scriptletsVisitor = new CountScriptletsVisitor();

        const result = scriptletsVisitor.visit(tree);

        expect(result).toBe(1);
    });

    it('recognizes single within html element', function() {
        const tree = parseTree("<a><% Response.Write \"Hello, world!\" %></a>");
        const scriptletsVisitor = new CountScriptletsVisitor();

        const result = scriptletsVisitor.visit(tree);

        expect(result).toBe(1);
    });

    it('recognizes single with evaluation syntax', function() {
        const tree = parseTree("<%= \"Hello, world!\" %>");
        const scriptletsVisitor = new CountScriptletsVisitor();

        const result = scriptletsVisitor.visit(tree);

        expect(result).toBe(1);
    });


    it('recognizes consecutives with evaluation syntax', function() {
        const tree = parseTree("<%= \"Hello, \" %><%= \"world!\" %>");
        const scriptletsVisitor = new CountScriptletsVisitor();

        const result = scriptletsVisitor.visit(tree);

        expect(result).toBe(2);
    });
});
