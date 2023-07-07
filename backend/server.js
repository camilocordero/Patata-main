require('dotenv').config();
const https = require('https');
const fs = require('fs');

const connectDb = require('./db/mongodb');
const app = require('./app');
const appssl = require('./app');
const { appConfig, db } = require('./config');

const port = appConfig.port;

const initApp = async () => {
	try {
		await connectDb(db);
		app.listen(port, () => {
			console.log(`Server running on port ${port}`);
		});

		if (process.env.NODE_ENV === 'prod') {
			const httpsServer = https.createServer(
				{
					key: fs.readFileSync('privkey.pem'),
					cert: fs.readFileSync('fullchain.pem'),
				},
				appssl
			);
			httpsServer.listen(443, () => {
				console.log('HTTPS Server running on port 443');
			});
		}
	} catch (e) {
		console.error(`${e} SOMETHINGS IS WRONG :(`);
		process.exit(0);
	}
};

initApp();
