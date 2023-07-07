const config = {
	appConfig: {
		host: process.env.APP_HOST,
		port: process.env.APP_PORT,
	},
	db: {
		port: process.env.DB_PORT,
		host: process.env.DB_HOST,
		dbName: process.env.DB_NAME,
	},
	auth: {
		tokenSecret: process.env.TOKEN_SECRET,
	},
	rootUser: {
		firstName: process.env.ROOT_FIRST_NAME,
		lastName: process.env.ROOT_LAST_NAME,
		email: process.env.ROOT_EMAIL,
		type: process.env.ROOT_TYPE,
		password: process.env.ROOT_PASSWORD,
	},
};

module.exports = config;
