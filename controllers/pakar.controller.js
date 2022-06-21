const { Pakar } = require("../models/index.model")

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
        const response = await Pakar.create(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

module.exports = {
    getPakars,
    addPakar
}