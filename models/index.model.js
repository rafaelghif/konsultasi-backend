const { connDatabase } = require("../config/database.config")
const bcrypt = require('bcrypt')

const User = require("./user.model")
const Pakar = require("./pakar.model")

const model = {}

model.User = User
model.Pakar = Pakar

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
    }, {
        email: 'pakar@mail.com',
        password: bcrypt.hashSync('pakar', 10),
        name: 'Pakar',
        role: 'Pakar'
    }])
}

module.exports = model