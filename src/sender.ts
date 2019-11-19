import AWS from "aws-sdk";

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

export const sendEmail = (to: string, subject: string, message: string, from: string) => {
  const params = {
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<div>${message}</div>`
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject
      }
    },
    ReturnPath: from,
    Source: from
  };

  ses.sendEmail(params, (err, data) => {
    if (err) {
      return console.log(err, err.stack);
    } else {
      console.log("Email sent.", data);
    }
  });
};
