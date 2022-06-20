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

module.exports = {
    authentication,
}