const config = require('../config/config');
const jwt = require('jsonwebtoken');
const Db = require('./db');
const db = new Db();

class Auth {
    constructor() {
    }

    async generateToken(userId, login) {
        const data = {
            userId: userId,
            login: login
        };
        return jwt.sign(data, config.jwt.secretKey, {expiresIn: config.jwt.ttl});
    }

    async login(req, res) {
        console.log(req.body);
        const login = req.body.login;
        const password = req.body.password;
        const getUserFromLogin = await db.getUserFromLogin(login);
        if (getUserFromLogin) {
            if (getUserFromLogin.password === password) {
                const generateToken = await this.generateToken(getUserFromLogin.id, login);
                if (generateToken) {
                    res.send({
                        code: 1,
                        role: getUserFromLogin.short_tittle,
                        token: generateToken
                    });
                } else {
                    console.log(`Function: generateToken. Error generation jwt token from id: ${getUserFromLogin.id}, login: ${login}`);
                    res.send({
                        code: 2,
                        message: 'Generate token error'
                    });
                }
            } else {
                console.log(`invalid password: ${login}`);
                res.send({
                    code: 2,
                    message: 'Password error'
                });
            }
        } else {
            console.log(`invalid login: ${login}`);
            res.send({
                code: 2,
                message: 'Login error'
            });
        }
    }

}

module.exports = Auth;
