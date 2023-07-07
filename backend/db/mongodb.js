const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const connectDb = async ({ host, port, dbName }) => {
	const uri = `mongodb://${host}:${port}/${dbName}`;
	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
};

module.exports = connectDb;
