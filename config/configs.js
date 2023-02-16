import "dotenv/config"

module.exports = {
  database: {
    mysql: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  },
  port: process.env.PORT
}
