const { Op } = require("sequelize");
const { Server } = require("socket.io");
const { Chat, ChatDetail } = require("../models/index.model");

module.exports = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: '*'
        }
    })

    io.use((socket, next) => {
        const userId = socket.handshake.auth.userId;
        const roleName = socket.handshake.auth.roleName;

        if (!userId || !roleName) {
            return next(new Error("invalid username"));
        }

        socket.userId = userId;
        socket.roleName = roleName;

        next();
    })

    io.on('connection', async (socket) => {

        var updValue = {}
        var whereCondition = {}

        if (socket.roleName === 'Pakar') {
            updValue.socketIdUser2 = socket.id
            whereCondition.user2 = socket.userId
        } else {
            updValue.socketIdUser1 = socket.id
            whereCondition.user1 = socket.userId
        }

        await Chat.update(updValue, {
            where: whereCondition
        })

        socket.on("private message", async (data) => {

            var whereConditionPrivateMessage = {}

            if (socket.roleName === 'Pakar') {
                whereConditionPrivateMessage.user2 = data.from
                whereConditionPrivateMessage.user1 = data.to
            } else {
                updValue.socketIdUser1 = socket.id
                whereConditionPrivateMessage.user1 = data.from
                whereConditionPrivateMessage.user2 = data.to
            }

            const responseChat = await Chat.findOne({
                where: {
                    [Op.and]: [
                        { user1: whereConditionPrivateMessage.user1 },
                        { user2: whereConditionPrivateMessage.user2 },
                    ]
                }
            })

            const responseChatDetail = await ChatDetail.create({
                from: data.from,
                to: data.to,
                message: data.message,
                ChatId: responseChat.id
            })

            var sendTo = socket.roleName === 'Pakar' ? responseChat.socketIdUser1 : responseChat.socketIdUser2

            socket.to(sendTo).emit("Private Message", data)

        });
    })
}

