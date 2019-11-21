export default class Parser {
  private body: string;
  // Tilda specific
  private testString: string = "test=test";

  constructor(body: string) {
    this.body = body;
  }

  public parseBody(): LetterContent {
    const isTest = this.isTest();
    const decodedBody = this.decodeString(this.body);
    const formFields = decodedBody.split("&");
    const topic = isTest ? "Test Letter" : `New Lead from GeekExp: ${formFields[0].split("=")[1].replace("+", " ")}`;
    const formFieldsHtml: string[] = [];
    formFieldsHtml.push("<h1>Lead Details</h1>");
    formFields.forEach(field => {
      let newField = field;
      if (field.match(/(www|http:|https:)+[^\s]+[\w]/) !== null) {
        const emailString: string[] = newField.split("=");
        const link = `<a href="${emailString[1]}" target="_blank">here</a>`;
        newField = this.wrapInHtmlTag(`CV: ${link}`, "p");
      } else if (newField.match(/([P|p]hone)/g) !== null) {
        newField = `<p>${newField}</p>`;
      } else {
        newField = `${this.wrapInHtmlTag(`${newField.replace("+", " ")}`, "p")}`;
      }
      formFieldsHtml.push(newField);
    });
    const resultBody = formFieldsHtml.join("");
    return {
      topic,
      body: resultBody
    };
  }

  private decodeString(originalString: string): string {
    return decodeURIComponent(originalString);
  }

  private isTest(): boolean {
    return this.body === this.testString;
  }

  private wrapInHtmlTag(str: string, tag: string): string {
    return `<${tag}>${str}</${tag}>`;
  }
}

export type LetterContent = {
  topic: string;
  body: string;
};
