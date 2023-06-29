const config = require('../config/config');
const Db = require('./db');
const db = new Db();
const MiddlwareAuthJwt = require('../middleware/middlewareAuthJwt');
const middlwareAuthJwt = new MiddlwareAuthJwt();

class Auth {
    constructor() {
    }

    async login(req, res) {
        if (req.body.login && req.body.password) {
            const login = req.body.login;
            const password = req.body.password;
            const getUserFromLogin = await db.getUserFromLogin(login);
            if (getUserFromLogin) {
                if (getUserFromLogin.password === password) {
                    const generateJwtToken = await middlwareAuthJwt.generateJwtToken(getUserFromLogin.id, getUserFromLogin.login);
                    if (generateJwtToken) {
                        res.status(200).send({
                            user_id: getUserFromLogin.id,
                            login: getUserFromLogin.login,
                            role: getUserFromLogin.short_tittle,
                            token: generateJwtToken
                        });
                    } else {
                        console.log(`Function: generateJwtToken. Error generation jwt token from id: ${getUserFromLogin.id}`);
                        res.status(500).send({
                            message: 'Generate token error'
                        });
                    }
                } else {
                    console.log(`invalid password: ${login}`);
                    res.status(401).send({
                        message: 'Password error'
                    });
                }
            } else {
                console.log(`invalid login: ${login}`);
                res.status(401).send({
                    message: 'Login error'
                });
            }
        } else {
            console.log(`invalid validation params`);
            res.status(400).send({
                message: 'Invalid params'
            });
        }
    }

}

module.exports = Auth;
