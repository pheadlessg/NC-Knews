# BE2-NC-Knews

## Northcoders News API

A database for articles, comments and users with the ability to post and delete articles and comments as well as vote on both. It's reddit. I've basically just built a rubbish version of reddit.

### Getting Started

Clone the the repo into your CLI
npm install to install all dependencies
node listen.js to start the server. The default port is set to 9090, but can be changed in the node ENV.
You'll need to make a new knex file, which can be done by running knex init. Replace the data in the file with the following code:

```http
const { DB_URL } = process.env;

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: '<development database here>',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
  test: {
    client: 'pg',
    connection: {
      database: '<test database here>',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './seeds',
    },
  }
};
```
You'll also need to run migrations and seed to get data into the databases. Some data has been provided for this purpose.

### Prerequisites

This project uses PSQL for the database.
You should download it from [here](https://www.postgresql.org/) before starting.

### What now?

Now you can get data out of the damn thing. Here's how:

You can start the server by running 
```http
node listen.js.
```
Making a query to localhost:{PORT}/api/ will show a list of available endpoints for the server.

### Can I test it?

YES. OF COURSE. Here's how to test it and what the tests do:

Run
```http
npm test
```
This runs a battery of tests on the code which checks that all endpoints provide the correct data - including queries - and checks that error handling is being done correctly.

### Deployment

Here's how to deploy this on a live system.

```http
Instructions for system deployment and heroku host link here

```
Currently this project is hosted on Heroku [here](https://afternoon-caverns-78721.herokuapp.com/api/).

### Built With

* [Express](https://expressjs.com/)
* [KNEX](https://knexjs.org/)
* [Body-parser](https://www.npmjs.com/package/body-parser)
* [PSQL](https://www.postgresql.org/)

And a lotta love...

### Author

Sean Fisher

### Acknowledgements

Big ups to the homeless guy across the street that had a domestic in front of the tram with his lady at 8:30am yesterday. Keep shining you crazy diamond.