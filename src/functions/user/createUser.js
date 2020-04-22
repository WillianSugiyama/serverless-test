const models = require('../../../models');
const verifyIfUserExists = require('./verifyIfUserExists');

const createUser = async (body) => {
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
    status: 200,
  };
};

module.exports.createUserHandler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const userCreated = await createUser(body);

  context.callbackWaitsForEmptyEventLoop = false

  callback(null, {
    statusCode: userCreated.status,
    body: JSON.stringify({
      message: userCreated.message
    }),
  });
};