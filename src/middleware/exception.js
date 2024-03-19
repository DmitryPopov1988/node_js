const nunjucks = require('nunjucks');

const exceptionHandler = (err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    const html = nunjucks.render('error.html', {status: statusCode, message: err.message});
    res.status(statusCode);
    res.send(html);
};

const pageNotFoundHandler = (req, res) => {
    const errorMessage = 'The requested URL was not found ' + req.originalUrl;
    console.error(errorMessage);
    const html = nunjucks.render('not_found.html', {status: 404, message: errorMessage});
    res.status(404);
    res.send(html);
};

module.exports = {
    exceptionHandler, pageNotFoundHandler
};