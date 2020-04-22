import models from "../../../models";
import lambdaHandler from "../../utils/lambdaHandler";

const updatePost = async (body) => {
  try {
    const post = await models.Post.findOne({
      where: {
        id: body.id,
      },
    });

    if (!post) {
      return {
        statusCode: 404,
        message: "Post not found!",
      };
    }
    console.log(post.dataValues);
    const updatedPost = {
      ...post.dataValues,
      ...body,
    };

    await models.Post.update(updatedPost, {
      where: {
        id: body.id
      }
    });

    return {
      statusCode: 200,
      message: "Post has been updated",
    };
  } catch (error) {
    console.log("Internal server error: ", error);

    throw new Error(error);
  }
};

const updatePostHandler = async (event, context, callback) => {
  const deletedPost = await updatePost(JSON.parse(event.body));

  await lambdaHandler(
    event,
    context,
    callback,
    deletedPost.statusCode,
    deletedPost.message
  );
};

export {
  updatePostHandler
};