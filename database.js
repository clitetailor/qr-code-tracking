module.exports = {
  development: {
    username: 'vagrant',
    password: 'vagrant',
    database: 'qrct_dev',
    logging: false,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'vagrant',
    password: 'vagrant',
    database: 'qrct_test',
    logging: false,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    username: 'vagrant',
    password: 'vagrant',
    database: 'qrct_prod',
    logging: false,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  }
}
