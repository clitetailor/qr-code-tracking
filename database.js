module.exports = {
  development: {
    username: 'vagrant',
    password: 'vagrant',
    database: 'qrct_dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'vagrant',
    password: 'vagrant',
    database: 'qrct_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    username: 'vagrant',
    password: 'vagrant',
    database: 'qrct_prod',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  }
}
