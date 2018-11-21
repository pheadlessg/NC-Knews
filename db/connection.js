const knex = require('knex');
const connectdata = require('../knexfile');

const ENV = process.env.NODE_ENV;
const data = ENV === 'test' ? connectdata.test : connectdata.development;

const connection = knex(data);

module.exports = connection;
