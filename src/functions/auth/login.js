import jwt from 'jsonwebtoken';
import comparePassword from '../../utils/comparePassword';
import lambdaHandler from '../../utils/lambdaHandler';

import models from '../../../models';

const login = async (body) => {
  const {
    username,
    password
  } = body;
  try {
    const user = await models.User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return {
        statusCode: 404,
        message: 'User not found!',
      };
    }

    const passIsValid = comparePassword(password, user.password);

    if (!passIsValid) {
      return {
        statusCode: 401,
        message: 'Invalid user/password!',
      };
    }

    const token = jwt.sign({
        user,
      },
      process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      },
    );

    return {
      statusCode: 200,
      message: {
        jwt: token,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
};

const loginHandler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const userToken = await login(body);

  await lambdaHandler(event, context, callback, userToken.statusCode, userToken.message);
};

export {
  loginHandler
};