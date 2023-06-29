const config = require('../config/config');
const {Sequelize} = require('sequelize');
const Categories = require('../model/categories');
const sequelize = new Sequelize(`postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`, {
    logging: false
});

class Db {
    constructor() {
    }

    async getUserFromLogin(login) {
        try {
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
        } catch {
            return false
        }
    }

    async getAllCategories(page, limit) {
        try {
            const first = (Number(page) * Number(limit)) - Number(limit) + 1;
            const last = Number(page) * Number(limit);
            const categories = await sequelize.query('select *\n' +
                'from (select c.id                              categories_id,\n' +
                '             c.name                            categories_name,\n' +
                '             c.url                             categories_url,\n' +
                '             c.page_count                      categories_page_count,\n' +
                '             c.cashback_coef                   categories_cashback_coef,\n' +
                '             row_number() over (order by c.id) categories_row_number\n' +
                '      from categories c\n' +
                '      where c."deletedAt" is null\n' +
                '      order by 1) categories\n' +
                'where categories.categories_row_number >= :first\n' +
                '  and categories.categories_row_number <= :last;', {
                    nest: true,
                    replacements: {first: first, last: last}
                }
            );
            if (categories) {
                return categories
            } else {
                return false
            }
        } catch {
            return false
        }
    }

    async createCategories(name, url, pageCount, cashbackCoef) {
        try {
            const category = Categories.create({
                name: name,
                url: url,
                page_count: pageCount,
                cashback_coef: cashbackCoef
            });
            if (category) {
                return true
            } else {
                return false
            }
        } catch {
            return false
        }
    }

}

module.exports = Db;
