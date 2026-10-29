const pgp = require('pg-promise')()

const cn = {
    host: 'PostgreSQL-17',
    port: 5432,
    database: 'translator_dictionary',
    user: 'postgres',
    password: '',
};

const db = pgp(cn);

module.exports = db;