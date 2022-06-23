const { connDatabase } = require("../config/database.config")
const bcrypt = require('bcrypt')

const User = require("./user.model")
const Pakar = require("./pakar.model")
const Chat = require("./chat.model")
const ChatDetail = require("./chatDetail.model")

const model = {}

model.User = User
model.Pakar = Pakar
model.Chat = Chat
model.ChatDetail = ChatDetail

// connDatabase.sync({ force: true }).then(() => {
//     initializeUser()
// })

connDatabase.sync()

const initializeUser = async () => {
    await model.User.bulkCreate([{
        email: 'superuser@mail.com',
        password: bcrypt.hashSync('superuser', 10),
        name: 'Super User',
        role: 'Super User'
    }, {
        email: 'admin@mail.com',
        password: bcrypt.hashSync('admin', 10),
        name: 'Admin',
        role: 'Admin'
    }])
}

model.User.hasOne(model.Pakar)
model.Pakar.belongsTo(model.User)

model.User.hasMany(model.Chat, { foreignKey: 'user1' })
model.User.hasMany(model.Chat, { foreignKey: 'user1' })
model.Chat.belongsTo(model.User, { foreignKey: 'user1' })
model.Chat.belongsTo(model.User, { foreignKey: 'user2' })

model.Chat.hasMany(model.ChatDetail)
model.ChatDetail.belongsTo(model.Chat)

model.User.hasMany(model.ChatDetail, { foreignKey: 'from' })
model.User.hasMany(model.ChatDetail, { foreignKey: 'to' })
model.ChatDetail.belongsTo(model.User, { foreignKey: 'from' })
model.ChatDetail.belongsTo(model.User, { foreignKey: 'to' })

module.exports = model