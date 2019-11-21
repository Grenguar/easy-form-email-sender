import Parser from "../parser";

const testBody =
  "Name=Jake+Smith&Email=jake.smith%40example.com&Phone=%2B11111111" +
  "&fileUrl=https://somecdn.com/d41d28e5-a8e1-9c2d-947f-11118fc9dc05/";
const testBody2 =
  "experience=Lorem+Ipsum+is+simply+dummy+text+of+he+printing&why=Contrary+to+popular+belief,+Lorem+Ipsum+is+not+simply+random+text.";
let parser: Parser;

if (Parser) {
  describe("Test parser class", () => {
    test("parseBody() test for fields with full sentences", () => {
      parser = new Parser(testBody);
      const expectedBody =
        "<h1>Lead Details</h1><p>Name: Jake Smith</p><p>Email: jake.smith@example.com</p><p>Phone: +11111111</p>" +
        '<p>CV: <a href="https://somecdn.com/d41d28e5-a8e1-9c2d-947f-11118fc9dc05/" target="_blank">here</a></p>';
      const expectedTopic = "New Lead from GeekExp: Jake Smith";
      const parsedBody = parser.parseBody();
      expect(parsedBody.topic).toBe(expectedTopic);
      expect(parsedBody.body).toBe(expectedBody);
    });
    test("parseBody() test with email, phone and link", () => {
      parser = new Parser(testBody2);
      const expectedBody =
        "<h1>Lead Details</h1><p>experience: Lorem Ipsum is simply dummy text of he printing</p>" +
        "<p>why: Contrary to popular belief, Lorem Ipsum is not simply random text.</p>";
      const parsedBody = parser.parseBody();
      expect(parsedBody.body).toBe(expectedBody);
    });
  });
}
