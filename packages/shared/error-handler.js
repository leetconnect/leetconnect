// global error handling middleware for express
// app.use(errorHandler); must be placed after all routes

function errorHandler(err, req, res, next) {
    console.error(`[${req.method}] ${req.path} — ${err.message}`);
    const status = err.status || err.statusCode || 500;
    res.status(status).json({
        error: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}

module.exports = { errorHandler };
