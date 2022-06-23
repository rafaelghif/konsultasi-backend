const { Pakar, User } = require("../models/index.model")
const bcrypt = require('bcrypt')

const getPakars = async (req, res) => {
    try {
        const response = await Pakar.findAll()
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

const addPakar = async (req, res) => {
    try {

        const responseUser = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.email, 10),
            name: req.body.name,
            role: 'Pakar'
        })

        req.body.UserId = responseUser.id

        const responsePakar = await Pakar.create(req.body)
        return res.status(200).json(responsePakar)
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

module.exports = {
    getPakars,
    addPakar
}