const config = require('../config/config');
const MiddlwareAuthJwt = require('../middleware/middlewareAuthJwt');
const middlwareAuthJwt = new MiddlwareAuthJwt();

class Categories {
    constructor() {
    }

    async getCategories(req, res) {
        if (req.body.login && req.body.userId) {
            const login = req.body.login;
            const userId = req.body.userId;
            const checkJwtToken = await middlwareAuthJwt.checkJwtToken(userId, login, req.headers.authorization);
            console.log(checkJwtToken);
        } else {
            console.log(`invalid validation params`);
            res.status(400).send({
                message: 'Invalid params'
            });
        }
    }

}

module.exports = Categories;
