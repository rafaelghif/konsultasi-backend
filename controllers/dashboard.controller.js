const { connDatabase } = require("../config/database.config")
const { QueryTypes } = require("sequelize");

const getChartCategory = async (req, res) => {
    try {
        const response = await connDatabase.query("SELECT * FROM v_chartcategory", { type: QueryTypes.SELECT });

        const label = [];
        const value = []

        response.map((data) => {
            label.push(data.chartLabel)
            value.push(parseInt(data.chartVal))
        })

        return res.status(200).json({ label: label, value: value })
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

module.exports = {
    getChartCategory
}