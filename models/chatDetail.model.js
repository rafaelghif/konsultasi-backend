const { connDatabase } = require("../config/database.config");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const ChatDetail = connDatabase.define('ChatDetail', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    from: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    to: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
})

module.exports = ChatDetail