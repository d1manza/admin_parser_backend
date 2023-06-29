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
            console.log(userId, login);
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

    async createCategories(req, res) {
        if (req.body.login && req.body.userId && req.body.name && req.body.url && req.body.pageCount && req.body.cashbackCoef) {
            const login = req.body.login;
            const userId = Number(req.body.userId);
            const name = req.body.name;
            const url = req.body.url;
            const pageCount = req.body.pageCount;
            const cashbackCoef = req.body.cashbackCoef;
            const checkJwtToken = await middlwareAuthJwt.checkJwtToken(userId, login, req.headers.authorization);
            if (checkJwtToken) {
                const createCategories = await db.createCategories(name, url, pageCount, cashbackCoef);
                if (createCategories) {
                    shared.logging('createCategories', 'successfully', `get categories userId: ${userId}`);
                    res.status(200).send({
                        message: 'category created'
                    });
                } else {
                    shared.logging('createCategories', 'error', `created category from login: ${login}`);
                    res.status(500).send({
                        message: 'error category created'
                    });
                }
            } else {
                shared.logging('createCategories', 'error', `invalid login: ${login}`);
                res.status(401).send({
                    message: 'invalid jwt token'
                });
            }
        } else {
            shared.logging('createCategories', 'error', 'Invalid validation params');
            res.status(400).send({
                message: 'invalid params'
            });
        }
    }

}

module.exports = Categories;
