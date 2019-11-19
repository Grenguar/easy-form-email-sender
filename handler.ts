import { Handler, Context, Callback } from "aws-lambda";
import { sendEmail } from "./src/sender";
// import { TO, FROM } from "./src/env";

interface HelloResponse {
  statusCode: number;
  body: string;
}

const send: Handler = async (event: any, context: Context, callback: Callback) => {
  // const formData = JSON.parse(event.body);
  // console.log(formData);
  // let responseData: string[] = [];
  // for (var key in formData) {
  //   if (formData.hasOwnProperty(key)) {
  //     var val = formData[key];
  //     responseData.push(`${key} : ${val}`);
  //   }
  // }
  console.log(event.body);
  sendEmail(process.env.TO!, `NEW Form arrived: ${Math.random() * 100}`, JSON.stringify(event.body), process.env.FROM!);
  const response: HelloResponse = {
    statusCode: 200,
    body: "ok"
  };

  callback(null, response);
};

export { send };
