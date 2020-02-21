module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'qr_code_tracking_dev',
    logging: false,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'qr_code_tracking_test',
    logging: false,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    username: 'postgres',
    password: 'postgres',
    database: 'qr_code_tracking_prod',
    logging: false,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  }
}
