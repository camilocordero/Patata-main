const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewSchema = Schema(
	{
		title: String,
		description: String,
		img: String,
		body: String,
		author: String,
	},
	{
		//for dates of create and upate
		timestamps: true,
	}
);

module.exports = mongoose.model('New', NewSchema);
