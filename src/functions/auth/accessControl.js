import buildIAMPolicy from "../../utils/buildIAMPolicy";
import jwt from "jsonwebtoken";

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return error;
  }
};

const authorizeUser = (groupScope, methodArn) => {
  const splitMethodArn = methodArn.split("/");
  return groupScope.some(
    (k) => k.value === splitMethodArn[splitMethodArn.length - 1]
  );
};

const groupScope = () => {
  return {
    1: [
      {
        value: "createUser",
      },
    ],
    2: [
      {
        value: "createPost",
      },
      {
        value: "updatePost",
      },
      {
        value: "deletePost",
      },
    ],
    3: [
      {
        value: "createPost",
      },
      {
        value: "updatePost",
      },
    ],
  };
};

const accessControlHandler = (event, context, callback) => {
  const token = event.authorizationToken;

  try {
    const decoded = verifyToken(token);

    const user = decoded.user;
    const isAllowed = authorizeUser(
      groupScope()[user.accessGroupId],
      event.methodArn
    );
    const effect = isAllowed ? "Allow" : "Deny";
    const userId = user.username;
    const authorizerContext = {
      user: JSON.stringify(user),
    };

    const policyDocument = buildIAMPolicy(userId, effect, event.methodArn);

    console.log("Returning IAM policy document", event.methodArn);
    callback(null, policyDocument);
  } catch (error) {
    console.log("error", error.message);
    callback("Unauthorized");
  }
};

export { accessControlHandler };
