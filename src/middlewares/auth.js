const isAuth = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        req.token = token;
        next();
    } else {
        res.status(400).json({ message: 'no access' });
    }
};

module.exports = {
    isAuth,
}