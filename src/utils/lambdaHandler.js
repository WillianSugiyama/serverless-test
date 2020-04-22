export default async function lambdaHandler(event, context, callback, statusCode, message) {
  context.callbackWaitsForEmptyEventLoop = false;

  callback(null, {
    statusCode: statusCode,
    body: JSON.stringify({
      message: message
    }),
  });
}