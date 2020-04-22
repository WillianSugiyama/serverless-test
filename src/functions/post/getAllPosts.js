import models from "../../../models";
import lambdaHandler from "../../utils/lambdaHandler";

const getAllPosts = async () => {
  try {
    const posts = await models.Post.findAll({
      where: {
        active: true,
      },
      include: [{
        model: models.User,
        attributes: ['username']
      }],
    });

    if (!posts) {
      return {
        statusCode: 404,
        message: "Posts not found!",
      };
    }

    return {
      statusCode: 200,
      message: posts,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getAllPostsHandler = async (event, context, callback) => {
  const posts = await getAllPosts();

  await lambdaHandler(
    event,
    context,
    callback,
    posts.statusCode,
    posts.message
  );
};

export {
  getAllPostsHandler
};