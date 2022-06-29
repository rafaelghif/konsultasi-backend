const { Question, QuestionType, AnswerUser } = require("../models/index.model")

const getQuestion = async (req, res) => {
    try {
        const response = await Question.findAll({
            include: [
                {
                    model: QuestionType
                }
            ]
        })
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

const getQuestionUser = async (req, res) => {
    try {
        const response = await Question.findAll({
            include: [
                {
                    model: QuestionType
                }
            ],
            order: [
                [QuestionType, 'questionType', 'ASC'],
                ['createdAt', 'ASC']
            ]
        })
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

const checkUserAlreadyAnswer = async (req, res) => {
    try {
        const response = await AnswerUser.findAll({
            where: {
                UserId: req.params.UserId
            },
            include: [{
                model: QuestionType
            }]
        })
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

const getQuestionType = async (req, res) => {
    try {
        const response = await QuestionType.findAll({
            order: [
                ['questionType', 'ASC']
            ]
        })
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

const addQuestion = async (req, res) => {
    try {
        const response = await Question.create({
            question: req.body.question,
            QuestionTypeId: req.body.QuestionTypeId
        })
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

const answerQuestion = async (req, res) => {
    try {
        const selectedQuestion = req.body.data

        const questionTypeIdArr = selectedQuestion.map((dataSelected, index) => {
            const indexSame = selectedQuestion.findIndex((dataFind) => dataFind.QuestionTypeId === dataSelected.QuestionTypeId)
            return selectedQuestion[indexSame].QuestionTypeId
        })

        const uniqueQuestionTypeId = questionTypeIdArr.filter((data, index) => questionTypeIdArr.indexOf(data) === index)

        const results = uniqueQuestionTypeId.map((data) => {
            return {
                questionTypeId: data,
                total: selectedQuestion
                    .filter((dataSelected) => dataSelected.QuestionTypeId === data)
                    .map((dataSelectedValue) => dataSelectedValue.value)
                    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
            }
        })

        var selectedType = results.filter((data) => data.total === Math.max(...results.map((data) => data.total)))

        const resultsAnswer = await Promise.all(selectedType.map(async (element) => {
            return await QuestionType.findByPk(element.questionTypeId)
        }));

        await Promise.all(resultsAnswer.map(async (data) => {
            await AnswerUser.create({
                QuestionTypeId: data.id,
                UserId: req.body.UserId
            })
        }))

        return res.status(200).json(resultsAnswer)
    } catch (err) {
        return res.status(500).json({ msg: err.toString() })
    }
}

module.exports = {
    getQuestion,
    getQuestionUser,
    getQuestionType,
    checkUserAlreadyAnswer,
    addQuestion,
    answerQuestion
}