# QR Code Tracking

## Prerequisite

- NodeJS
- Yarn
- PostgreSQL

## Installation

### DotEnv

`.dotenv` contains the API Keys for Here Maps. You need to make a copy of `.dotenv` from the current `.dotenv.example`. Create a new account at [Here developer portal](`https://developer.here.com/`) and replace the placeholder in `.dotenv` with your own keys.

### Database

Install and config Postgres to run on port 5432. If you run the database inside Vagrant virtual machine, you may need to edit `postgresql.conf` and `pg_hba.conf` located in `/etc/postgres`.

Node adapter configuration is located at `database.js` in current project folder. Create a Postgres account with the same username and password as configuration in `database.js`

Run Sequelize migration before starting the server to keep track of changes to the database:

```bash
$ yarn sequelize db:migrate
```

### Node

Before you run the application, run the following command to install the dependencies:

```bash
$ yarn
```

## Start the Server

To run the program, you need to run the web development server alongside the node backend server

To start the web development server run:

```bash
$ yarn web:dev
```

To start the node backend development server run:

```bash
$ yarn server:dev
```
