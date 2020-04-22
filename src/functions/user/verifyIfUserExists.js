const models = require('../../../models');

module.exports = async function (username) {
    try {
        const user = await models.User.findOne({
            where: {
                username,
            },
        });

        if (user) {
            return true;
        }

        return false;
    } catch (error) {
        throw new Error(error);
    }
};