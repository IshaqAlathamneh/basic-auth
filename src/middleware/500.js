module.exports = (err, req, res, next) => {
    res.status(500).json({
        err: err, 
        path: req.path
    });
}