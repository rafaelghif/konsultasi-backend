const { connDatabase } = require("../config/database.config");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const Chat = connDatabase.define('Chat', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    user1: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    user2: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
})

module.exports = Chat;