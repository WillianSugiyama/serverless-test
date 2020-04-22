import models from "../../../models";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const sqs = new AWS.SQS({
  apiVersion: "2012-11-05",
  endpoint: process.env.ENDPOINTSQS,
});

const savePost = async (body, receipt) => {
  try {
    const newPost = await models.Post.create({
      title: body.title,
      subtitle: body.subtitle,
      content: body.content,
      imgUrl: body.imgUrl ? body.imgUrl : "",
    });

    const params = {
      QueueUrl: process.env.ENDPOINTSQS,
      ReceiptHandle: receipt,
    };

    console.log("receipts ", receipt);

    sqs.deleteMessage(params, (err, data) => {
      if (err) {
        throw new Error(err);
      } else {
        console.log("--- Message Deleted from QUEUE ---");
      }
    });

    if (newPost) return true;
  } catch (error) {
    console.log("Internal server error: ", error);

    throw new Error(error);
  }
};

const savePostHandler = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "SQS event processed.",
      input: event,
    }),
  };

  const body = JSON.parse(event.Records[0].body);
  const receipt = event.Records[0].receiptHandle;

  await savePost(body, receipt);

  callback(null, response);
};

export { savePostHandler };
