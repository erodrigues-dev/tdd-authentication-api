module.exports = (req, res, next) => {
    const headerAuthorization = req.headers.authorization;

    if(!headerAuthorization)
        return res.status(401).json({ message: 'No JWT token is provided' })

    return next()
}