const { Op } = require("sequelize")
const { Chat, ChatDetail, User } = require("../models/index.model")

const getChats = async (req, res) => {
    try {
        var response = await Chat.findOne({
            where: {
                [Op.and]: [{
                    user1: req.params.userId
                }, {
                    user2: req.params.userIdPakar
                }]
            },
            include: [{
                model: ChatDetail,
                order: [
                    ['createdAt', 'ASC']
                ]
            }],
            order: [
                [ChatDetail, 'createdAt', 'ASC']
            ]
        })

        if (response === null) {
            response = await Chat.create({
                user1: req.params.userId,
                user2: req.params.userIdPakar
            })

            response = await Chat.findOne({
                where: {
                    [Op.and]: [{
                        user1: req.params.userId
                    }, {
                        user2: req.params.userIdPakar
                    }]
                },
                include: [{
                    model: ChatDetail,
                    order: [
                        ['createdAt', 'ASC']
                    ]
                }],
                order: [
                    [ChatDetail, 'createdAt', 'ASC']
                ]
            })
        }
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

const getUserList = async (req, res) => {
    try {
        const response = await Chat.findAll({
            include: [{
                model: User,
                as: 'UserId'
            }],
            where: {
                user2: req.params.userId,
            },
        })
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

module.exports = {
    getChats,
    getUserList
}