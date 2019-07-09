const Sequelize = require('sequelize')

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/tagdb',
  {
    logging: false // so we don't see all the SQL query made
  }
)

module.exports = db
