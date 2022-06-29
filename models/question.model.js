const { connDatabase } = require("../config/database.config");
const { DataTypes } = require("sequelize");

const Question = connDatabase.define('Question', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    question: {
        type: DataTypes.STRING(80),
        allowNull: false,
    },
});

module.exports = Question;