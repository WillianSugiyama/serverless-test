import models from "../../../models";
import lambdaHandler from "../../utils/lambdaHandler";

const softDeletePost = async (body) => {
  console.log('--- BODY  ----', body);
  try {
    await models.Post.update({
      active: false
    }, {
      where: {
        id: body.id
      }
    });

    return {
      statusCode: 200,
      message: 'Post has been deleted'
    };
  } catch (error) {
    console.log("Internal server error: ", error);

    throw new Error(error);
  }
};

const deletePostHandler = async (event, context, callback) => {
  const deletedPost = await softDeletePost(JSON.parse(event.body));

  await lambdaHandler(
    event,
    context,
    callback,
    deletedPost.statusCode,
    deletedPost.message
  );
};

export {
  deletePostHandler
};