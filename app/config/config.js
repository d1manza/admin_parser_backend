function getEnv(name, defaults) {
    if (!process.env[name]) {
        return defaults
    } else {
        return process.env[name];
    }
}

const config = {
    db: {
        host: 'localhost',
        port: 5432,
        name: 'xxx',
        user: 'xxx',
        password: 'xxx'
    },
    server: {
        host: 'localhost',
        port: '4220'
    }
};

module.exports = config;
