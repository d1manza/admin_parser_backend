const config = require('../config/config');
const {Sequelize} = require('sequelize');
const TgUsers = require('../model/tgUsers');
const TgUsersRights = require('../model/tgUsersRights');
const sequelize = new Sequelize(`postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`, {
    logging: false
});

class Db {
    constructor() {
    }

    async getUserFromLogin(login) {
        const user = await sequelize.query('select tu.id,\n' +
            '       tu.password,\n' +
            '       r.short_tittle,\n' +
            '       tu.login\n' +
            'from tg_users tu\n' +
            'join tg_users_rights tur on tu.id = tur.id_users\n' +
            'join rights r on tur.id_rights = r.id\n' +
            'where tu."deletedAt" is null\n' +
            'and tu.login = :login;', {
                plain: true,
                replacements: {login: login}
            }
        );
        if (user) {
            return user
        } else {
            return false
        }
    }

}

module.exports = Db;
