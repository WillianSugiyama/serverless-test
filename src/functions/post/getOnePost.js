import models from "../../../models";
import lambdaHandler from "../../utils/lambdaHandler";

const getOnePost = async (id) => {
  try {
    const post = await models.Post.findOne({
      id,
    });

    if (!post) {
      return {
        statusCode: 404,
        message: "Post not found!",
      };
    }

    return {
      statusCode: 200,
      message: post,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getOnePostHandler = async (event, context, callback) => {
  const post = await getOnePost(event.queryStringParameters);

  await lambdaHandler(
    event,
    context,
    callback,
    post.statusCode,
    post.message
  );
};

export {
  getOnePostHandler
};