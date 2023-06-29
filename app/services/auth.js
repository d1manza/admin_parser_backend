const Db = require('./db');
const db = new Db();
const MiddlwareAuthJwt = require('../middleware/middlewareAuthJwt');
const middlwareAuthJwt = new MiddlwareAuthJwt();
const Shared = require('./shared');
const shared = new Shared();

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
                        shared.logging('generateJwtToken', 'successfully', `generation jwt token from login: ${login}`);
                        res.status(200).send({
                            user_id: getUserFromLogin.id,
                            login: getUserFromLogin.login,
                            role: getUserFromLogin.short_tittle,
                            token: generateJwtToken
                        });
                    } else {
                        shared.logging('generateJwtToken', 'error', `generation jwt token from login: ${login}`);
                        res.status(500).send({
                            message: 'Generate token error'
                        });
                    }
                } else {
                    shared.logging('login', 'error', `invalid password from login: ${login}`);
                    res.status(401).send({
                        message: 'Password error'
                    });
                }
            } else {
                shared.logging('login', 'error', `invalid login: ${login}`);
                res.status(401).send({
                    message: 'Login error'
                });
            }
        } else {
            shared.logging('login', 'error', 'Invalid validation params');
            res.status(400).send({
                message: 'Invalid params'
            });
        }
    }

}

module.exports = Auth;
