import { Handler, Context, Callback } from "aws-lambda";
import { sendEmail } from "./src/sender";

interface HelloResponse {
  statusCode: number;
  body: string;
}
// Tilda specific
const testWebhook: String = "test=test";

const send: Handler = async (event: any, context: Context, callback: Callback) => {
  const isTest = event.body === testWebhook;
  const decodedBody = decodeURI(event.body);
  const topic = isTest
    ? "Test Letter"
    : `New Lead from GeekExp: ${decodedBody
        .split("&")[0]
        .split("=")[1]
        .replace("+", " ")}`;
  const formFields = decodedBody.split("&");
  const formFieldsHtml: string[] = [];
  formFieldsHtml.push("<h1>Lead Details</h1>");
  formFields.forEach(field => {
    let newField = "";
    if (field.match(/(www|http:|https:)+[^\s]+[\w]/) !== null) {
      newField = `<a href="${field}" target="_blank">${field}</a>`;
    } else {
      newField = `<p>${field.replace("+", " ")}</p><br>`;
    }
    formFieldsHtml.push(newField);
  });
  sendEmail(process.env.TO!, topic, JSON.stringify(formFieldsHtml.join("").replace("=", ": ")), process.env.FROM!);
  const response: HelloResponse = {
    statusCode: 200,
    body: "ok"
  };

  callback(null, response);
};

export { send };
