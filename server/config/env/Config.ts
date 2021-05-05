import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".env.testing" : ".env"
})

module.exports = {
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  dburl: process.env.DB_URL,
  serverPort: process.env.DB_PORT
}


