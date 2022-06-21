module.exports = (app) => {
    app.use('/api/user', require('./user.route'))
    app.use('/api/pakar', require('./pakar.route'))
}