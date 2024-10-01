const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    console.log("Here")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // const token = req.headers['authorization'];
    console.log(token)
    if (!token) return res.status(403).send('Token is required');

    jwt.verify(token, secret, (err, user) => {
        console.log("Veryfying token");
        if (err) return res.status(401).send('Invalid Token');
        console.log("Success");
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
