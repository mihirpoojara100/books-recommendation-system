module.exports = (app) => {
    app.get('/', (req, res) => {
        res.status(STATUS_CODES.SUCCESS).send(
            'Welcome to ' + process.env.PROJECT_NAME
        );
    });
    app.use('/auth', require('./Auth.Routes'));
    app.use('/review', require('./Review.Routes'));
};
