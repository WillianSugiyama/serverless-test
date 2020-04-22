import models from "../../../models";

const savePost = async (body) => {
  try {
    const newPost = await models.Post.create({
      title: body.title,
      subtitle: body.subtitle,
      content: body.content,
      imgUrl: body.imgUrl ? body.imgUrl : "",
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

  var body = JSON.parse(event.Records[0].body);

  await savePost(body);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(event.Records[0].body),
  });
};

export { savePostHandler };
