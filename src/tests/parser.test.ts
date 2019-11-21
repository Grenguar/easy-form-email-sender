import Parser from "../parser";

const testBody =
  "Name=Jake+Smith&Email=jake.smith%40gmail.com&Phone=%2B358401971771" +
  "&fileUrl=https://somecdn.com/d41d28e5-a8e1-9c2d-947f-11118fc9dc05/";
const testBody2 =
  "experience=Много очень+много+лет&why=Потому+что+мне+важно+узнать+все+превсе+про+то+как+работать+за+границей!";
let parser: Parser;

if (Parser) {
  describe("Test parser class", () => {
    test("parseBody() test with email, phone and link", () => {
      parser = new Parser(testBody);
      const expectedBody =
        "<h1>Lead Details</h1><p>Name: Jake Smith</p><p>Email: jake.smith@gmail.com</p><p>Phone: +358401971771</p>" +
        '<p>CV: <a href="https://somecdn.com/d41d28e5-a8e1-9c2d-947f-11118fc9dc05/" target="_blank">here</a></p>';
      const expectedTopic = "New Lead from GeekExp: Jake Smith";
      const parsedBody = parser.parseBody();
      expect(parsedBody.topic).toBe(expectedTopic);
      expect(parsedBody.body).toBe(expectedBody);
    });
    test("parseBody() test with email, phone and link", () => {
      parser = new Parser(testBody2);
      const expectedBody =
        "<h1>Lead Details</h1><p>experience: Много очень много лет</p>" +
        "<p>why: Потому что мне важно узнать все превсе про то как работать за границей!</p>";
      const parsedBody = parser.parseBody();
      console.log(parsedBody);
      expect(parsedBody.body).toBe(expectedBody);
    });
  });
}
