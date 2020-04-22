const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const _config = require('../config/config')[env];
let models = {};

(function (config) {
  if (Object.keys(models).length) {
    return models;
  }

  let sequelize;
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], {
      host: config.host,
      dialect: config.dialect
    });
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      dialect: config.dialect
    });
  }

  let modules = [require('./user.js'), require('./post.js'), require('./accessgroup.js')];

  modules.forEach((module) => {
    const model = module(sequelize, Sequelize, config);
    models[model.name] = model;
  });

  Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
  });

  models.sequelize = sequelize;
  models.Sequelize = Sequelize;

  return models;
})(_config);

module.exports = models;