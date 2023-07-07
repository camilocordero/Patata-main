const jwt = require('jsonwebtoken');

// middleware to validate token
const verifyToken = (req, res, next) => {
	console.log(req.headers);
	const token = req.header('Auth-Token');
	if (!token) return res.status(401).json({ error: 'Unhautorizated' });
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (error) {
		res.status(400).json({ error: 'Not valid token' });
	}
};

module.exports = verifyToken;
