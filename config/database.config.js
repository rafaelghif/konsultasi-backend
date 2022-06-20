const { Sequelize } = require('sequelize');

exports.connDatabase = new Sequelize('db_konsultasi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+07:00'
})

try {
    this.connDatabase.authenticate()
    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}