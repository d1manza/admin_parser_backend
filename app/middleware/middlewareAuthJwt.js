const config = require('../config/config');
const jwt = require('jsonwebtoken');

class MiddlwareAuthJwt {
    constructor() {
    }

    async generateJwtToken(userId, login) {
        const payload = {
            userId: userId,
            login: login
        };
        return jwt.sign(payload, config.jwt.sekretKey, {expiresIn: config.jwt.ttl});
    }

    async checkJwtToken(userId, login, jwtToken) {
        const suString = 'Bearer ';
        jwtToken = jwtToken.replace(suString, '');
        try {
            const newJwtToken = jwt.verify(jwtToken, config.jwt.sekretKey);
            return userId === newJwtToken.userId && login === newJwtToken.login
        } catch (err) {
            return false
        }
    }

}

module.exports = MiddlwareAuthJwt;
