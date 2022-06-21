const { connDatabase } = require("../config/database.config");
const { DataTypes } = require("sequelize");

const Pakar = connDatabase.define('Pakar', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(80),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Pakar