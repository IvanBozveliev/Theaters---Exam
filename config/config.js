const config = {
   development: {
       PORT: 5000,
       DB_CONNECTION: `mongodb://localhost/Theaters`,
       COOKIE_NAME: 'USER_NAME',
       SECRET: 'TOP',
       SALT_ROUNDS: 10
   },
}

module.exports = config[process.env.NODE_ENV.trim()]