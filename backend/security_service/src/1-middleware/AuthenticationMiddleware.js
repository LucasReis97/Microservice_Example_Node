const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: "Não foi encontrado token de autenticação" });
    }
    const [token] = authHeader.split(" ");
    try {
        const decoded = await promisify(jwt.verify)(token, "secret");
        req.userId = decoded.id;
        return next();
    } catch (err) {
        return res.status(401).send({ error: "Token invalido" });
    }
};
