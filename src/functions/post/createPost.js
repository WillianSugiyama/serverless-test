import AWS from "aws-sdk";
import lambdaHandler from "../../utils/lambdaHandler";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const sqs = new AWS.SQS({
  apiVersion: "2012-11-05",
  endpoint: process.env.ENDPOINTSQS,
});

const createPost = async (body, queueUrl) => {
  const responseBody = {
    message: "",
  };

  let response = {
    statusCode: 200,
  };

  const params = {
    MessageBody: JSON.stringify(body),
    QueueUrl: queueUrl,
  };

  try {
    const messageSended = await sqs.sendMessage(params).promise();
    responseBody.message = `Sent to ${queueUrl}`;
    responseBody.messageId = responseBody.messageId = messageSended.MessageId;

    responseBody.statusCode = 200;
  } catch (err) {
    responseBody.statusCode = 500;
    responseBody.message = `Error to create a post`;

    console.log("Error: ", err);
  }

  response = {
    statusCode: responseBody.statusCode,
    body: responseBody,
  };

  return response;
};

const createPostHandler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const queueUrl = process.env.ENDPOINTSQS;

  const postCreated = await createPost(body, queueUrl);

  await lambdaHandler(
    event,
    context,
    callback,
    postCreated.statusCode,
    postCreated.body
  );
};

export { createPostHandler };
