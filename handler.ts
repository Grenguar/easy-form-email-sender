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
    if (field.match(/(www|http:|https:)+[^\s]+[\w]/) !== null) {
      formFieldsHtml.push(`<a href="${field}" target="_blank">${field}</a>`);
    } else {
      formFieldsHtml.push(`<p>${field.replace("=", ": ").replace("+", " ")}</p><br>`);
    }
  });
  sendEmail(process.env.TO!, topic, formFieldsHtml.join(""), process.env.FROM!);
  const response: HelloResponse = {
    statusCode: 200,
    body: "ok"
  };

  callback(null, response);
};

export { send };
