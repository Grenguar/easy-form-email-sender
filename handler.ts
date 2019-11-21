import { Handler, Context, Callback } from "aws-lambda";
import { sendEmail } from "./src/sender";
import Parser from "./src/parser";

interface HelloResponse {
  statusCode: number;
  body: string;
}

const send: Handler = async (event: any, context: Context, callback: Callback) => {
  const parser = new Parser(event.body);
  const letter = parser.parseBody();
  sendEmail(process.env.TO!, letter.topic, letter.body, process.env.FROM!);
  const response: HelloResponse = {
    statusCode: 200,
    body: "ok"
  };

  callback(null, response);
};

export { send };
