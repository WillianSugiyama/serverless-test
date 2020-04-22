const bcrypt = require('bcryptjs');

module.exports = async function (password) {
  try {
    const hashPass = await bcrypt.hash(password, 10);

    return hashPass;
  } catch (error) {
    throw new Error();
  };
};