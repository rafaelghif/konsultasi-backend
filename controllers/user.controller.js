const { User } = require("../models/index.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authentication = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (response === null) return res.status(403).json({ msg: "Email Not Found!" })
        if (!bcrypt.compareSync(req.body.password, response.password)) return res.status(403).json({ msg: "Wrong Password!" })
        const token = jwt.sign({ userId: response.id.toString() }, process.env.JWT_SECRET_KEY, { expiresIn: 8600 })
        return res.status(200).json({ token, response })
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

const getUsers = async (req, res) => {
    try {
        const response = await User.findAll()
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

const addUser = async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const response = await User.create(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

const updateUser = async (req, res) => {
    try {
        const response = await User.update(req.body, {
            where: {
                id: req.body.id
            }
        })
        return res.status(200).json({ msg: `Success Update User ${req.body.id}` })
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

module.exports = {
    authentication,
    getUsers,
    addUser,
    updateUser
}