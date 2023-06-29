const config = require('../config/config');
const MiddlwareAuthJwt = require('../middleware/middlewareAuthJwt');
const middlwareAuthJwt = new MiddlwareAuthJwt();
const Shared = require('./shared');
const shared = new Shared();
const Db = require('./db');
const db = new Db();

class Categories {
    constructor() {
    }

    async getCategories(req, res) {
        if (req.query.login && req.query.userId && req.query.page && req.query.limit && req.query.page !== '0' && req.query.limit !== '0') {
            const login = req.body.login;
            const userId = req.body.userId;
            const page = req.query.page;
            const limit = req.query.limit;
            const checkJwtToken = await middlwareAuthJwt.checkJwtToken(userId, login, req.headers.authorization);
            if (checkJwtToken) {
                const getAllCategories = await db.getAllCategories(page, limit);
                if (getAllCategories) {
                    shared.logging('getAllCategories', 'successfully', `get categories from login: ${login}`);
                    res.status(200).send({
                        user_id: userId,
                        login: login,
                        categories: getAllCategories
                    });
                } else {
                    shared.logging('getAllCategories', 'error', `get categories from login: ${login}`);
                    res.status(500).send({
                        message: 'error get categories'
                    });
                }
            } else {
                shared.logging('getCategories', 'error', `invalid login: ${login}`);
                res.status(401).send({
                    message: 'invalid jwt token'
                });
            }
        } else {
            shared.logging('getCategories', 'error', 'Invalid validation params');
            res.status(400).send({
                message: 'invalid params'
            });
        }
    }

}

module.exports = Categories;
