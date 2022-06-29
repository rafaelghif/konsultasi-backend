const { connDatabase } = require("../config/database.config");
const { DataTypes } = require("sequelize");

const QuestionType = connDatabase.define('QuestionType', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    questionType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    result: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    generalIndicator: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    competence: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roleModel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jobs: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = QuestionType;