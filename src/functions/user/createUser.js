import models from '../../../models';
import verifyIfUserExists from './verifyIfUserExists';
import lambdaHandler from '../../utils/lambdaHandler';

const createUser = async (body) => {
  try {

    const {
      username,
      password,
      accessGroupId
    } = body;

    const userExists = await verifyIfUserExists(username);

    if (userExists) {
      return {
        message: 'User already exists',
        statusCode: 400
      };
    }

    const newUser = await models.User.create({
      username,
      accessGroupId,
      password
    });


    return {
      message: {
        ...newUser.dataValues,
      },
      statusCode: 200
    }


  } catch (error) {
    console.log('Internal server error: ', error);

    throw new Error(error);
  }
};

const createUserHandler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const userCreated = await createUser(body);

  await lambdaHandler(event, context, callback, userCreated.statusCode, userCreated.message);
};

export {
  createUserHandler
};